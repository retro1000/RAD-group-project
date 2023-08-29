import React, { useEffect, useRef, useState } from "react";
import NavBar from "../components/navbar";
import Display from "../components/display";
import AboutUs from "../components/aboutUs";
import Loading from "../components/loading";

function DashboardPage(){

    const [loading, setLoading] = useState(false);
    const [scrollRef, setScrollRef] = useState(null);
    const [scrollUp, setScrollUp] = useState(false);
    const [scrollInAboutUs, setScrollInAboutUs] = useState(false);
    const realPage = useRef('dashboard');

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
            <div style={{pointerEvents:(loading)?'none':null, filter:(loading)?'blur(1px)':null}}>
                <NavBar realPage={realPage} currentPage={(!scrollInAboutUs)?'dashboard':'about_us'} handleLoading={handleLoading} scrollLocation={scrollRef} handleScrollAboutUs={handleScrollAboutUs} handleScrollUp={handleScrollUp}/>
                <Display footerOn={true} handleLoading={handleLoading}>
                    
                </Display>
                <AboutUs getLocation={getLocation}/>
            </div>
            <Loading right={'50%'} left={'50%'} top={'50%'} bottom={'50%'} loading={loading}/>
        </div>
    );
}

export default DashboardPage;