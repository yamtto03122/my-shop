import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    /* v2.0 | 20110126
    http://meyerweb.com/eric/tools/css/reset/ 
    License: none (public domain)
    */
    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed, 
    figure, figcaption, footer, header, hgroup, 
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    /* font: inherit; */
    vertical-align: baseline;
    }
    /* HTML5 display-role reset for older browsers */
    article, aside, details, figcaption, figure, 
    footer, header, hgroup, menu, nav, section {
    display: block;
    }
    body {
    line-height: 1;
    }
    ol, ul {
    list-style: none;
    }
    blockquote, q {
    quotes: none;
    }
    blockquote:before, blockquote:after,
    q:before, q:after {
    content: '';
    content: none;
    }
    table {
    border-collapse: collapse;
    border-spacing: 0;
    }
    a{
    text-decoration: none;
    }
    img{
    display: block;
    width: 100%;
    }
    button{
        cursor: pointer;
    }
    .container{
        max-width: 1280px;
        margin: 70px auto 100px;
    }

    .productList{
        display: flex;
        gap: 24px 5%;
        flex-wrap: wrap;
        li {
            flex-shrink: 0;
            flex-basis: 30%;

            .textWrap{
                margin: 20px 0;
                .itemTitle{
                    font-size: 16px;
                    margin-bottom: 10px;
                    font-weight: bold;
                }
                .itemFlex {
                    .itemPrice{
                        font-size: 14px;
                        margin-bottom: 10px;
                    }
                    .itemOption{
                        color: #878787;
                        font-size: 14px;
                    }
                }
            }
        }
    }

    //Deatail page
.detailPage{
    max-width:1024px;
    display: flex;
    gap: 40px;
    margin: 0 auto;
    .detailImg{
        max-width: 400px;
        img{
            width: 100%;
            display: block;
        }
    }
    .detailText{
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 16px;
        h2{
            width: 100%;
            font-size: 24px;
            font-weight: normal;
            border-bottom: 1px solid #dddddd;
            padding-bottom: 16px;
        }
        p{
            width: 100%;
            padding-bottom: 16px;
            color: rgba(0,0,0,0.7);
            display: flex;
            font-size: 17px;
            span{
                padding-left: 100px;
            }
        }
        .detailOpt{
            width: 100%;
            display: flex;
            label{
                font-size: 17px;
                color: rgba(0,0,0,0.7);
            }
            select{
                margin-left: 100px;
                width: 100px;
                padding: 6px 12px;
                background: transparent;
                border: 1px solid black;
            }
            
        }
        .detailBtns{
            display: flex;
            gap: 16px;
            margin-top:auto;
            flex-direction: column;
            button{
                width: 100%;
                height: 50px;
                border: none;
                font-size: 17px;
                background: #000000;
                color: #ffffff;
            }
            .cartBtn{
            }
        }

        
    }
}


//cart
.cartList{
    display: flex;
    flex-direction: column;
    gap: 20px;
    border-top: 1px solid #ddd;
    padding: 24px 0;
    li{
        display: flex;
        align-items: center;
        border-bottom: 1px solid #ddd;
        padding: 12px 0;
        gap: 12px;
        img{
            width: 100px;
            display: block;
            border-radius: 5px;
        }
    }
}

//searsh result


.searchWrap{
    width: 100%;
    height: 50px;
    position: relative;
    margin-bottom: 50px;
    .searchForm{
        width: 100%;
        height: 50px;
        
        background: #ffffff;
        border: 1px solid #b8b8b8;
        font-size: 17px;
        border-radius: 5px;
        padding: 0 20px;
        box-sizing: border-box;
    }
    .searchForm::placeholder{
        font-size:14px; color:#d3d3d3;
    }
    .searchBtn{
        position: absolute;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
        .IoSearch{
            font-size: 30px;
            color: #7b7b7b;
        }
    }
}

.searchResultList{
    display: flex;
    gap: 12px;
    flex-direction: column;
    li{
        >div{
            display: flex;
            gap: 30px;
            align-items: center;
            padding: 12px 0 24px;
            border-bottom: 1px solid #b8b8b8;
        }
    }
    img{
        width: 100px;
        border-radius: 5px;
    }

    .textWrap{
        margin: 20px 0;
        .itemTitle{
            font-size: 16px;
            margin-bottom: 10px;
            font-weight: bold;
        }
        .itemFlex {
            .itemPrice{
                font-size: 14px;
                margin-bottom: 10px;
            }
            .itemOption{
                color: #878787;
                font-size: 14px;
            }
        }
    }
    
}


`


export default GlobalStyle;