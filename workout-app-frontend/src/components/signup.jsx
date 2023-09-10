import React, {useState, useRef, useEffect} from "react";
import "../component_style/signup_style.css";
import axios from "axios";
import validation from '../components/validation';
import { useNavigate } from "react-router-dom";

function SignUp(props){
    
    const[errors,setErrors] = useState([false, {}]);
    const[submit, setSubmit] = useState(false);
    const[gender, setGender] = useState('Male');
    const[level, setLevel] = useState('Beginner');
    const navigate = useNavigate();

    const firstName = useRef(null);
    const lastName = useRef(null); 
    const email = useRef(null);
    const contactNo = useRef(null);
    const age = useRef(null);
    const username = useRef(null);
    const password = useRef(null);

    useEffect(() => {
        if(!errors[0] && submit){
            props.handleLoading(true);
            const signupData = {
                firstName:firstName.current.value,
                lastName:lastName.current.value,
                age:age.current.value,
                gender:gender,
                level:level,
                email:email.current.value,
                contactNo:contactNo.current.value,
                username:username.current.value,
                password:password.current.value
            }
            axios.post('http://localhost:6600/signup', signupData, {maxRedirects:0})
                .then((Response)=>{
                    if(Response.status === 201){
                        navigate('/login');
                        props.handleLoading(false);
                    }
                })
                .catch((Error)=>{
                    props.handleLoading(false);
                    console.log(Error);
                })
        }
        setSubmit(false);
    }, [errors, gender, level, navigate, props, submit]);

    const[values, setValues] = useState({
        first_name: '',
        last_name: '',
        email: '',
        contact_no: '',
        age: '',
        username: '',
        password: '',
    });

    const changeGender = (event) => {
        setGender(event.target.closest('.gender').value);
    }

    const changeLevel = (event) => {
        setLevel(event.target.closest('.level').value);
    }

    const handleInput = (e) =>{
        setValues({...values, [e.target.name] : [e.target.value]});
    }

    function handleValidation(e) {
        e.preventDefault();
        setErrors(validation(values));
        setSubmit(true);
    }

    return(
        <div id="signup_frame">
            <div id='form_section'>
                <span id='header'>Signup</span>
                <form onSubmit={handleValidation}>
                    <div className="input_sec">
                        <label className="text_label" for="first_name">First Name</label>
                        <input className="text" type="text" name="first_name" ref={firstName} placeholder="first name" onChange={handleInput}/>
                    </div>
                    <label className="warning" style={{display:(errors[1].first_name)?'inline':'none'}}>Invalid first name!!!</label>
                    <div className="input_sec">
                        <label className="text_label" for="last_name">Last Name</label>
                        <input className="text" type="text" name="last_name" ref={lastName} placeholder="last name" onChange={handleInput}/>
                    </div>
                    <label className="warning" style={{display:(errors[1].last_name)?'inline':'none'}}>Invalid last name!!!</label>
                    <div className="input_sec">
                        <label className="text_label" for="email">Email</label>
                        <input className="text" type="text" name="email" ref={email} placeholder="email" onChange={handleInput}/>
                    </div>
                    <label className="warning" style={{display:(errors[1].email)?'inline':'none'}}>Invalid email!!!</label>
                    <div className="input_sec">
                        <label className="text_label" for="contact_no">Contact Number</label>
                        <input className="text" type="text" name="contact_no" ref={contactNo} placeholder="contact number" onChange={handleInput}/>
                    </div>
                    <label className="warning" style={{display:(errors[1].contact_no)?'inline':'none'}}>Invalid contact number!!!</label>
                    <div className="input_sec">
                        <label className="text_label" for="age">Age</label>
                        <input className="text" type="number" name="age" ref={age} placeholder="age" min='10' max='100' onChange={handleInput}/>
                    </div>
                    <label className="warning" style={{display:(errors[1].age)?'inline':'none'}}>Invalid age!!!</label>
                    <div className="input_sec">
                        <label className="text_label" for="gender">Gender</label>
                        <div id="gender_sec">
                            <input className="radio gender" type="radio" value='Male' onChange={changeGender} name="gender" defaultChecked/>
                            <label>Male</label>
                            <input className="radio gender" type="radio" value='Female' onChange={changeGender} name="gender" />
                            <label>Female</label>
                        </div>
                    </div>
                    <div className="input_sec">
                        <label className="text_label" for="experiens">Experiens</label>
                        <div id="radio_sec">
                            <input className="radio level" type="radio" value='Beginner' onChange={changeLevel} name="radio" defaultChecked/>
                            <label>Beginner</label>
                            <input className="radio level" type="radio" value='Intermediate' onChange={changeLevel} name="radio" />
                            <label>Intermediate</label>
                            <input className="radio level" type="radio" value='Expert' onChange={changeLevel} name="radio" />
                            <label>Expert</label>
                        </div>
                    </div>
                    <div className="input_sec">
                        <label className="text_label" for="username">Username</label>
                        <input className="text" type="text" name="username" ref={username} placeholder="username" onChange={handleInput}/>
                    </div>
                    <label className="warning" style={{display:(errors[1].username)?'inline':'none'}}>Invalid username!!!</label>
                    <div className="input_sec">
                        <label className="text_label" for="password">Password</label>
                        <input className="text" type="password" name="password" ref={password} placeholder="password" onChange={handleInput}/>
                    </div>
                    <label className="warning" style={{display:(errors[1].password)?'inline':'none'}}>Invalid password!!!</label>
                    <input id="button" type="submit" value="Signup"/>
                </form>
            </div>
            <div id='link_section'>
                <a href='/login'>Do you already have an account?</a>
            </div>
        </div>
    );
}

export default SignUp;