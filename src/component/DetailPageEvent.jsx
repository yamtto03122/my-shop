import React from 'react';
import { useNavigate } from 'react-router-dom';

function DetailPageEvent({product}) {

    /*
   단순한 페이지 이동이 목적이라면 Link를 사용하면 되지만, 페이지를 이동하면서 데이터의 이동도 포함해야한다면, Link가 아닌 useNavigate를 사용해야한다. 
    
    */

   const setPrice = parseInt(product.price).toLocaleString();
   // const setPrice = parseInt(price).toLocaleString(); //toLocaleString(); : 숫자 단위, 날짜에서 자동으로 콤마를 찍어주는 메서드

   const navigate = useNavigate();

   const detail = () => {
        navigate(`/products/detail/${product.id}`,{ // 이 아디가 넘어가면서 
            state : { // 얘네도 같이 넘겨진다.
                title : product.title,
                id : product.id,
                image : product.image,
                price : product.price,
                option : product.option,
                category : product.category,
                caption : product.caption
            }
        })
   }

    return (
        <div onClick={detail}>
            <img src = {product.image} alt={product.title}/>
            <div className='textWrap'>
                <h3 className='itemTitle'>{product.title}</h3>
                <div className='itemFlex'>
                    <p className='itemPrice'>{setPrice} ₩</p>
                    <p className='itemOption'>{product.option}</p>
                </div>
            </div>
            
        </div>
    );
}

export default DetailPageEvent;