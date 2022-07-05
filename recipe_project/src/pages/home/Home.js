import './Home.css'
import { useFetch } from '../../hooks/useFetch'
import RecipeList from '../../components/RecipeList'

export default function Home() {
  const { data, isPending, error } = useFetch('http://localhost:3000/recipes')
  console.log(data)

  return (
    <div className='home'>
      <h1>hahahah</h1>
      {error && <p className='error'>{error}</p>}
      {isPending && <p className='loading'>Loading...</p>}
      {data && <RecipeList recipes={data}/>}
    </div>
  )
}
