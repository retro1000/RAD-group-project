import React, { useEffect, useState } from 'react';
import '../component_style/body_parts_style.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Img from '../images/fitness-women-training.jpg';

function BodyParts(props) {
    const [bodyPartsList, setBodyPartsList] = useState([]);
    const navigate = useNavigate();

    const handleBodyPartAction = async(event) => {
        const navItem=event.target.closest('div').value;
        console.log(navItem);
    }

    useEffect(() => {
            props.handleLoading(true);
            axios.get('http://localhost:6600/bodyParts', {maxRedirects:0})
                .then(response => {
                    props.handleLoading(false);
                    console.log(response);
                    if(response.status === 403) navigate('/login');
                    if(response.status === 200) setBodyPartsList(response.data);
                    if(response.status === 500) throw new Error('Internal server error');
                })
                .catch(error => {
                    props.handleLoading(false);
                    if(error.response && error.response.status === 403) navigate('/login');
                    if(error.response && error.response.status === 500) console.log('Internal server error');
                    console.error('Error fetching body parts:', Error);
                });
    }, []);

    return (
        <div className='main_frame_body_part'>
            {
                bodyPartsList.map(part => (
                    <div className='item_item' value={part.id} onClick={handleBodyPartAction}>
                        <img src={Img} alt='' />
                        <span>{part.name}</span>
                    </div>
                ))
            }
        </div>
    );
}

export default BodyParts;
