import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import { logOut, login, onUserState } from '../api/firebase';
import UserDatas from './UserDatas';
import { useAuthContext } from '../context/AuthContext';

function Nav() {
    const {user, login, logOut} = useAuthContext();
    // const [user, setUser] = useState();

    // useEffect(() => {
    //     onUserState((user) => {
    //         console.log(user)
    //         setUser(user);
    //     })
    // }, [])
    // useEffect(() => {
    //     onUserState(setUser);
    // }, [])

    // const userLogin = () => {
    //     login().then(setUser);
    // }

    // const userLogOut = () => {
    //     logOut().then(setUser);
    // }

    return (
        <HeaderContainer>
            <Link to='/'>
                <h1>SHOP</h1>
            </Link>

            <nav>
                <Link to='/Products/new'>
                    NEW
                </Link>
                <Link to='/Products'>
                    ALL VIEW
                </Link>
            </nav>

            <div className='userWrap'>
                {user && user.isAdmin && (
                    <Link to='/Products/new'>
                        상품등록
                    </Link>
                )}
                {user && <UserDatas user={user}/>}
                {!user && <button onClick={login} className='loginBtn'>LOGIN</button>}
                {user && <button onClick={logOut} className='logoutBtn'>LOGOUT</button>}              
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