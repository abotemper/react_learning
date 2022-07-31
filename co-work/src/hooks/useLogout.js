import { signOut } from "firebase/auth";
import { doc, updateDoc } from 'firebase/firestore'
import { useState, useEffect } from "react";
import { projectAuth, projectFirestore } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
    const [isCancelled, setIsCanselled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const {dispatch, user} = useAuthContext()
    
    const logout = async () => {
        setError(null)
        setIsPending(true)

        //sign the user out
        try {
            //update online status
            const { uid } = user
            await updateDoc(doc(projectFirestore, 'users', uid),{
                online: false
            })

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
            setIsCanselled(false)
        return () => {
            setIsCanselled(true)
        };
    }, []);
    return { logout, error, isPending }
}