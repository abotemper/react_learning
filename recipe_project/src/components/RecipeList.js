import './RecipeList.css'
import { Link } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'
import Trashcan from '../assets/trashcan.svg'
import { projectFirestore } from '../firebase/config'
import { collection, deleteDoc, doc } from 'firebase/firestore'

export default function RecipeList({ recipes }) {
  const {mode} = useTheme()
  if(recipes.length === 0){
    return <div className='error'>No recipe to load</div>
  }
  const handleClick = (id) => {
    const deleteRef = doc(projectFirestore, 'recipes', id)
    deleteDoc(deleteRef)

  }
  return (
    <div className='recipe-list'>
        {recipes && recipes.map(recipe => (
            <div key={recipe.id} className={`card ${mode}`}>
                <h3>{recipe.title}</h3>
                <p>{recipe.cookingTime} to make .</p>
                <div>{recipe.method.substring(0, 100)}...</div>
                <Link to={`/recipes/${recipe.id}`}>cook this</Link>
                <img
                  className='delete'
                  src={Trashcan}
                  onClick={() => handleClick(recipe.id)}
                />
            </div>
           
        ))}
    </div>
  )
}
