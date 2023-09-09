import React from "react";
import "../component_style/data_item.css";
import Img from "../images/wall.webp";

function DataItem(props){
    
    const getData = async() => {
        const url = `/exercises/view-one/${props.id}`;
        window.open(url, '_blank');
    }
        
    return(
        <div className="data_item_frame">
            <img src={Img} alt="" />
            <span>{props.name}</span>
            <div>
                <button>{(props.type!=='exercises')?'Follow':'Add'}</button>
                <button data-id={props.id} onClick={getData}>View</button>
            </div>
        </div>
    );
}

export default DataItem;