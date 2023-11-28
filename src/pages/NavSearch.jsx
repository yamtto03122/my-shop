import { query } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { searchProduct } from '../api/firebase';
import { IoSearch } from "react-icons/io5";
import SearchItemList from '../component/SearchItemList';
import styled from 'styled-components';

function NavSearch() {

    const [query, setQuery] = useState('');
    const [result, setResult] = useState([]);

    const inputEvent = (e) => {
        setQuery(e.target.value);
        console.log(query);
    }

    useEffect(()=>{ //검색어가 입력되는 이벤트 방아쇠

        if(query.trim() === ''){
            //trim(): 공백을 감지함. 제거해줌?
            setResult([])
        }else{
            searchProduct(query).then((text)=>{
                setResult(text);
            }).catch((error)=>{
                console.error(error)
            })
        }

    },[query]); //query가 있을 때에만 실행


    const searchEvent = () => {
        if(query.trim === ''){
            setResult([])
        }else{
            searchProduct(query).then((text)=>{
                setResult(text);
            }).catch((error)=>{
                console.error(error)
            })
        }
    }

    return (
        <Search>
            <div className='NavSearchWrap'>
                <input type='text' value={query}  placeholder='SEARCH' onChange={inputEvent} className='searchForm'/>
                <button onClick={searchEvent} className='searchBtn'>
                    <IoSearch className='IoSearch'/>
                </button>
            </div>


            <ul className='searchResultList'>
                {result.map((product)=>(
                <SearchItemList key={product.id} products={product} className={SearchItemList}/>
                    ))}
            </ul>
            
        </Search>
    );
}

const Search = styled.div`
    width: 300px;
    .NavSearchWrap{
        position: relative;
        width: 300px;
        z-index: 999;
        height: 35px;
        margin: 0;
        .searchForm{
            width: 300px;
            height: 35px;
            background: #ffffff;
            border: 1px solid #b8b8b8;
            font-size: 17px;
            border-radius: 5px;
            padding: 0 10px;
            box-sizing: border-box;
        }
        .searchForm::placeholder{
            font-size:14px; color:#d3d3d3;
        }
        .searchBtn{
            position: absolute;
            right: 5px;
            top: 50%;
            transform: translateY(-50%);
            border: none;
            background: transparent;
            display: flex;
            justify-content: center;
            align-items: center;
            .IoSearch{
                font-size: 20px;
                color: #7b7b7b;
            }
        }
    }
    .searchResultList{
        width: 300px;
        max-height: 500px;
        overflow-y: scroll;
        position: absolute;
        top: 62px;
        box-sizing: border-box;
        z-index: 998;
        background: #ffffff;
        padding: 20px 20px 0;
        border: 1px solid #b8b8b8;
        border-top: none;
        border-radius: 0 0 5px 5px;
        .SearchItemList{
        }
        li > div{
            gap:20px;
            padding: 0px 0 12px;
        }
        li:last-child > div{
            border-bottom: none;
        }
    }
`

export default NavSearch;