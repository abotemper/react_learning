import './Recipe.css'
import  { useParams } from 'react-router-dom'
// import { useFetch } from '../../hooks/useFetch'
import { useTheme }from '../../hooks/useTheme'
import { useState, useEffect } from 'react'
import { projectFirestore } from '../../firebase/config'
import { collection, doc, getDoc, updateDoc, onSnapshot } from 'firebase/firestore';

import React from 'react'

export default function Recipe() {
  const [recipe, setRecipe] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false)


  const { id } =  useParams()
  // const url = 'http://localhost:3000/recipes/' + id
  // const { error, isPending, data: recipe } = useFetch(url)
  const {mode} = useTheme()

  useEffect(() => {

    setIsPending(true)
    const docRef = doc(projectFirestore,'recipes', id )
    const updateSnap = onSnapshot(docRef, snapshot => {
      if(snapshot.exists){
        setIsPending(false)
        setRecipe(snapshot.data())
      }else{
        setIsPending(false)
        setError('could not find that recipe')
      }
      return () => updateSnap()

    })
    // getDoc(docRef)
    //    .then((doc) => {
    //     if(doc.exists){
    //       setIsPending(false)
    //       setRecipe(doc.data())
    //     }else{
    //       setIsPending(false)
    //       setError('could not find that recipe')
    //     }

    //    })
  }, [id]);
  const handleClick = () => {
    const updateRef = doc(projectFirestore, 'recipes', id)
    updateDoc(updateRef, {
      title: 'somthing different'
    })

  }
  
  return (
    <div className={`recipe ${mode}`}>
      {error && <p className='error'>{error}</p>}
      {isPending && <p className='loading'>Loading</p>}
      {recipe && (
        <>
        <h2 className='page-title'>{recipe.title}</h2>
        <p>Takes {recipe.cookingTime} to cook.</p>
        <ul>
          {recipe.ingredients.map(ing => <li key={ing}>{ing}</li>)}
        </ul>
        <p className='method'>{recipe.method}</p>
        <button onClick={handleClick}>update me</button>
        </>
      )}

    </div>
  )
}
