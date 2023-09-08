import React, {useState, useEffect, useRef} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../components/loading";
import NavBar from "../components/navbar";
import Display from "../components/display";
import AboutUs from "../components/aboutUs";
import ViewDataList from "../components/viewDataList";
import axios from "axios";

function ViewPage(props){

    const location = useLocation();
    const navigate = useNavigate();
    const [details, setDetails] = useState([]);
    const [loading, setLoading] = useState(false);
    const [scrollRef, setScrollRef] = useState(null);
    const [scrollInAboutUs, setScrollInAboutUs] = useState(false);
    const [scrollUp, setScrollUp] = useState(false);
    const [dataList, setDataList] = useState([]);
    const [sortList, setSortList] = useState([]);
    const [sort, setSort] = useState([]);
    const realPage = useRef('workout');


    useEffect(() => {
        if(location.state !== null && location.state !== undefined) setDetails([parseInt(location.state.bodyPart, 10), location.state.type]);
        else navigate('/workouts');
    }, [location.state, navigate]);

    useEffect(() => {
        async function getSortList(){
            setLoading(true);
            await axios.post(`http://localhost:6600/${details[1]}/sort_key`, {bodyPartId:details[0]}, {maxRedirects:0, withCredentials: true})
                .then(Response=>{
                    if(Response.status === 200){
                        const newList = Response.data.sortList.map(lc=>({name:lc.name, data:lc.data.map(ct=>({val:ct, sts:false}))}));
                        setSortList(newList);
                        const newSort = newList.map(itm=>({name:itm.name, val:[]}));
                        setSort(newSort);
                    }
                    if(Response.status === 403) navigate('/login');
                    if(Response.status === 500) throw Error;
                })
                .catch(Error=>{
                    // navigate('/workouts');
                })
                .finally(
                    setLoading(false)
                )
        }
        if(details[0] !== null && details[0] !== undefined) getSortList();

    }, [details, navigate, props]);

    useEffect(() => {
        // eslint-disable-next-line no-unused-expressions
        async function getDataList(){
            setLoading(true);
            const data = {
                sortOptions:sort,
                bodyPartId:details[0]
            };

            await axios.post(`http://localhost:6600/${details[1]}`, data, {maxRedirects:0, withCredentials: true})
                .then(Response=>{
                    if(Response.status === 200) setDataList(Response.data.dataList);
                    if(Response.status === 403) navigate('/login');
                    if(Response.status === 500) throw Error;
                })
                .catch(Error=>{
                    // navigate('/workouts');
                })
                .finally(
                    setLoading(false)
                );
        }
        if(details[0] !== null && details[0] !== undefined && sort !== undefined && sort !== null && sort.length !== 0) getDataList();

    }, [details, navigate, props, sort]);

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

    const handleSortList = (list) => {
        setSortList(list);
    }

    const handleSort = (list) => {
        setSort([...list]);
    }

    return(
        <div>
            <div style={{display:'flex', flexDirection:'column', pointerEvents:(loading)?'none':null, filter:(loading)?'blur(1px)':null}}>
                <NavBar realPage={realPage} currentPage={(!scrollInAboutUs)?'workout':'about_us'} handleLoading={handleLoading} scrollLocation={scrollRef} handleScrollAboutUs={handleScrollAboutUs} handleScrollUp={handleScrollUp}/>
                <Display footerOn={false} handleLoading={handleLoading}>
                    <ViewDataList type={(details[1]==='exercises')?'exercises':'workouts'}handleLoading={handleLoading} dataList={dataList} sort={sort} sortList={sortList} handleSortList={handleSortList} handleSort={handleSort}/>
                </Display>
                <AboutUs getLocation={getLocation}/>
            </div>
            <Loading right={'50%'} left={'50%'} top={'50%'} bottom={'50%'} loading={loading}/>
        </div>
    );
}

export default ViewPage;