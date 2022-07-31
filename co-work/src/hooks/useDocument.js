import { useState, useEffect } from 'react'
import {  projectFirestore } from '../firebase/config'

import { doc, onSnapshot } from 'firebase/firestore'

export const useDocument = (project_collection, id) => {
    const [document, setDocument] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        const ref = doc(projectFirestore, project_collection, id)

        const unsubscribe = onSnapshot(ref, (snapshot) => {
            if(snapshot.data()){
                setDocument({ ...snapshot.data(), id: snapshot.id })
                setError(null)
            }else{
                setError('no such document exists')
            }
           
        }, (err) => {
            console.log(err.message)
            setError('failed to get document')
        })

        return () => unsubscribe()
    },[project_collection, id])
    
    return { document, error }
}