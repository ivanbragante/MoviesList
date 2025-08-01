import "../css/MovieCard.css"
import { useMovieContext } from "../context/MovieContext"

function MovieCard({movie}) {
    const {isFavorite, addToFavorites, removeFromFavorites} = useMovieContext()
    const favorite = isFavorite(movie.id)

    // Função para lidar com o clique no botão de favorito
    function onFavoriteClick(e){
        e.preventDefault()
        if (favorite) removeFromFavorites(movie.id)
        else addToFavorites(movie)
    }
    // e.preventDefault() previne o comportamento padrão do botão
    // if (favorite) removeFromFavorites(movie.id) se já for favorito, remove do favoritos
    // else addToFavorites(movie) se não for favorito, adiciona aos favoritos

    return(
        // Renderiza o card do filme
        <div className="movie-card">
            <div className="movie-poster">
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                <div className="movie-overlay">
                    <button className={`favorite-btn ${favorite ? "active" : ""}`} onClick={onFavoriteClick}>
                        ♥
                    </button>
                </div>
            </div>
            <div className="movie-info">
                <h3>{movie.title}</h3>
                <p>
                    {new Date(movie.release_date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short'
                    })}
                </p>
            </div>
        </div>
    )
}

export default MovieCard