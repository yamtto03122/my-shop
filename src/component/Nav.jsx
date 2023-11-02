import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

function Nav() {
    return (
        <HeaderContainer>
            <Link to='/'>
                <h1>SHOP</h1>
            </Link>

            <nav>
                <Link to='/Products/new'>
                    NEW
                </Link>
                <Link to='Products'>
                    ALL VIEW
                </Link>
            </nav>

            <div className='userWrap'>
                <button className='loginBtn'>LOGIN</button>
                <button className='logoutBtn'>LOGOUT</button>
            </div>
        </HeaderContainer>
    );
}

export default Nav;

const HeaderContainer = styled.header`
    display: flex;
    align-items: center;
    padding: 12px;
    gap: 24px;
    a{
        text-decoration: none;
        color: #333333;
        h1{
            font-size: 14px;
        }
    }
    nav {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-left: 50px;
    }
    .userWrap{
        display: flex;
        margin-left: auto;
        align-items: center;
        gap: 12px;
        button{
            width: 80px;
            border: none;
            padding: 6px;
            cursor: pointer;
            border-radius: 3px;
            color: #ffffff;
        }
        .loginBtn {
            background: #008cff;
        }

        .logoutBtn {
            background: #929292;
        }
    }
`