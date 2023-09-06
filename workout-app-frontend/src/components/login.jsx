import React, { useRef, useState, useEffect } from 'react';
import "../component_style/login_style.css";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

function Login(props) {
    
    const username = useRef(null);
    const password = useRef(null);
    const rememberMe = useRef(null);
    const [passwordError, setPasswordError] = useState(false);
    const [usernameError, setUsernameError] = useState(false);
    const [loginError, setLoginError] = useState(false);
    const [submit, setSubmit] = useState(false);
    const [rememberme, setRememeberme] = useState(false);
    const navigate = useNavigate();

    const handleRememberMe = ()=>{
        setRememeberme(!rememberme);
    }

    const checkAllFields = (Event) => {
        Event.preventDefault();
        if(username.current.value === '' || username.current.value === ' '){
            setUsernameError(true);
        }else{
            setUsernameError(false);
            setSubmit(true);
        }
        if(password.current.value === '' || password.current.value === ' '){
            setPasswordError(true);
        }else{
            setPasswordError(false);
            setSubmit(true);
        }
        if(!usernameError && !passwordError && submit){
            props.handleLoading(true);
            axios.post('http://localhost:6600/login', {
                username:username.current.value,
                password:password.current.value,
                remember_me:rememberme
            }, {maxRedirects: 0})
                .then(response => {
                    props.handleLoading(false);
                    console.log(response);
                    setLoginError(false);
                    if(response.status === 200) navigate('/home');   
                    if(response.status === 403) setLoginError(true);
                })
                .catch(Error =>{
                    props.handleLoading(false);
                    setLoginError(true);
                    console.log(Error);
                });
            setSubmit(false);
        }
        
    }

    return (
        <div id='login_frame'>
            <div id='form_section'>
                <span id='header'>Login</span>
                <form>
                    <input name='username' ref={username} className='text' type='text' placeholder='username' />
                    <label style={{display:(usernameError)?"inline":"none"}} className='warning'><span>username field cannot be empty</span></label>
                    <input name='password' ref={password} className='text' type='password' placeholder='password' />
                    <label style={{display:(passwordError)?"inline":"none"}} className='warning'><span>password field cannot be empty</span></label>
                    <input id='checkbox' ref={rememberMe} name='remember_me' type='checkbox' onChange={handleRememberMe}/>
                    <label><span>Remeber me</span></label>
                    <label style={{display:(loginError)?"inline":"none"}} className='login_warning'><span>Invalid username or password</span></label>
                    <input id='button' type='submit' value={'Login'} onClick={checkAllFields}/>
                </form>
            </div>
            <div id='link_section'>
                <a href='/signup'>Don't have an account?</a>
            </div>
        </div>
    )
}

export default Login;
