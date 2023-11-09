import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { getProducts } from '../api/firebase';
import ProductItem from './ProductItem';

function Products() {
    //서버와 데이터와의 동기화를 시켜주는 hook = react-query
    // state를 대체하는 데이터 동기화 hook
    // 설치 코드 : yarn add @tanstack/react-query

    const {
        isLoading,
        error,
        data : products,
    } = useQuery({
            queryKey : ['products'], //가져올려는 값
            queryFn: getProducts //값을 가져올 때 사용할 함수
        })
    console.log(products);

    return (
        <>
        {isLoading && <p>상품정보 업데이트 중입니다.</p>} {/* 만약 로딩중이라면, 로딩이라고 뜨고, */}
        {error && <p>상품정보를 불러올 수 없습니다.</p>} 

        <ul className='productList'>
            {products && products.map(product => (
                <ProductItem key={product.id} product={product}/>
            ))}
        </ul>
            
        </>
    );
}

export default Products;