import React from 'react';
import DetailPageEvent from './DetailPageEvent';

function ProductItem({product : {id,image,title,price,option,category,caption}}) {

    return (
        <li>
            <DetailPageEvent product={{id,image,title,price,option,category,caption}}/>
        </li>
    );
}

export default ProductItem;