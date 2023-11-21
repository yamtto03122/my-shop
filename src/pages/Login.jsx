//로그인 페이지
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login, loginEmail } from '../api/firebase';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [errorMsg, setErrorMsg] = useState(''); 

    //구글로그인 버튼
    const googleLogin = async() => {
        const user = await login(); //로그인 완료시
        navigate('/'); //메인페이지로 이동
    }

    const loginEvent = async (e) => {
        e.preventDefault();
        try{
            const user = await loginEmail(email, password);
            console.log(user)
            if(user){
                navigate('/');
            }else{
                setErrorMsg('아이디나 비밀번호가 일치하지 않습니다.');
            }
        }catch(error){
            console.error(error);
        }
    }
    return (
        <div className='container'>
            <h2>LOGIN</h2>
            <form onSubmit={loginEvent}>
                <input type='email' placeholder='이메일을 입력하세요.' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <input type='password' placeholder='비밀번호를 입력하세요.' value={password} onChange={(e)=>setPassword(e.target.value)}/>
                <button type='submit'>Login</button>
                <button onClick={googleLogin}>Google Login</button>
                {errorMsg && <span className='errorText'>{errorMsg}</span>}
            </form>
            <Link to='/join'>회원가입</Link>
        </div>
    );
}

export default Login;