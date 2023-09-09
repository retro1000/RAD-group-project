import React, {useState, useEffect, useRef} from "react";
import Loading from "../components/loading";
import NavBar from "../components/navbar";
import Display from "../components/display";
import AboutUs from "../components/aboutUs";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ViewExercise from "../components/viewExercise";
import axios from "axios";

function ExercisePage(props){

    const [loading, setLoading] = useState(false);
    const [scrollRef, setScrollRef] = useState(null);
    const [scrollInAboutUs, setScrollInAboutUs] = useState(false);
    const [scrollUp, setScrollUp] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const realPage = useRef('workout');
    const [exerciseDetails, setExerciseDetails] = useState(null);

    const {id} = useParams();
    useEffect(() => {
        const getData = async() => {
            await axios.post(`http://localhost:6600/exercises/view`, {id:id}, {withCredentials: true, maxRedirects:0})
                .then((Response=>{
                    if(Response.status === 200) setExerciseDetails(Response.data.details);
                    if(Response.status === 404) navigate('/login');
                }))
                .catch(Error=>{
    
                })
        }

        getData();
    }, [id, navigate, props.id]);

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
                <NavBar realPage={realPage} currentPage={(!scrollInAboutUs)?'workout':'about_us'} handleLoading={handleLoading} scrollLocation={scrollRef} handleScrollAboutUs={handleScrollAboutUs} handleScrollUp={handleScrollUp}/>
                <Display footerOn={false} handleLoading={handleLoading}>
                    {(exerciseDetails!==null)?<ViewExercise data={exerciseDetails}/>:null}
                </Display>
                <AboutUs getLocation={getLocation}/>
            </div>
            <Loading right={'50%'} left={'50%'} top={'50%'} bottom={'50%'} loading={loading}/>
        </div>
    );
}

export default ExercisePage;