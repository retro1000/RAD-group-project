import React, { useEffect, useRef } from "react";
import "../component_style/aboutUs_style.css";
import Logo from "../images/logo.png";

function AboutUs(props){
    
    const scrollRef = useRef(null);

    useEffect(() => {
        props.getLocation(scrollRef);
    }, []);

    return(
        <div id="about_us_frame" ref={scrollRef} style={{width:'98.7%', height:'350px', padding:'10px'}}>
            <div id="logo">
                <img src={Logo} alt=""></img>
                <span>workout</span>
            </div>
            <div id="details">
                <div id="panel_1">
                    <span>202/A/10, raid avenue, colombo</span>
                    <span>info@workout.com</span>
                    <span>+94 77 123 4456</span>
                </div>
                <div id="panel_2">
                    <i>
                        <svg stroke="currentColor" fill="#0165E1" strokeWidth="0" viewBox="0 0 512 512" height="1.8em" width="1.8em" xmlns="http://www.w3.org/2000/svg">
                            <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"></path>
                        </svg>  
                    </i>
                    <i>
                        <svg stroke="currentColor" fill="url(#gradient)" strokeWidth="0" viewBox="0 0 1024 1024" height="2em" width="2em" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <linearGradient id="gradient" gradientTransform="rotate(346)">
                                    <stop offset="0%" stopColor="#fdf497" />
                                    <stop offset="-1%" stopColor="#fdf497" />
                                    <stop offset="20%" stopColor="#fd5949" />
                                    <stop offset="40%" stopColor="#d6249f" />
                                    <stop offset="90%" stopColor="#285AEB" />
                                </linearGradient>
                            </defs>
                            <path d="M512 378.7c-73.4 0-133.3 59.9-133.3 133.3S438.6 645.3 512 645.3 645.3 585.4 645.3 512 585.4 378.7 512 378.7zM911.8 512c0-55.2.5-109.9-2.6-165-3.1-64-17.7-120.8-64.5-167.6-46.9-46.9-103.6-61.4-167.6-64.5-55.2-3.1-109.9-2.6-165-2.6-55.2 0-109.9-.5-165 2.6-64 3.1-120.8 17.7-167.6 64.5C132.6 226.3 118.1 283 115 347c-3.1 55.2-2.6 109.9-2.6 165s-.5 109.9 2.6 165c3.1 64 17.7 120.8 64.5 167.6 46.9 46.9 103.6 61.4 167.6 64.5 55.2 3.1 109.9 2.6 165 2.6 55.2 0 109.9.5 165-2.6 64-3.1 120.8-17.7 167.6-64.5 46.9-46.9 61.4-103.6 64.5-167.6 3.2-55.1 2.6-109.8 2.6-165zM512 717.1c-113.5 0-205.1-91.6-205.1-205.1S398.5 306.9 512 306.9 717.1 398.5 717.1 512 625.5 717.1 512 717.1zm213.5-370.7c-26.5 0-47.9-21.4-47.9-47.9s21.4-47.9 47.9-47.9 47.9 21.4 47.9 47.9a47.84 47.84 0 0 1-47.9 47.9z"></path>
                        </svg>                    
                    </i>
                    <i>
                        <svg stroke="currentColor" fill="red" strokeWidth="0" viewBox="0 0 576 512" height="2em" width="2em" xmlns="http://www.w3.org/2000/svg">
                            <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"></path>
                        </svg>                    
                    </i>
                </div>
            </div>
        </div>
    );
}

export default AboutUs;