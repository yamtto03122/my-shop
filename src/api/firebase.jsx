import { initializeApp} from "firebase/app";
import { GoogleAuthProvider, getAuth, onAuthStateChanged, signInWithPopup, signOut  } from "firebase/auth";
import { ref, get, getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey : process.env.REACT_APP_FIREBASE_API_KEY, //정해진 문법
    authDomain : process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId : process.env.REACT_APP_FIREBASE_PROJECT_ID,
    database : process.env.REACT_APP_FIREBASE_DB_URL
    
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