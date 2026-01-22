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

const signInUser = async(email, password) => {
    try {
        const {data, error} = await supabase.auth.signInWithPassword({
            email: email.toLowerCase(),
            password: password
        })
        if(error){
            console.log(error.message)
            return {success: false,  error: error.message}
        }
        console.log('Sign in success', data)
        return {success:true,  data}
    } catch (error) {
        console.error('Unexpected error during sign-in:', error.message);
      return { success: false, error: 'An unexpected error occurred. Please try again.' };
    }
}

const signOut = async () => {
    try {
        const { error } = await supabase.auth.signOut()
        if(error) {
            console.log(error.message)
            return {success: false, error: error.message}
        }
        console.log('Sign out success')
        return {success: true}
    } catch (error) {
        console.error('Unexpected error during sign out:', error.message);
        return { success: false, error: 'An unexpected error occurred. Please try again.' };
    }
}

    return (
        <AuthContext.Provider value={{session, signInUser, signOut}}>
        {children}
        </AuthContext.Provider>
    )

}

export const useAuth = () => {
    return useContext(AuthContext)
}
