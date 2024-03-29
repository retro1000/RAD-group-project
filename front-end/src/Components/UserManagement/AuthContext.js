import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

// eslint-disable-next-line import/no-anonymous-default-export
export default({children})=>{
    const [userDetails, setUserDetails] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userName, setUserName] = useState("");
    // useEffect(()=>{
        
    //     setUserDetails("user");
    //     setIsAuthenticated("hi");
        
    // },[]);
    
    return(
        <div>
            <AuthContext.Provider value={{userDetails, setUserDetails, isAuthenticated, setIsAuthenticated, userName, setUserName }}>
                {children}
            </AuthContext.Provider>
        </div>
    )
}