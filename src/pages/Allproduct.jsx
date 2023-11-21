import React from 'react';
import Products from '../component/Products';
import SlideItem from '../component/SlideItem';

function Allproduct() {
    return (
        <>
            {/* <SlideItem imgUrl={slidePath}/> */}
            <div className='container'>
                <Products/>
            </div>
        </>
    );
}



export default Allproduct;