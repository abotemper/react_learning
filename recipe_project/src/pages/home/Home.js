import './Home.css'
import { projectFirestore } from '../../firebase/config'
import RecipeList from '../../components/RecipeList'
import { useEffect, useState } from 'react';
import { collection, getDocs, orderBy, query, onSnapshot } from 'firebase/firestore';

export default function Home() {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false)

  useEffect(() => {
    setIsPending(true)
    const colRef = collection(projectFirestore, 'recipes')
    const unsub = onSnapshot(colRef, (snapshot) => {
      if(snapshot.empty){
        setError('no recipes here')
        setIsPending(false)
      }else{
        let results = []
        snapshot.docs.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id})
        })
        setData(results)
        setIsPending(false)
      }
    }, (err) => {
      setError(err.message)
      setIsPending(false)
    })
    return () => unsub()
  }, []);

    // getDocs(colRef)
    //    .then((snapshot) => {
    //     if(snapshot.empty){
    //       setError('no recipes here')
    //       setIsPending(false)
    //     }else{
    //       let results = []
    //       snapshot.docs.forEach((doc) => {
    //         results.push({ id: doc.id, ...doc.data() })
    //       })
    //       setData(results)
    //       setIsPending(false)
    //     }
    //    })

  

  return (
    <div className='home'>
      <h1>hahahah</h1>
      {error && <p className='error'>{error}</p>}
      {isPending && <p className='loading'>Loading...</p>}
      {data && <RecipeList recipes={data}/>}
    </div>
  )
}
