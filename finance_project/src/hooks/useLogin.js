import { signInWithEmailAndPassword } from "firebase/auth";
import { useState, useEffect } from "react";
import { projectAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
    const [isCancelled, setIsCanselled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const {dispatch} = useAuthContext()
    
    const login = async (email, password) => {
        setError(null)
        setIsPending(true)
        //sign the user out
        try {
            const res = await signInWithEmailAndPassword(projectAuth, email, password)
            
            //dispatch logout action
            dispatch({ type: 'LOGIN', payload: res.user })

            //update state
            if(!isCancelled){
                setIsPending(false)
                setError(null)
            }

        }catch(err){
            if(!isCancelled){
                console.log(err.message)
                setError(err.message)
                setIsPending(false)
            }
        }
    }
    useEffect(() => {
        return () => setIsCanselled(true);
    }, []);
    return { login, error, isPending }
}