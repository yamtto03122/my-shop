import React from 'react';
import DetailPageEvent from './DetailPageEvent';

function SearchItemList({products : {id, title, image, price, option, caption}}) {
    return (
        <li>
            <DetailPageEvent product={{id, image, title, price, option, caption}}/>
        </li>
    );
}

export default SearchItemList;