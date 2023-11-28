import React, { useEffect, useState } from 'react';
import Products from '../component/Products';
import ItemSlide from '../component/ItemSlide';
import { listAll, ref } from 'firebase/storage';//파이어베이스가 아니라 파이어베이스 안의 스토리지로 경로를 잡아야함
import { getStorageImg, storage } from '../api/firebase';

function Allproduct() {
    // const slidePath = [
    //         'https://res.cloudinary.com/dnva5k3id/image/upload/v1700189069/mainSlide_01_bsoo9r.png',
    //         'https://res.cloudinary.com/dnva5k3id/image/upload/v1700189069/mainSlide_02_tkelpy.png',
    //         'https://res.cloudinary.com/dnva5k3id/image/upload/v1700189069/mainSlide_03_mpla8z.png'
    // ]

    const [imgUrls, setImgUrls] = useState([]);

    useEffect(()=>{
        const fetchImgs = async() => {
            const imgListRef = ref(storage);
            try{
                const imgRef = await listAll(imgListRef);
                const selectRef = categoryRandomRef(imgRef.items, 3)
                const urls = await Promise.all(
                    selectRef.map((ref)=>getStorageImg(ref))
                );
                setImgUrls(urls);
            }catch(error){
                console.error(error);
            }
        }
        fetchImgs();

    },[]);
    console.log(imgUrls);

    function categoryRandomRef(refs,count){
        return refs.sort(()=>0.5 - Math.random()).slice(0,count)
        /* 순서를 무작위로 섞는 공식 
        sort : 순서를 특정한 기준에 의해서 정렬하는 메서드 [-1,0,1]을 구별
        받아온 배열에서 sort를 돌려서 -1,0,1이 나오도록 랜덤한 수를 생성(math.random)
        math.random은 0~1 사이의 값을 반환하게 되는데, 반환되는 값에서 0.5를 빼면 균등하게 음수와 양수를 뽑아낼 수 있다.
        0.5 외에 다른 숫자가 들어올 수 있지만 가장 균등한 확률은 중간값인 0.5를 넣어준다.
        slice는 정렬된 배열중에서 시작순번부터 끝나는 순번까지 잘라내는 역할을 한다.
        ex) a, b를 sort를 이용해서 정렬할 때 -1을 반환하게 되면 앞으로, 1을 반환하게하면 뒤로 가게되며 0을 반환 할 경우엔 정렬하지 않는다.
        */
    }


    return (
        <>
            <ItemSlide imgs={imgUrls}/>
            <div className='container'>
                <Products/>
            </div>
        </>
    );
}



export default Allproduct;