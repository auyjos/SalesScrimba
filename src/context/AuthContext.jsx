import { createContext, useContext, useState, useEffect } from "react";
import supabase from "../supabase-client";
const AuthContext = createContext()

export const AuthContextProvider =({children})=> {
const [session,  setSession] = useState(undefined)

useEffect(()=>{
    //check on 1st render for a session (get session)
    // not logged in and logout,. Listen for changes in auth state
    async function getInitialSession(){
        const {data, error} = await supabase.auth.getSession()
        try {
            if(error) throw error
            setSession(data.session)
        } catch (error) {
            console.error('Error fetching session:', error);
            
        }
    }
    getInitialSession()
    supabase.auth.onAuthStateChange((_event,session) => {
        setSession(session)
        console.log('Session changed ',session)
    }) 
},[])
    return (
        <AuthContext.Provider value={{session}}>
        {children}
        </AuthContext.Provider>
    )

}

export const useAuth = () => {
    return useContext(AuthContext)
}