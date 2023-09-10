import React, { useEffect, useState } from 'react';
import '../component_style/body_parts_style.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function BodyParts(props) {
    const [bodyPartsList, setBodyPartsList] = useState([]);
    const navigate = useNavigate();

    const handleBodyPartAction = (event) => {
        const bodyPartId=event.target.closest('div').getAttribute('value');
        if(bodyPartId !== null && bodyPartId !== undefined)navigate(`/workout/${props.type}/view`, {state:{bodyPart:bodyPartId, type:props.type}});
    }

    useEffect(() => {
            props.handleLoading(true);
            axios.get('http://localhost:6600/bodyParts', {maxRedirects:0, withCredentials:true})
                .then(response => {
                    if(response.status === 403) navigate('/login');
                    if(response.status === 200) setBodyPartsList(response.data);
                    if(response.status === 500) navigate('/login');
                })
                .catch(error => {
                    if(error.response && error.response.status === 403) navigate('/login');
                    if(error.response && error.response.status === 500) console.log('Internal server error');
                    console.error('Error fetching body parts:', Error);
                })
                .finally(
                    props.handleLoading(false)
                );
    }, [navigate, props]);

    return (
        <div className='main_frame_body_part color' style={{flexDirection:'column'}}>
            {(bodyPartsList.length>0)?<h1>{props.des}</h1>:null}
            {(bodyPartsList.length>0)?<span className='para'>{props.para}</span>:null}
            {
                (bodyPartsList.length>0)?
                    <div className='body_parts' style={{flexWrap:'wrap'}}>
                        {
                            bodyPartsList.map(part => (
                                <div className='item_item' value={part.bodyPartId} onClick={handleBodyPartAction}>
                                    <img src={`/${part.image}`} alt='' />
                                    <span>{part.name}</span>
                                </div>
                            ))
                        }
                    </div>
                    :null
            }
        </div>
    );
}

export default BodyParts;
