
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import { useReducer, useEffect, useState } from "react";
import { projectFirestore, timestamp } from '../firebase/config'

let initialState = {
    document: null,
    isPending: false,
    error: null,
    success: false
}

const firesotreReducer = (state, action) => {
    switch (action.type) {
        case "IS_PENDING":
            return { success: false, isPending: true, error: null, document: null }
        case "ERROR":
            return { success: false, isPending: false, error: action.payload, document: null }
        case "ADDED_DOCUMENT":
            return { success: true, isPending: false, error: null, document: action.payload }
        case "DELETED_DOCUMENT":
            return { success: true, isPending: false, error: null, document: null }
        default:
            return state
    }
}

export const useFirestore = (project_collection) => {
    const [response, dispatch] = useReducer(firesotreReducer, initialState)
    const [isCancelled, setIsCancelled] = useState(false)
    //collection ref
    const ref = collection(projectFirestore, project_collection)

    //only dispatch is not cancelled
    const dispatchIfNotCancelled = (action) => {
        if(isCancelled){
            dispatch(action)
        }
    }

    const addDocument = async (doc) => {
        dispatch({ type: "IS_PENDING" })

        try {
           const createAt = timestamp 
           const addedDocument = await addDoc(ref, { ...doc, createAt })

           dispatchIfNotCancelled({ type: "ADDED_DOCUMENT", payload: addedDocument })

        }catch(err){
            dispatchIfNotCancelled({ type: "ERROR", payload: err.message })
        }
    }

    //delete a document
    const deleteDocument = async (id) => {
        dispatch({ type: "IS_PENDING" })

        try{
            const docRef = doc(projectFirestore, project_collection, id)
            const deleteDocument = await deleteDoc(docRef)

            dispatchIfNotCancelled({ type: 'DELETED_DOCUMENT' })

        }catch(err){
            dispatchIfNotCancelled({ type: "ERROR", payload: "could not delete"})
        }

    }

    useEffect(() => {
        return () => setIsCancelled(true)
    },[])

    return { addDocument, deleteDocument, response }
}