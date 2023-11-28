import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCategory, getCategoryProduct, getStorageImg, storage } from '../api/firebase';
import Products from './Products';
import CategoryProductList from './CategoryProductList';
import ItemSlide from './ItemSlide';
import { listAll, ref } from 'firebase/storage';

function CategoryPage() {
    const [product, setProduct] = useState([]); //빈 배열로 비워두기
    const { category } = useParams(); //카테고리에 담겨있는 정보를 가져옴

    const[imgUrls, setImgUrls] = useState([]);

    useEffect(()=>{
        const fetchImgs = async() =>{
            const imgListRef = ref(storage, `${category}`);
            try{
                const imgRefs = await listAll(imgListRef);
                const selectRef = categoryRandomRef(imgRefs.items, 3);
                const urls = await Promise.all(
                    selectRef.map((ref)=>getStorageImg(ref))
                );
                setImgUrls(urls)
            }catch(error){
                console.error(error)
            }
        }
        fetchImgs();
    },[category])

    function categoryRandomRef(refs,count){
        return refs.sort(()=>0.5 - Math.random()).slice(0,count)
    }

    useEffect (()=>{
        getCategoryProduct(category).then((products)=>{
            setProduct(products)
        }).catch((error)=>{
            console.error(error)
        })
    },[category]);

    return (
        <div>
            <ItemSlide imgs={imgUrls}/>
            <div className='container'>
                <CategoryProductList category={category} product={product}/>
            </div>
        </div>
    );
}

export default CategoryPage;