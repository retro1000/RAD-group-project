import React from "react";
import {useNavigate} from "react-router-dom";
import "../component_style/navbar_style.css";
import logo from "../images/logo.png";

function NavBar(props){

    const navigate = useNavigate();

    const handleNavItemClick = (event) => {
        const navItem=event.target.closest('li').getAttribute('value');
        if(navItem !== 'about_us'){
            if(props.realPage.current !== navItem){
                props.handleLoading();
                navigate(`/${navItem}`);
                props.handleLoading();
            }else{
                props.handleScrollUp();
            }
        }else{
            props.scrollLocation.current.scrollIntoView({behavior:'smooth'});
        }
    }

    return(
        <div id="navbar_frame">
            <nav id="header">
                <ul>
                    <li id="logo"><img src={logo} alt="" style={{width:'50px', height:'50px'}}/></li>
                    <li id="nav_sec">
                        <ul>
                            <li id="home" className={(props.currentPage === 'home')?'current_page':"nav_topic"} value='home' onClick={handleNavItemClick}>Home</li>
                            <li id="dashboard" className={(props.currentPage === 'dashboard')?'current_page':"nav_topic"} value='dashboard' onClick={handleNavItemClick}>Dashboard</li>
                            <li id="workout" className={(props.currentPage === 'workout')?'current_page':"nav_topic"} value='workout' onClick={handleNavItemClick}>Workout</li>
                            <li id="my_workouts" className={(props.currentPage === 'my_workouts')?'current_page':"nav_topic"} value='my_workouts'onClick={handleNavItemClick}>My Workouts</li>
                            <li id="about_us" className={(props.currentPage === 'about_us')?'current_page':"nav_topic"} value='about_us'onClick={handleNavItemClick} >About Us</li>
                        </ul>
                    </li>
                    <li>
                        <div id="setting_sec">
                            <i id="logout" onClick={()=>{navigate('/logout')}}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 -960 960 960" width="30">
                                <path d="M479.825-438.5q-19.325 0-32.325-13.375-13-13.375-13-32.625v-335q0-18.675 13.175-32.588Q460.851-866 480.175-866q19.325 0 32.575 13.912Q526-838.175 526-819.5v335q0 19.25-13.425 32.625-13.426 13.375-32.75 13.375Zm.243 341Q401-97.5 331.75-127q-69.25-29.5-121.25-81.5T129-329.704Q99.5-398.908 99.5-478q0-69 24.731-132.75 24.732-63.75 71.167-114.06Q208.5-741 229.059-743t36.277 11.821q14.164 14.295 13.414 33.237T266.5-664.5Q231-626 211-578.137q-20 47.864-20 100.261 0 120.233 84.437 204.555Q359.875-189 480.116-189t204.563-84.433Q769-357.867 769-478.102q0-52.398-19.394-99.74Q730.212-625.185 695.5-664q-12-16-12.25-35.25T697-731.5q15.5-14.5 36.75-11.25T770-722.81q44 50.31 67.75 113.346t23.75 131.492q0 78.972-30 148.222-30 69.25-82 121.25T628.318-127q-69.183 29.5-148.25 29.5Z"/>
                            </svg>
                            </i>
                        </div>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default NavBar;