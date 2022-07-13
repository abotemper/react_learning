import styles from './Navbar.module.css'
import {Link} from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

export default function Navbar() {
  const { logout } = useLogout()
  const { user } = useAuthContext()
  return (
    <nav className={styles.navbar}>
        <ul>
            <li className={styles.title}>myMoney</li>
            {!user && (
              <>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/signup">Signup</Link></li>
              </>
            )}
            {/* 一个括号里只能有一个<></>, 因为下面有两个li，所以要把他们放在一个<></>中 */}
            {user && (
              <>
              <li>hello, {user.displayName}</li>
              <li>
                <button className='btn' onClick={logout}>Logout</button>
              </li>
              </>
            )}
        </ul>
    </nav>
  )
}
