import './App.css'
import { BrowserRouter, Route, Routes, Outlet, Link, NavLink, Navigate} from 'react-router-dom'

//pageconponents
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Article from './pages/Article'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <nav>
        <h1>望庐山瀑布</h1>
        <NavLink  to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </nav>
      <Outlet/>

      <Routes>
        <Route exact path="/" element={<Home/>} />
          <Route path="about" element={<About/>} />
          <Route path="contact" element={<Contact/>} />
          <Route path="/articles/:id" element={<Article />}/>
          <Route path='*' element={<Navigate to="/" replace />}/>
       
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
