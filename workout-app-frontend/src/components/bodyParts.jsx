import React, { useEffect, useState } from 'react'; // Corrected import statement, added useState
import '../component_style/body_parts_style.css';
import axios from 'axios';

function BodyParts(props) {
    const [bodyPartsList, setBodyPartsList] = useState([]); // Using state to store body parts list

    useEffect(() => {
        getParts(); // Call getParts function when component mounts
    }, []);

    const getParts = () => {
        props.handleLoading(true); // Set loading to true before making the API call
        axios.get('http://localhost:4080/bodyPart')
            .then(response => {
                props.handleLoading(false); // Set loading to false after API call
                setBodyPartsList(response.data); // Update body parts list using state
            })
            .catch(error => {
                props.handleLoading(false); // Set loading to false on error as well
                console.error('Error fetching body parts:', error);
            });
    };

    return (
        <div className='main_frame'>
            {
                bodyPartsList.map(part => (
                    <div className='item_item' key={part.id}>
                        <img src={part.img} alt='' />
                        <span>{part.name}</span>
                    </div>
                ))
            }
        </div>
    );
}

export default BodyParts;
