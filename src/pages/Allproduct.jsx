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