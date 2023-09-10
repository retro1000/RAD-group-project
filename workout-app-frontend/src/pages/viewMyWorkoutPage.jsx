import React, {useEffect, useRef, useState} from "react";
import Navbar from "../components/navbar";
import Display from "../components/display";
import AboutUs from "../components/aboutUs";
import Loading from "../components/loading";
import Exercise from "../components/exercise";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function ViewMyWorkoutPage(){

    const [loading, setLoading] = useState(false);
    const [scrollRef, setScrollRef] = useState(null);
    const [scrollInAboutUs, setScrollInAboutUs] = useState(false);
    const [scrollUp, setScrollUp] = useState(false);
    const realPage = useRef('my_workouts');
    const {id} = useParams();
    const [exerciseData, setExerciseData] = useState(null);
    const [exercises, setExercises] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function getData(){
            await axios.post('http://localhost:6600/users/get_workout', {workoutId:id}, {withCredentials:true, maxRedirects:0})
                .then(Response=>{
                    if(Response.status ===  200) setExerciseData(Response.data.details);
                    if(Response.status === 403) navigate('/login');
                })
                .catch(Error=>{

                })
        }

        if(id !== null) getData();
    }, [id, navigate]);

    useEffect(() => {
        async function getExercises(){
            await axios.post('http://localhost:6600/exercises/getByIds', {ids:exerciseData.map(data=>(data.id))}, {withCredentials:true, maxRedirects:0})
                .then(Response=>{
                    if(Response.status === 200){
                        const newList = Response.data.details.map((data, index) => (
                            {exersiceId:data.exersiceId, name:data.name, mainImage:data.mainImage, reps:exerciseData[index].reps}
                        ));
                        setExercises(...[newList]);
                    }
                    if(Response.status === 403) navigate('/login')
                })
                .catch(Error=>{

                })
        }
        
        if(exerciseData !== null) getExercises();
    }, [exerciseData, navigate]);

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
                <Navbar realPage={realPage} currentPage={(!scrollInAboutUs)?'my_workouts':'about_us'} handleLoading={handleLoading} scrollLocation={scrollRef} handleScrollAboutUs={handleScrollAboutUs} handleScrollUp={handleScrollUp}/>
                <Display footerOn={false} handleLoading={handleLoading}>
                    {
                        (exercises !== null && exercises.length>0)?
                            exercises.map((exercise) => (
                                <Exercise reps={exercise.reps} cancel={false} name={exercise.name} img={exercise.mainImage} id={exercise.exersiceId}/>
                            ))
                        :null
                    }
                </Display>
                <AboutUs getLocation={getLocation}/>
            </div>
            <Loading right={'50%'} left={'50%'} top={'50%'} bottom={'50%'} loading={loading}/>
        </div>
    );
}

export default ViewMyWorkoutPage;