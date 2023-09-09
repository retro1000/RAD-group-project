import React, {useState, useRef, useEffect} from "react";
import "../component_style/signup_style.css";
import axios from "axios";
import validation from '../components/validation'

function SignUp(props){
    
    const[errors,setErrors] = useState([false, {}]);
    const[submit, setSubmit] = useState(false);

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
        if(!errors[0] && submit){
            props.handleLoading();
            const signupData = {
                firstName:firstName.current.value,
                lastName:lastName.current.value,
                age:age.current.value,
                gender:gender.current.value,
                level:experiense.current.value,
                email:email.current.value,
                contactNo:contactNo.current.value,
                username:username.current.value,
                password:password.current.value
            }
            axios.post('http://localhost:6600/signup', signupData)
                .then((Response)=>{
                    props.handleLoading(true);
                })
                .catch((Error)=>{
                    props.handleLoading(false);
                    console.log(Error);
                })
        }
        setSubmit(false);
    }, [errors, props, submit]);

    const[values,setValues] = useState({
        first_name: '',
        last_name: '',
        email: '',
        contact_no: '',
        age: '',
        username: '',
        password: '',
    })

    const handleInput = (e) =>{
        setValues({...values, [e.target.name] : [e.target.value]})

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
                        <div className="row">
                            <label className="text_label" for="first_name">First Name</label>
                            <input type="text" name="first_name" ref={firstName} placeholder="first name" onChange={handleInput}  className="text" />
                        </div>
                        {errors[1].first_name && <p className="warning" style={{color: "red"}}>{errors[1].first_name}</p>}
                    </div>
                    
                    <div className="input_sec">
                        <div className="row">
                            <label className="text_label" for="last_name">Last Name</label>
                            <input type="text" name="last_name" ref={lastName} placeholder="last name" onChange={handleInput}  className="text"/>
                        </div>
                        {errors[1].last_name && <p className="warning" style={{color: "red"}}>{errors[1].last_name}</p>}
                    </div>
                  
                    <div className="input_sec">
                        <div className="row">
                            <label className="text_label" for="email">Email</label>
                            <input type="text" name="email" ref={email} placeholder="email" onChange={handleInput}  className="text"/>
                        </div>
                        {errors[1].email && <p className="warning" style={{color: "red"}}>{errors[1].email}</p>}
                    </div>

                    <div className="input_sec">
                        <div className="row">
                            <label className="text_label" for="contact_no">Contact Number</label>
                            <input type="text" name="contact_no" ref={contactNo} placeholder="contact number" onChange={handleInput}  className="text"/>
                        </div>
                        {errors[1].contact_no && <p className="warning" style={{color: "red"}}>{errors[1].contact_no}</p>}
                    </div>

                    <div className="input_sec">
                        <div className="row">
                            <label className="text_label" for="age">Age</label>
                            <input type="number" name="age" ref={age} placeholder="age" min='10' max='100' onChange={handleInput}  className="text"/>
                        </div>
                        {errors[1].age && <p className="warning" style={{color: "red"}}>{errors[1].age}</p>}
                    </div>

                    <div className="input_sec" style={{position: 'relative', right: '-100px'}}>
                        <label className="text_label" for="gender">Gender</label>
                        <div id="gender_sec">
                            <input className="radio" type="radio" name="gender" ref={gender} defaultChecked/>
                            <label>Male</label>
                            <input className="radio" type="radio" name="gender" ref={gender}/>
                            <label>Female</label>
                        </div>
                    </div>

                    <div className="input_sec" style={{position: 'relative', right: '-100px'}}>
                        <label className="text_label" for="experiens">Experiens</label>
                        <div id="radio_sec"style={{position: 'relative', right: '95px'}}>
                            <input className="radio" type="radio" name="radio" ref={experiense} defaultChecked/>
                            <label>Beginner</label>
                            <input className="radio" type="radio" name="radio" ref={experiense}/>
                            <label>Intermediate</label>
                            <input className="radio" type="radio" name="radio" ref={experiense}/>
                            <label>Expert</label>
                        </div>
                    </div>

                    <div className="input_sec">
                        <div className="row">
                            <label className="text_label" for="username">Username</label>
                            <input type="text" name="username" ref={username} placeholder="username" onChange={handleInput}  className="text"/>
                        </div>
                        {errors[1].username && <p className="warning" style={{color: "red"}}>{errors[1].username}</p>}
                    </div>

                    <div className="input_sec">
                        <div className="row">
                            <label className="text_label" for="password">Password</label>
                            <input type="password" name="password" ref={password} placeholder="password" onChange={handleInput}  className="text"/>
                        </div>
                        {errors[1].password&& <p className="warning" style={{color: "red"}}>{errors[1].password}</p>}
                    </div>
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