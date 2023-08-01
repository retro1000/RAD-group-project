import React, { useRef, useState, useEffect } from 'react';
import "../component_style/login_style.css";
import axios from 'axios';

function Login(props) {
    
    const username = useRef(null);
    const password = useRef(null);
    const rememberMe = useRef(null);
    const [passwordError, setPasswordError] = useState(false);
    const [usernameError, setUsernameError] = useState(false);
    const [loginError, setLoginError] = useState(false);
    const [submit, setSubmit] = useState(false);

    const checkAllFields = () => {
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
    }

    useEffect(() => {
        if(!usernameError && !passwordError && submit){
            props.handleLoading();
            axios.post('http://localhost:4080/login', {
                Headers: {
                    Authorization: 'Basic '+btoa(username.current.value+':'+password.current.value+':'+rememberMe.current.value),
                },
            })
                .then(Response => {
                    console.log(Response);
                    props.handleLoading();
                })
                .catch(Error =>{
                    console.log(Error);
                    props.handleLoading();
                })
            props.handleLoading();
            setSubmit(false);
        }
    }, [submit, props]);

    return (
        <div id='login_frame'>
            <div id='form_section'>
                <span id='header'>Login</span>
                <form>
                    <input name='username' ref={username} className='text' type='text' placeholder='username' />
                    <label style={{display:(usernameError)?"inline":"none"}} className='warning'><span>username field cannot be empty</span></label>
                    <input name='password' ref={password} className='text' type='password' placeholder='password' />
                    <label style={{display:(passwordError)?"inline":"none"}} className='warning'><span>password field cannot be empty</span></label>
                    <input id='checkbox' ref={rememberMe} name='remember_me' type='checkbox' />
                    <label><span>Remeber me</span></label>
                    <label style={{display:(loginError)?"inline":"none"}} className='login_warning'><span>Invalid username or password</span></label>
                    <input id='button' type='submit' value={'Login'} onClick={checkAllFields}/>
                </form>
            </div>
            <div id='link_section'>
                <a href='/vivolk/forgot_password'>Forgot your password?</a>
                <a href='/vivolk/signup'>Don't have an account?</a>
            </div>
        </div>
    )
}

export default Login;
