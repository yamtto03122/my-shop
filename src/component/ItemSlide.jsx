import React, { useEffect, useState }  from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import { Autoplay, EffectFade } from 'swiper/modules'
import 'swiper/css/effect-fade';
import { ref, get, set, getDatabase, remove } from 'firebase/database';
import { getStorage, getDownloadURL, ref as storageRef } from 'firebase/storage';
import { getStorageImg } from '../api/firebase';


function SlideItem({imgs}) {

    // const sliderImg = [
    //     'https://res.cloudinary.com/dnva5k3id/image/upload/v1700189069/mainSlide_01_bsoo9r.png',
    //     'https://res.cloudinary.com/dnva5k3id/image/upload/v1700189069/mainSlide_02_tkelpy.png',
    //     'https://res.cloudinary.com/dnva5k3id/image/upload/v1700189069/mainSlide_03_mpla8z.png'
    // ];


    const [imgUrl, setImgUrl] = useState([]);

    useEffect (()=>{
        const loadImg = async() => {
            try{
                const urls = await Promise.all(
                    imgs.map((imgPath)=>getStorageImg(imgPath))
                    );
                    setImgUrl(urls);
                    // console.log(imgUrl);                 
            }catch(error){
                console.error(error);
            }
        }
        loadImg()
    },[imgs])

    const slider = {
        with : '100%',
        height : '600px'
    }

    return (
        <>

        {/*슬라이더 속성은 <> 안에 넣어야한다. */}
        <Swiper style={slider} 
            slidePerView={1}
            loop={true}
            autoplay={{delay : 3000}}
            speed={1000}
            modules={[Autoplay, EffectFade]}
            effect={'fade'}
        >
            {imgUrl.map((el,index)=>(
                <SwiperSlide key={index} style={{backgroundImage: `url(${el})`, backgroundSize : 'cover'}}></SwiperSlide>
            ))}

        </Swiper>
        </>
    );
}

export default SlideItem;