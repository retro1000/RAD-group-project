import React, {useState} from "react";
import Login from "../components/login";
import BackgroundImage from "../images/wall.webp";
import Loading from "../components/loading";

function LoginPage(){

    const [loading, setLoading] = useState(false);

    const handleLoading = () => {
        setLoading(!loading);
    }

    return(
        <div>
            <div id="login_page_frame" style={{pointerEvents:(loading)?'none':null, filter:(loading)?'blur(1px)':null, display:'flex', justifyContent:'center', alignItems:'center', height:'100vh', width:'100vw',  backgroundImage:`url(${BackgroundImage})`, backgroundRepeat:'no-repeat', backgroundSize:'cover', margin:'0', padding:'0'}}>
                <Login handleLoading={handleLoading}/>
            </div>
            <Loading right={'50%'} left={'50%'} top={'50%'} bottom={'50%'} loading={loading}/>
        </div>
    );
}

export default LoginPage;