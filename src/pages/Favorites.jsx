import "../css/Favorites.css"
import { useMovieContext } from "../context/MovieContext"
import MovieCard from "../components/MovieCard"

// Componente que renderiza a lista de filmes favoritos
function Favorites() {
    
    // Utiliza o hook useMovieContext para acessar o contexto de filmes
    // Desestrutura o estado favorites do contexto
    const { favorites } = useMovieContext()
    if (favorites) {
        return (
            <div className="favorites">
                <h2>Your favorites</h2>
                <div className="movies-grid">
                    {/* Mapeia os filmes favoritos e renderiza um MovieCard para cada um
                    A chave é o ID do filme para garantir que cada card seja único */}
                    {favorites.map((movie) => (
                        <MovieCard movie={movie} key={movie.id} />
                    ))}
                </div>
            </div>
        );
    }
    return (
        <div className="favorites-empty">
            <h2>No favorites movies yet</h2>
            <p>Start adding movies to your favorites and they will appear here!</p>
        </div>
    )
}

export default Favorites