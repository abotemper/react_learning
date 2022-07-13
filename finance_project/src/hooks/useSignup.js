import { useState, useEffect } from "react"
import { projectAuth } from '../firebase/config'
import {
    createUserWithEmailAndPassword,
    signOut, signInWithEmailAndPassword,
    OnAuthStateChanged,
    updateProfile
} from 'firebase/auth'
import { useAuthContext } from "./useAuthContext"



export const useSignup = () => {
    const [isCancelled, setIsCanselled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext()

    const signup = async (email, password, displayName) => {
        setError(null)
        setIsPending(true)

        try{
            // sign up user
            const response = await createUserWithEmailAndPassword(projectAuth, email, password)
            // console.log(response.user)
            if(!response){
                throw new Error('could not complete signup')
            }
            // add display name to user
            await updateProfile(response.user, { displayName })

            //dispatch login action
            dispatch({ type: 'LOGIN', payload: response.user })


            //update state
            if(!isCancelled){
                setIsPending(false)
                setError(null)
            }
        }catch(err){
            //update state
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

    return { error, isPending, signup}
}