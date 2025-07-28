import MovieCard from './components/MovieCard'
import './App.css'

function App() {
  return (
    <>
      <MovieCard movie={{title: "Filme", release_date: "2024"}}/>
      <MovieCard movie={{title: "Filme2", release_date: "2020"}}/>
    </>
  )
}

export default App
