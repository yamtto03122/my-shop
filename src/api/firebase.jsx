import { initializeApp} from "firebase/app";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut  } from "firebase/auth";
import { ref, get, set, getDatabase, remove } from 'firebase/database';
import { v4 as uuid } from 'uuid' //고유 식별자를 생성해주는 패키지
import { getStorage, getDownloadURL, ref as storageRef } from 'firebase/storage';

const firebaseConfig = {
    apiKey : process.env.REACT_APP_FIREBASE_API_KEY, //정해진 문법
    authDomain : process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId : process.env.REACT_APP_FIREBASE_PROJECT_ID,
    databaseURL : process.env.REACT_APP_FIREBASE_DB_URL
    
    /*
    process.env = 환경 변수 nodejs 전역 객체
    환경 변수 : 실행중인 프로세스에 사용할 수 있고 애플리케이션을 구현할 수 있는 키-값으로 이루어진 변수
    외부에서 값을 받아와서 설정할 수 있게 코드를 직접 하드코딩 하지 않고
    설정, 개일정보 매게변수로 분리해서 관리하는 용도로 사용

    process = 현재 nodejs의 프로세스의 전역객체. 실행중인 프로세스에 접근해서 정보를 받아옴
    .env = process에서 사용할 수 있는 모든 환경변수를 포함하는 객체가 된다.
    */
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider(); //구글 로그인 셋팅

const auth = getAuth();

const database = getDatabase(app);

const storage = getStorage(app);

export {storage};


//로그인 시 자동 로그인 현상 수정
provider.setCustomParameters({
    prompt : 'select_account',
})


//구글 로그인 기능
export async function login(){
    try{
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        console.log(user);
        return user;
    }catch (error){
        console.error(error);
    }
}

//구글 로그아웃 기능
export async function logOut(){
    try{
        await signOut(auth);
    }catch (error){
        console.error(error);
    }
} 

//로그인시 정보를 계속 유지
export function onUserState(callback){
    onAuthStateChanged(auth, async(user)=>{
        if(user){
            try{
                const updateUser = await adminUser(user);
                callback(updateUser)
            }catch (error){
                console.error(error);
            }
        }else{
            callback(null)
        }
    })
}


//관리자 계정 관리
async function adminUser(user){ //유저값을 받아와서 판단해야 함, 내보내지 않아도 되기 때문에 export 필여없음
    try{
        const snapshot = await get(ref(database, 'admin'));
        if(snapshot.exists()){
            const admins = snapshot.val();
            const isAdmin = admins.includes(user.email);
            console.log(isAdmin)
            return{...user, isAdmin}
        }
        return user
    }catch(error){
        console.error(error);
    }
}

// 파이어베이스에 상품 정보 연동하기
export async function addProducts(product, image){

    const id = uuid() //고유의 아이디값
    return set(ref(database, `products/${id}`),{ //데이터베이스를 받아와서, products 폴더를 만들고 아이디값을 생성 (저장)
        ...product,
        id,
        price : parseInt(product.price),
        image,
        // option //: product.option.split(',').map(option => option.trim()).join(','),
        //trim() : 문자열에 있는 공백을 제거, join(): 분리된 문자를 다시 문자열로 쉼표로 구분하여 작성
        // title,
        // category
    })
}

//google data base에 연결된 정보들을 가져오기
export async function getProducts(){
    //async 비동기 방식의 데이터 처리 방법(promise의 단점을 보완한 최신 비동기 처리 방식 코드)

    return get(ref(database,'products')).then((snapshot)=>{
        // 파이어베이스에 있는 실시간 데이터베이스의 product노드(경로)에 대한 참조와 함께 생성하고, 읽기작업을 시작하면 비동기로 호출받은 덩보값을 반환
        // .then((snapshot)snapshot은 내가 참조하고 있는 노드)
        // snapshot이라는 매개변수명을 사용하는 이유 : 특정 순간을 저장한 후에 결과와 비교 -> 일치 확인하는 테스트단계라서!

        if(snapshot.exists()){ //우리가 확인한 것 에서 데이터가 있으면? (snapshot에 접근한 노드에 데이터가 있는지 확인)
            return Object.values(snapshot.val()) //오브젝트를 통해서 값을 반환해라. (snapshot 노드에 있는 게이터를 오브젝트로 변환해서 내보내주라.)
        }
        return [] //아무것도 없으면 빈 배열을 내보내라
    })


    // 위 내용을 이렇게 풀어 써도 된다!!!
    // const snapshot = await get(ref(database,'products'));
    // if(snapshot.exists()){
    //     return Object.values(snapshot.val())
    // }else{
    //     return []
    // }
}

//장바구니에 저장된 요소들을 업데이트하기
export async function updateCart(userId, product){
    try{
        const cartRef = ref(database, `cart/${userId}/${product.id}`);//만든 폴더명이랑 같아야함
        await set(cartRef, product); 
    }catch(error){
        console.error(error);
    }
}

//파이어베이스에서 장바구니 목록 가져오기
export async function getCart(userId){
    try{
        const snapshot = await(get(ref(database,`cart/${userId}`)));
        if(snapshot.exists()){
            const item = snapshot.val();
            return Object.values(item)
        }else{
            return[];
        }
    }catch(error){
        console.error(error);
    }
}


// 장바구니 목록 삭제하기
export async function deleteCartItem(userId, productId){
    console.log(userId,productId);
    return remove(ref(database, `cart/${userId}/${productId}`));

}

//데이터베이스에 등록한 카테고리 불러오기
export async function getCategory(){
    const database = getDatabase();
    const CategoryRef = ref(database , 'products'); //폴더접근
    try{
        const snapshot = await get(CategoryRef);
        if(snapshot.exists()){
            return Object.values(snapshot.val());
        }
        return []
    }catch(error){
        console.error(error);
    }
}

//데이터베이스에 있는 카테고리 별 상품을 분류해서 불러오기
export async function getCategoryProduct(category) {
    return get(ref(database, 'products')).then((snapshot)=>{
        if(snapshot.exists()){
            const allProduct = Object.values(snapshot.val()) //먼저 모든 상품 정보를 받아 온 후에, 카테고리별로 필터링을 거치는 순서
            const filterProduct = allProduct.filter((product)=>product.category === category); //받아온 모든 상품 정보 중, 선택한 카테고리와 일치한다면
            return filterProduct //결국 필요한건 filterProduct!!!
        }
        return [] //없다면, 빈배열로 출력
    })
}

//상품 검색
export async function searchProduct(query){
    try{
        const dbRef = ref(database, 'products');
        const snapshot = await get(dbRef);

        if(snapshot.exists()){
            const data = snapshot.val();
            const allProduct = Object.values(data);

            if(allProduct.length === 0){
                return[]
            }
            const matchItems = allProduct.filter((product)=>{
                const itemTitle = product.title.toLowerCase()//받아온 문자열의 영어 대문자를 소문자로 변경해줌
                console.log(itemTitle);
                return itemTitle.includes(query.toLowerCase());
                
            })

            return matchItems;

        }else{
            return[]
        }

    } catch(error) {
        console.error(error);
    }
}

//스토리지에 있는 이미지 불러오기
export async function getStorageImg(imgPath){
    const storage = getStorage();

    try{
        const imgRef = storageRef(storage, imgPath);
        const downloadURL = getDownloadURL(imgRef);
        return downloadURL
     }catch(error){
        console.error(error);
     }
}

// 이메일 회원가입 저장하기
export async function joinEmail(email, password){
        const auth = getAuth()//저장할 사용사 인증 폼을 불러옴
        try{
            const userCradit = await createUserWithEmailAndPassword(auth, email, password);
            //createUserWithEmailAndPassword : 메서드를 이용해서 사용자정보, 이메일, 패스워드를 변수에 담음
            const user = userCradit.user;
            console.log(user);
            return user;
        }catch(error){
            console.error(error);
        }
}

//파이어베이스에서 이메일 로그인 정보 받아오기
export async function loginEmail(email, password){
    try{
        const userCreadit = await signInWithEmailAndPassword(auth, email, password);
        return userCreadit.user;
    }catch(error){
        console.error(error);
    }
}

//중복 아이디 체크
export async function checkEmail(email){ //이메일만 체크하면 됨
    const database = getDatabase();
    const userRef = ref();
}