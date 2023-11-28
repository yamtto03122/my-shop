import React, { useEffect, useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import { logOut, login, onUserState } from '../api/firebase';
import UserDatas from './UserDatas';
import { useAuthContext } from '../context/AuthContext';
import CategoryList from './CategoryList';
import Search from '../pages/Search';
import NavSearch from '../pages/NavSearch';

function Nav() {
    // const {user, login, logOut} = useAuthContext();

    const [user, setUser] = useState();
    const navigate = useNavigate();

    const userLogOut=()=>{
        logOut().then(setUser);
    }

    const userLogin=()=>{
        navigate('/login');
    }

    useEffect(() => {
        onUserState((user) => {
            // console.log(user)
            setUser(user);
        })
    }, [])
    // useEffect(() => {
    //     onUserState(setUser);
    // }, [])

    // const userLogin = () => {
    //     login().then(setUser);
    // }

    return (
        <>
            <HeaderContainer>

                <Link to='/'>
                    <div className='logo'>
                        <svg className="_fc6c973f" role="img" data-tn="logo2020" viewBox="0 0 84.99991 26.20541" aria-label="1stDibs">
                            <path d="M70.365 19.709v4.233a11.204 11.204 0 006.679 2.263c4.416 0 7.956-3.358 7.956-7.263 0-3.248-1.716-5.146-4.599-7.007l-3.613-2.336c-2.007-1.314-3.686-2.518-3.686-4.817 0-2.227 1.679-3.54 3.942-3.468 2.7.073 4.78 2.701 6.387 4.27V1.825A10.871 10.871 0 0077.518 0c-3.905-.036-6.97 2.3-6.97 5.986 0 3.175 1.86 4.708 4.744 6.496l3.321 2.044c2.117 1.314 3.686 2.92 3.686 5.548a4.642 4.642 0 01-4.854 4.708c-2.737 0-4.124-1.898-7.08-5.073M58.94 24.745c-1.569 0-2.81-.547-2.81-2.445V12.7h2.08c3.832 0 6.752 2.008 6.752 5.986 0 4.05-2.7 6.058-6.022 6.058M57.372 1.387c3.139 0 5.84 1.533 5.84 4.89 0 3.468-2.19 5.293-5.73 5.293h-1.35V1.387zm4.051 10.657c2.993-.876 4.781-2.883 4.781-5.766 0-3.869-3.248-5.986-8.832-5.986h-5.986a3.383 3.383 0 011.825 3.394V22.41a3.437 3.437 0 01-1.825 3.431h6.935c6.058 0 9.854-2.591 9.854-7.153 0-3.468-2.482-5.803-6.752-6.643M41.898 25.84h6.569a3.438 3.438 0 01-1.825-3.43V3.686A3.383 3.383 0 0148.467.292h-6.57a3.383 3.383 0 011.825 3.394V22.41a3.437 3.437 0 01-1.824 3.431m-14.052-1.095c-1.86 0-3.32-.547-3.32-2.445V1.387h1.787c6.205 0 9.818 4.453 9.818 11.825 0 7.628-3.905 11.533-8.285 11.533M26.313.292h-6.532a3.383 3.383 0 011.824 3.394V22.41a3.437 3.437 0 01-1.824 3.431h7.262c6.716 0 12.482-4.489 12.482-12.628 0-7.883-5.11-12.92-13.212-12.92m-8.065 23.14a4.052 4.052 0 01-2.3 1.058c-1.24 0-1.715-.767-1.715-2.409l-.036-5.073h3.43l.33-1.314h-3.76v-2.372l-3.613 3.503v.183h1.861v6.131c0 1.789.803 2.847 2.3 2.847a4.101 4.101 0 003.576-2.445zM17.226 8.284a3.378 3.378 0 00-1.861-2.883l-1.643-1.095c-.73-.51-1.24-.912-1.24-1.606a1.25 1.25 0 011.386-1.24c.986 0 2.008.839 2.957 1.824v-2.08a5.88 5.88 0 00-2.774-.73 2.855 2.855 0 00-3.139 2.81 3.118 3.118 0 001.716 2.664l1.825 1.241c.912.62 1.24 1.059 1.24 1.716 0 .802-.547 1.35-1.533 1.35-1.094 0-1.97-.84-3.248-2.226v2.336a5.434 5.434 0 002.956.949 3.22 3.22 0 003.358-3.03M1.058 25.84H10c-1.752-.766-2.993-1.533-2.993-4.16V3.795c0-1.606.073-3.03.146-3.613A14.996 14.996 0 010 2.847v.402c3.504 0 4.088.949 4.088 3.029v15.401c0 2.628-1.278 3.395-3.03 4.161"></path>
                        </svg>
                    </div>
                </Link>

                <div className='headerWrap'>
                    <NavSearch/>
                    <div className='userWrap'>
                        <Link to ='/cart'>CART</Link>
                        {user && user.isAdmin && (
                            <Link to='/Products/new'>
                                상품등록
                            </Link>
                        )}
                        {/* {user && <UserDatas user={user}/>}
                        {!user && <button onClick={login} className='loginBtn'>LOGIN</button>}
                        {user && <button onClick={logOut} className='logoutBtn'>LOGOUT</button>}
                        <Link to ='/login'>LOGIN</Link> */}
                        {user ? (
                            <>
                                {user && <UserDatas user={user}/>}
                                <button onClick={userLogOut} className='logoutBtn'>LOGOUT</button>
                            </>
                            ):(
                                <Link to={'/login'}>
                                    <button onClick={userLogin} className='loginBtn'>LOGIN</button>
                                 </Link>
                                // <button onClick={userLogin} className='loginBtn'>LOGIN</button>
                        )}
                    </div>

                                
                </div>
            </HeaderContainer>

            <HeaderCategoryList>
                <nav>
                    {/* <Link to='/Products/new'>
                        NEW
                    </Link> */}
                    <Link to='/Products'>
                        ALL VIEW
                    </Link>
                    <CategoryList/>
                </nav>
            </HeaderCategoryList>
        </>
    );
}

export default Nav;

const HeaderContainer = styled.header`
    display: flex;
    align-items: center;
    padding: 30px;
    a{
        text-decoration: none;
        color: #333333;
        h1{
            font-size: 17px;
        }
    }
    .logo{
        position: absolute;
        left: 50%;
        top: 30px;
        transform: translateX(-50%);
        width: 150px; display: flex;
    }
    .headerWrap{
        display: flex;
        align-items: center;
        width: 100%;
        justify-content: space-between;
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
    }
`

const HeaderCategoryList=styled.div`
    margin: 0 auto;
    border-bottom: 1px solid #333333;
    a{
            text-decoration: none;
            color: #333333;
            h1{
                font-size: 17px;
            }
        }
    
    nav {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 24px;
        /* margin-left: 50px; */
        >a{
            font-weight: 700;
        }
    }
`