import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore"
import { useState, useEffect, useRef } from "react"
import { projectFirestore } from "../firebase/config"

export const useCollection = (project_collection, _q, _orderby) => {
    const [documents, setDocuments] = useState(null)
    const [error, setError] = useState(null)

    // if we dont use a ref --> infinite loop in useEffect
    //_q is an array and is "different" on every function call
    const q = useRef(_q).current
    const orderby = useRef(_orderby).current

    useEffect(() => {
        let ref = collection(projectFirestore, project_collection)
        // ref = query(ref, where(...q), orderBy(...orderby))

        if(q){
            ref = query(ref, where(...q))
        }
        if(orderby){
            ref = query(ref, orderBy(...orderby))
        }

        const unsubscribe = onSnapshot(ref, (snapshot) => {
            let results = []
            snapshot.docs.forEach(doc => {
                results.push({ ...doc.data(), id: doc.id })
            })
            console.log(results)

            //update state
            setDocuments(results)
            setError(null)

        }, (error) => {
            console.log(error)
            setError('could not fetch the data')
        })

        //unsubscribe on unmount
        return () => unsubscribe()

    },[project_collection, q, orderby])


    return { documents, error }

}