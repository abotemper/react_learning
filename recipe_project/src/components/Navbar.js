import './Navbar.css'
import { Link } from 'react-router-dom'
import SearchBar from './SearchBar'

export default function Navbar() {
  return (
    <div className='navbar'>
        <nav>
            <Link to='/' className='brand'>
              <h1>Cooking Ninja</h1>
            </Link>
            <SearchBar/>
            <Link to='/create' >
              <h1>Creating Recipe</h1>
            </Link>

           

        </nav>

    </div>
  )
}
