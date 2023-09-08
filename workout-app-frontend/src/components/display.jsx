import React, {useState, useEffect} from "react";
import "../component_style/display_style.css";
import BackgroundImage from "../images/wall.webp";
import axios from "axios";

function Display(props){

    const [quotes, setQuotes] = useState([]);

    useEffect(() => {
        if(props.footerOn){
            props.handleLoading(true);
            axios.get('https://api.api-ninjas.com/v1/quotes?category=inspirational', {
                                    Headers:{
                                        'X-Api-Key': 'UuRylwHO0fo57hxZhRoZhYTobArfCI6A1oI27TY2',
                                    }
                                })
                                .then((Response) => {
                                    setQuotes(Response.data);
                                    props.handleLoading(false);
                                })
                                .catch((Error)=>{
                                    setQuotes([{quote:"The best form of flattery is to be admired, imitated or respected. I've always felt proud our fans look up to us or feel we are inspirational.", author:'Cheryl James'}]);
                                    console.log(Error);
                                    props.handleLoading(false);
                                })
        }
    }, []);

    return(
        <div id="display_frame" style={{marginTop:(!props.footerOn)?'60px':'0'}}>
            <div id="footer" style={{display:(props.footerOn)?'flex':'none', backgroundImage:`url(${BackgroundImage})`, backgroundRepeat:'no-repeat', backgroundSize:'cover', backgroundPositionY:'-100px'}}>
                {
                    (quotes.length >= 1)?<div id="quote">
                        <span id="quote_sec">"{quotes[0].quote}"</span>
                        <span id="author_sec">~{quotes[0].author}</span>
                    </div>:null
                }
            </div>
            {props.children}
        </div>
    );
}

export default Display;