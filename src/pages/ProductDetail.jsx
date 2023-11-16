import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import UseCart from '../context/UseCart';

function ProductDetail(props) {
    const state = useLocation().state;
    console.log(state)
    //useLocation() : 현재 url의 정보를 가져오는 리액트 돔 hook

    const { id, image, title, price, option, caption } = state;
    const setPrice = parseInt(price).toLocaleString()
    const setOpt = option.split(',').map(option => option.trim());

    const [selected, setSelected] = useState(setOpt && setOpt[0]);
    const [success, setSuccess] = useState();

    const selectOpt = (e) => setSelected(e.target.value);
    const {addItemCart} = UseCart();//addItemCart 가져오기

    const cartItem = () => { //cartItem을 누르면 얘가 가지고 있는 정보들을 추가해줘야댐
        const product = {id, image, title, price, option:selected, quantity : 1}
        //option:selected : 선택된 옵션
        //quantity : 수량체크
        addItemCart.mutate(product,{
            onSuccess : ()=>{
                setSuccess('장바구니에 상품이 추가되었습니다.')
            }
        })
    }

    return (
        <div className='container'>
            <div className='detailPage'>
                <div className='detailImg'>
                    <img src={image} alt={title}/>
                </div>

                <div className='detailText'>
                    <h2>{title}</h2>
                    <p>가격<span>{setPrice}₩</span></p>
                    <div className='detailOpt'>
                        {/* 리액트에서는 label의 FOr 대신은 htmlFor로 변경하여 사용 */}
                        <label className='lateText' htmlFor='optSelect'>옵션</label>
                        <select id='optSelect' onChange={selectOpt} value={selected}>
                            {setOpt && setOpt.map((option, index)=>(
                                <option key={index} value={option}>{option}</option>
                            ))}
                        </select>
                    </div>
                    <div className='text'>
                        <p>
                            {caption}
                        </p>
                    </div>

                    <div className='detailBtns'>
                        <button className='cartBtn' onClick={cartItem}>장바구니</button>
                        <button className='buyBtn'>구매하기</button>
                    </div>
                    {success && <p>{success}</p>}
                </div>

            </div>    
        </div>
    );
}

export default ProductDetail;