import React, { useEffect, useRef, useState } from "react";
import NavBar from "../components/navbar";
import Display from "../components/display";
import AboutUs from "../components/aboutUs";
import Loading from "../components/loading";
import Workout from "../components/workout";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function MyWorkoutPage(){

    const [loading, setLoading] = useState(false);
    const [scrollRef, setScrollRef] = useState(null);
    const [scrollUp, setScrollUp] = useState(false);
    const [scrollInAboutUs, setScrollInAboutUs] = useState(false);
    const realPage = useRef('my_workouts');
    const [workoutData, setWorkoutData] = useState(null);
    const navigate =  useNavigate();

    useEffect(() => {
        async function getData(){
            await axios.get('http://localhost:6600/users/my-workouts', {withCredentials:true, maxRedirects:0})
                .then(Response=>{
                    if(Response.status === 200) setWorkoutData(Response.data.workouts);
                    if(Response.status === 403) navigate('/login');
                })
                .catch(Error=>{

                })
        }

        getData();
    }, [navigate]);

    useEffect(() => {
        const handleScroll = () => {
            const { scrollTop, clientHeight, scrollHeight} = document.documentElement;
            if(scrollTop+clientHeight >= scrollHeight-200){
                setScrollInAboutUs(true);
            }else{
                setScrollInAboutUs(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };

    }, []);

    useEffect(() => {
        window.scrollTo({top:0, behavior:'smooth'});
    }, [scrollUp]);

    useEffect(() => {
        window.scrollTo({top:0, behavior:'smooth'});
    }, []);

    const handleLoading = (val) => {
        setLoading(val);
    }

    const getLocation = (val) => {
        setScrollRef(val);
    }

    const handleScrollAboutUs = (val) => {
        setScrollInAboutUs(val);
    }

    const handleScrollUp = () => {
        setScrollUp(!scrollUp);
    }

    return(
        <div>
            <div style={{display:'flex', flexDirection:'column', pointerEvents:(loading)?'none':null, filter:(loading)?'blur(1px)':null}}>
                <NavBar realPage={realPage} currentPage={(!scrollInAboutUs)?'my_workouts':'about_us'} handleLoading={handleLoading} scrollLocation={scrollRef} handleScrollAboutUs={handleScrollAboutUs} handleScrollUp={handleScrollUp}/>
                <Display footerOn={false} handleLoading={handleLoading}>
                    {
                        (workoutData !== null && workoutData.length > 0)?
                            (workoutData.map(workout => (
                                <Workout name={workout.name} status={workout.status} workoutId={workout.workoutId} />
                            )))
                        :null
                    }
                </Display>
                <AboutUs getLocation={getLocation}/>
            </div>
            <Loading right={'50%'} left={'50%'} top={'50%'} bottom={'50%'} loading={loading}/>
        </div>
    );
}

export default MyWorkoutPage;