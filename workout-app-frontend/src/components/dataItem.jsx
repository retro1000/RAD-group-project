import React, {useState, useEffect} from "react";
import "../component_style/data_item.css";
import Img from "../images/wall.webp";

function DataItem(props){
    
    return(
        <div className="data_item_frame">
            <img src={Img} alt="" />
            <span>{props.name}</span>
            <div>
                <button>{(props.type!=='exercises')?'Follow':'Add'}</button>
                <button data-id={props.id}>View</button>
            </div>
        </div>
    );
}

export default DataItem;