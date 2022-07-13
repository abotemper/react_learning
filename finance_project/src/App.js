import { BrowserRouter, Route, Routes, Outlet, Link, NavLink, Navigate, Redirect} from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext';

import Signup from './pages/signup/Signup';
import Home from './pages/home/Home';
import Login from './pages/login/Login'
import Navbar from './components/Navbar';

function App() {
  const { authIsReady, user } = useAuthContext()
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>

        <Routes>
          {/* 如果已经login了，有user了，那就在home，如果没有login，没有user，上来直接进入的是login界面 */}
            <Route exact path="/" element={user ? (
                <Home/>
              ) : (
                <Login/>
              )} 
            />

            <Route path="login" element={user ? (
                <Home/>
              ) : (
                <Login/>
              )
            } />

            <Route path="signup" element={user ? (
                <Home/>
              ) : (
                <Signup/>
              )
            } />
            
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
