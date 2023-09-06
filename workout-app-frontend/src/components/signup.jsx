import React, {useState, useRef, useEffect} from "react";
import "../component_style/signup_style.css";
import axios from "axios";

function SignUp(props){
    
    const [firstNameError, setFirstNameError] = useState(false);
    const [lastNameError, setLastNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [contactNoError, setContactNoError] = useState(false);
    const [ageError, setAgeError] = useState(false);
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [experienseError, setExperienseError] = useState(false);
    const [genderError, setGenderError] = useState(false);
    const [submit, setSubmit] = useState(false);

    const firstName = useRef(null);
    const lastName = useRef(null);
    const email = useRef(null);
    const contactNo = useRef(null);
    const age = useRef(null);
    const username = useRef(null);
    const password = useRef(null);
    const experiense = useRef(null);
    const gender = useRef(null);

    useEffect(() => {
        if(submit){
            props.handleLoading();
            const signupData = {
                firstName:firstName.current.value,
                lastName:lastName.current.value,
                age:age.current.value,
                gender:gender.current.value,
                experiense:experiense.current.value,
                email:email.current.value,
                contactNo:contactNo.current.value,
                username:username.current.value,
                password:password.current.value
            }
            axios.post('http://localhost:6600/signup', signupData)
                .then((Response)=>{
                    props.handleLoading();
                })
                .catch((Error)=>{
                    props.handleLoading();
                    console.log(Error);
                })
            setSubmit(false);
        }
    }, [submit]);

    return(
        <div id="signup_frame">
            <div id='form_section'>
                <span id='header'>Signup</span>
                <form>
                    <div className="input_sec">
                        <label className="text_label" for="first_name">First Name</label>
                        <input className="text" type="text" name="first_name" ref={firstName} placeholder="first name"/>
                    </div>
                    <label className="warning" style={{display:(firstNameError)?'inline':'none'}}>Invalid first name!!!</label>
                    <div className="input_sec">
                        <label className="text_label" for="last_name">Last Name</label>
                        <input className="text" type="text" name="last_name" ref={lastName} placeholder="last name"/>
                    </div>
                    <label className="warning" style={{display:(lastNameError)?'inline':'none'}}>Invalid last name!!!</label>
                    <div className="input_sec">
                        <label className="text_label" for="email">Email</label>
                        <input className="text" type="text" name="email" ref={email} placeholder="email"/>
                    </div>
                    <label className="warning" style={{display:(emailError)?'inline':'none'}}>Invalid email!!!</label>
                    <div className="input_sec">
                        <label className="text_label" for="contact_no">Contact Number</label>
                        <input className="text" type="text" name="conatct_no" ref={contactNo} placeholder="conatct number"/>
                    </div>
                    <label className="warning" style={{display:(contactNoError)?'inline':'none'}}>Invalid contact number!!!</label>
                    <div className="input_sec">
                        <label className="text_label" for="age">Age</label>
                        <input className="text" type="number" name="age" ref={age} placeholder="age" min='10' max='100'/>
                    </div>
                    <label className="warning" style={{display:(ageError)?'inline':'none'}}>Invalid age!!!</label>
                    <div className="input_sec">
                        <label className="text_label" for="gender">Gender</label>
                        <div id="gender_sec">
                            <input className="radio" type="radio" name="gender" ref={gender}/>
                            <label>Male</label>
                            <input className="radio" type="radio" name="gender" ref={gender}/>
                            <label>Female</label>
                        </div>
                    </div>
                    <label className="warning" style={{display:(genderError)?'inline':'none'}}>Gender cannot be empty!!!</label>
                    <div className="input_sec">
                        <label className="text_label" for="experiens">Experiens</label>
                        <div id="radio_sec">
                            <input className="radio" type="radio" name="radio" ref={experiense}/>
                            <label>Beginner</label>
                            <input className="radio" type="radio" name="radio" ref={experiense}/>
                            <label>Intermediate</label>
                            <input className="radio" type="radio" name="radio" ref={experiense}/>
                            <label>Expert</label>
                        </div>
                    </div>
                    <label className="warning" style={{display:(experienseError)?'inline':'none'}}>Experiens cannot be empty!!!</label>
                    <div className="input_sec">
                        <label className="text_label" for="username">Username</label>
                        <input className="text" type="text" name="username" ref={username} placeholder="username"/>
                    </div>
                    <label className="warning" style={{display:(usernameError)?'inline':'none'}}>Invalid username!!!</label>
                    <div className="input_sec">
                        <label className="text_label" for="password">Password</label>
                        <input className="text" type="password" name="password" ref={password} placeholder="password"/>
                    </div>
                    <label className="warning" style={{display:(passwordError)?'inline':'none'}}>Invalid password!!!</label>
                    <input id="button" type="submit" value="Signup" />
                </form>
            </div>
            <div id='link_section'>
                <a href='/login'>Do you already have an account?</a>
            </div>
        </div>
    );
}

export default SignUp;