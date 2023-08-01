import React, {useState} from "react";
import SignUp from "../components/signup";
import Loading from "../components/loading";
import BackgroundImage from "../images/wall.webp";

function SignUpPage(){

    const [loading, setLoading] = useState(false);

    const handleLoading = () => {
        setLoading(!loading);
    }

    return(
        <div>
            <div style={{pointerEvents:(loading)?'none':null, filter:(loading)?'blur(1px)':null, display:'flex', justifyContent:'center', alignItems:'center', height:'100vh', width:'100vw',backgroundImage:`url(${BackgroundImage})`, backgroundRepeat:'no-repeat', backgroundSize:'cover', margin:'0', padding:'0'}}>
                <SignUp handleLoading={handleLoading} />
            </div>
            <Loading right={'50%'} left={'50%'} top={'50%'} bottom={'50%'} handleLoading={handleLoading} />
        </div>
    );
}

export default SignUpPage;