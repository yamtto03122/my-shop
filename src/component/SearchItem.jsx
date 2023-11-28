import { query } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { searchProduct } from '../api/firebase';
import SearchItemList from './SearchItemList';
import { IoSearch } from "react-icons/io5";

function SearchItem() {

    const [query, setQuery] = useState('');
    const [result, setResult] = useState([]);

    // useEffect(()=>{ //검색어가 입력되는 이벤트 방아쇠

    //     if(query.trim() === ''){
    //         //trim(): 공백을 감지함. 제거해줌?
    //         setResult([])
    //     }else{
    //         searchProduct(query).then((text)=>{
    //             setResult(text);
    //         }).catch((error)=>{
    //             console.error(error)
    //         })
    //     }

    // },[query]); //query가 있을 때에만 실행

    const inputEvent = (e) => {
        setQuery(e.target.value);
        console.log(query);
    }

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
        <div className='container'>
            <div className='searchWrap'>
                <input type='text' value={query}  placeholder='SEARCH' onChange={inputEvent} className='searchForm'/>
                <button onClick={searchEvent} className='searchBtn'>
                    <IoSearch className='IoSearch'/>
                </button>
            </div>
            

            <ul className='searchResultList'>
                {result.map((product)=>(
                <SearchItemList key={product.id} products={product}/>
                    ))}
            </ul>
        </div>
    );
}

export default SearchItem;