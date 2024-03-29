
import { addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
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
        case "UPDATED_DOCUMENT":
            return { isPending: false, document: action.payload, success: true, error: null }
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
           const createAt = timestamp.fromDate(new Date()) 
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

    //update documents
    const updateDocument = async (id, updates) => {
        dispatch({ type: 'IS_PENDING' })

        try{
            const docRef = doc(projectFirestore, project_collection, id)
            const updatedDocument = await updateDoc(docRef, updates)
            dispatchIfNotCancelled({ type: 'UPDATED_DOCUMENT', payload: updatedDocument })
            return updatedDocument

        }catch (err) {
            dispatchIfNotCancelled({ type: 'ERROR', payload: err.message })
            return null

        }

    }

    useEffect(() => {
        return () => setIsCancelled(true)
    },[])

    return { addDocument, deleteDocument, updateDocument, response }
}