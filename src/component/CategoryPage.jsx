import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCategory, getCategoryProduct } from '../api/firebase';
import Products from './Products';
import CategoryProductList from './CategoryProductList';

function CategoryPage() {
    const [product, setProduct] = useState([]); //빈 배열로 비워두기
    const { category } = useParams(); //카테고리에 담겨있는 정보를 가져옴

    useEffect (()=>{
        getCategoryProduct(category).then((products)=>{
            setProduct(products)
        }).catch((error)=>{
            console.error(error)
        })
    },[category])
    return (
        <div>
            <CategoryProductList category={category} product={product}/>
        </div>
    );
}

export default CategoryPage;