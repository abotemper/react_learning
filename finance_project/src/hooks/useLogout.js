import { async } from "@firebase/util";
import { signOut } from "firebase/auth";
import { useState, useEffect } from "react";
import { projectAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
    const [isCancelled, setIsCanselled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const {dispatch} = useAuthContext()
    
    const logout = async () => {
        setError(null)
        setIsPending(true)

        //sign the user out
        try {
            await signOut(projectAuth)
            //dispatch logout action
            dispatch({ type: 'LOGOUT' })

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
        return () => {
            setIsCanselled(true)
        };
    }, []);
    return { logout, error, isPending }
}