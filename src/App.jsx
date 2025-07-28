import MovieCard from './components/MovieCard'
import Home from './pages/Home';
import NavBar from './components/NavBar';
import { Routes, Route } from 'react-router-dom'
import './css/App.css'
import Favorites from './pages/Favorites';

function App() {

  return (
    <div>
      <NavBar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/Favorites" element={<Favorites />}/>
        </Routes>
      </main>
    </div>
    
  )
}

export default App
