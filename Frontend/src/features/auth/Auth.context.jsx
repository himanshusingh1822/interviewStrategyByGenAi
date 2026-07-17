import { useState } from "react";
import { createContext } from "react";
import { useSearchParams } from "react-router";
import { get_Me } from "./services/auth.api";
import { useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children})=>{
    const[user , setUser] = useState(null);
    const[loading, setLoading] = useState(true);
    const[authError , setAuthError] = useState(null)

    useEffect(()=>{

        const getAndSetUser = async()=>{
            const data = await get_Me();
            setUser(data.user);
            setLoading(false);

            
        }
        getAndSetUser();

    },[])

    return(
        <AuthContext.Provider value={{user,setUser,loading,setLoading,authError,setAuthError}}>
            {children}
        </AuthContext.Provider>
    )
}