import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { getCategory } from '../api/firebase';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

function CategoryList() {
    const {data : categories} = useQuery(['categoried'],getCategory);
    const setCategory = new Set(); //Set() : 특정한 값을 배열로 출력해 줄 때 중복요소를 걸러준다.

    if(categories){
        categories.forEach((categoryObj)=>{
            setCategory.add((categoryObj.category));
            //add : 배열에 추가하는 메서드
        })
    }
    const setCategoryArr = [...setCategory]
    console.log(setCategoryArr);

    return (
        <CategoryItemList>
            {setCategoryArr.map((category, index)=>(
                <CategoryItem key={index}>
                    <Link to={`/products/${category}`}> {/* 이 링크를 클릭하면 카테고리 페이지로 넘어가게 해준다 */}
                        {category}
                    </Link>
                </CategoryItem>
            ))}
        </CategoryItemList>
    );
}

const CategoryItemList = styled.ul`
    display: flex;
    gap: 30px;
    padding: 24px;
`

const CategoryItem = styled.li`
    a{
        color : black;
    }
`

export default CategoryList;