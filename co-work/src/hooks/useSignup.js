import { useState, useEffect } from "react"
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import {
    createUserWithEmailAndPassword,
    updateProfile
} from 'firebase/auth'
import { doc, setDoc } from "firebase/firestore"

import { projectAuth, projectStorage, projectFirestore } from '../firebase/config'

import { useAuthContext } from "./useAuthContext"




export const useSignup = () => {
    const [isCancelled, setIsCanselled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext()

    const signup = async (email, password, displayName, thumbnail) => {
        setError(null)
        setIsPending(true)

        try{
            // sign up user
            const response = await createUserWithEmailAndPassword(projectAuth, email, password)
            // console.log(response.user)
            if(!response){
                throw new Error('could not complete signup')
            }

            //upload user thumbnail
            const uploadPath = `thumbnails/${response.user.uid}/${thumbnail.name}`
            const imgRef = ref(projectStorage, uploadPath)
            const uploadTask = await uploadBytesResumable(imgRef, thumbnail)
            console.log(uploadTask)
            const imgURL = await getDownloadURL(uploadTask.ref)

            // add display name to user
            await updateProfile(response.user, { displayName, photoURL: imgURL })

            //create a user document
            await setDoc(doc(projectFirestore, 'users', response.user.uid), {
                online: true,
                displayName,
                photoURL: imgURL
            })



            //dispatch login action
            dispatch({ type: 'LOGIN', payload: response.user })

            //update state
            //原先iscancelled 是false， 所以到这里应该运行这个if语句
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
        setIsCanselled(false)
        return () => {
            setIsCanselled(true)
        };
    }, []);

    return { error, isPending, signup }
}