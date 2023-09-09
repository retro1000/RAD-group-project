import React, { useEffect, useState } from "react";
import "../component_style/bio_style.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Bio(props) {

    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function getData(){
            props.handleLoading(true);
            axios.post('http://localhost:6600/users/view',{}, {maxRedirects:0, withCredentials: true})
                .then(Response=>{
                    if(Response.status === 200) setUserData(Response.data.details);
                    if(Response.status === 403) navigate('/login');
                })
                .catch(Error=>{

                })
                .finally(
                    props.handleLoading(false)
                )
        }

        if(userData === null) getData();
    });

    return (
        <div className="bio-frame">
            <h1>Bio</h1>
            <div className="about">
                {
                    (userData !== null)?
                        <>
                        <div className="detail cl_1" style={{borderTopLeftRadius:'10px', borderTopRightRadius:'10px'}}>
                            <label>Full Name: </label>
                            <span>{userData.name}</span>
                        </div>
                        <div className="detail cl_2">
                            <label>Username: </label>
                            <span>{userData.username}</span>
                        </div>
                        <div className="detail cl_1">
                            <label>Age: </label>
                            <span>{userData.age}</span>
                        </div>
                        <div className="detail cl_2">
                            <label>Gender: </label>
                            <span>{userData.gender}</span>
                        </div>
                        <div className="detail cl_1">
                            <label>Contact Number: </label>
                            <span>{userData.contactNo}</span>
                        </div>
                        <div className="detail cl_2">
                            <label>Email: </label>
                            <span>{userData.email}</span>
                        </div>
                        <div className="detail cl_1" style={{borderBottomLeftRadius:'10px', borderBottomRightRadius:'10px'}}>
                            <label>Expert Level: </label>
                            <span>{userData.level}</span>
                        </div>
                        </>
                :null
                }   
            </div>
        </div>
    );
}

export default Bio;
