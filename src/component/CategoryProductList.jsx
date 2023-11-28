import React from 'react';
import DetailPageEvent from './DetailPageEvent';
import styled from 'styled-components';

function CategoryProductList({category, product}) {
    return (
        <div className='container'>
            <CaregoryTitle>{category}</CaregoryTitle>
            <ul className='productList'>
                {product.map((product)=>(
                    <li key={product.id}>
                        <DetailPageEvent product={product}/>
                    </li>
                ))}
            </ul>
        </div>
    );
}

const CaregoryTitle = styled.h2`
    font-size: 24px;
    padding-bottom: 50px;
    font-weight: normal;
`

export default CategoryProductList;