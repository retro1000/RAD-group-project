import React, { useEffect, useState } from "react";
import "../component_style/data_item.css";
import Img from "../images/wall.webp";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function DataItem(props){
    
    const navigate = useNavigate();
    const [success, setSuccsess] = useState(false);

    useEffect(()=>{
        if(success){
            const timerId = setTimeout(() => {
                setSuccsess(false);
            }, 3000);
        
            return () => {
                clearTimeout(timerId);
            };
        }
    }, [success]);
    
    const getData = () => {
        const url = `/exercises/view-one/${props.id}`;
        window.open(url, '_blank');
    }
       
    const handleClick = async() => {
        if(props.type !== null && props.type !== 'exercises'){
            await axios.post('http://workout/select-workout', {workoutId:props.id, name:props.name, img:props.img}, {withCredentials:true, maxRedirects:0})
                .then(Response=>{
                    if(Response.status === 200) setSuccsess(true);
                    if(Response.status === 403) navigate('/login');
                })
                .catch(Error=>{

                })
        }else{
            props.handleSelectedList(props.id, props.name, props.img);
        }
    }
    
    return(
        <div className="data_item_frame">
            <img src={Img} alt="" />
            <span>{props.name}</span>
            <div>
                <button onClick={handleClick}>{(props.type!=='exercises')?'Follow':'Add'}</button>
                <button data-id={props.id} onClick={getData}>View</button>
            </div>
            {(success)?<p style={{fontSize:'14px', fontWeight:'600'}}>Added successfully.</p>:null}
        </div>
    );
}

export default DataItem;