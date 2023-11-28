import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

function TopBtn() {

    //useState와 useEffect를 이용해서 특정 스크롤값(300px)이 이동하게 되면 top버튼이 생기도록
    //스크롤 이동값 알아내는 메서드 : pageYOffset

    const [scrollMove, setScrollMove] = useState(false);

    useEffect(()=>{
        const scrollEvent = () => {
            if(window.scrollY > 200){
                setScrollMove(true);
            } else {
                setScrollMove(false);
            }

        }
        console.log(window.pageYOffset);

        window.addEventListener('scroll',scrollEvent);

        return () => {
            window.removeEventListener('scroll',scrollEvent);
        }
    },[scrollMove])

    /*
    useEffect에 이벤트를 지정하는 이유
    1. 생명주기 관리에 용이 : 사람이 태어나고, 살고, 죽는것처럼 컴포넌트가 마운트 되고 마운트가 해제되는 것들을 컨트롤 할 수 있다.
    2. 불필요한 행동 방지! : useEffect로 리렌더릴 될 때 마다 새 이벤트가 추가로 발생하는 경우를 방지
     */


    const scrollTopEvent = () =>{
        window.scrollTo({ // scrollTo : 문서에서 지정된 위치로 이동, 문서의 좌측상단을 기준으로 한다. (top(y축), left(x축)가 기준!)
            top : 0,
            behavior : 'smooth' // 이동 애니메이션 속성, 기본값은 auto
        });
    }
    const scrollBtmEvent = () => {
        window.scrollTo({ 
            top : document.documentElement.scrollHeight, //어디에서 시작을 하는지로 보기 때문에 위에서 밖에 기준을 정할 수 없다.
            // 스크롤의 가장 하단은 윈도우(출력)영역이 아닌 전체 도큐멘트(DOM)의 길이로 구해야하기 때문에 윈도우가 아닌 도큐멘트로 지정
            behavior : 'smooth'
        })
    }

    return (
                <BtnWrap style={{opacity: scrollMove ? 1 : 0, pointerEvents : scrollMove ? 'auto' : 'none'}}>
                    <button onClick={scrollTopEvent}>
                        <IoIosArrowUp className='btnIco'/>
                    </button>
                    <button onClick={scrollBtmEvent}>
                        <IoIosArrowDown className='btnIco'/>
                    </button>
                </BtnWrap>
    );
}

const BtnWrap = styled.div`
    position: fixed;
    bottom: 50px;
    right: 50px;

    transition: opacity 750ms;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 100px;
    button {
        outline: none;
        border: none;
        background: #222222;
        color: #ededed;
        font-size: 20px;
        display: flex;
        .btnIco{

        }
    }
`



export default TopBtn;