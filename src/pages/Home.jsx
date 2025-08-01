import MovieCard from "../components/MovieCard"
import { useState, useEffect } from "react"
import { searchMovies, getPopularMovies } from "../services/api"
import "../css/Home.css"

function Home() {
    // Criando estados para armazenar a consulta de pesquisa, os filmes, erros e o estado de carregamento.
    // searchQuery armazena o texto digitado pelo usuário na barra de pesquisa.
    // movies armazena a lista de filmes retornados pela API.
    // error armazena mensagens de erro, caso ocorram durante a busca.
    // loading indica se os dados estão sendo carregados ou não.    
    const  [searchQuery, setSearchQuery] = useState ("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true)

    // Efeito colateral que é executado quando o componente é montado.
    // Ele chama a função getPopularMovies para buscar os filmes populares da API.
    // Se a busca for bem-sucedida, os filmes são armazenados no estado movies.
    // Se ocorrer um erro, uma mensagem de erro é armazenada no estado error.
    // O estado loading é atualizado para false quando a busca é concluída, seja com sucesso ou erro.
    useEffect(() => {
        const loadPopularMovies = async () => {
            try {
                const popularMovies = await getPopularMovies()
                setMovies(popularMovies)
            } catch (err) {
                console.log(err)
                setError("Failed to load movies...")
            }
            finally {
                setLoading(false)
            }
        }

        loadPopularMovies()
    }, [])

    // Função para lidar com a pesquisa de filmes.
    // Ela é chamada quando o usuário envia o formulário de pesquisa.
    // A função previne o comportamento padrão do formulário, verifica se a consulta de pesquisa não está vazia e se não está carregando.
    const handleSearch = async (e) => {
        e.preventDefault()
        if(!~searchQuery.trim()) return
        if(loading) return
        // Se a consulta de pesquisa for válida, chama a função searchMovies com a consulta.
        // Atualiza o estado de carregamento para true antes de iniciar a busca.
        // Isso é útil para mostrar um indicador de carregamento enquanto os dados estão sendo buscados.
        setLoading(true)
        try {
            const searchResults = await searchMovies(searchQuery)
            setMovies(searchResults)
            setError(null)
        } catch (err) {
            console.log(err)
            setError("Failed to search movies...")
        } finally {
            setLoading(false)
        }

    }

    return (
        // Renderiza a página inicial com um formulário de pesquisa e uma grade de filmes.
        // O formulário contém um campo de entrada para a consulta de pesquisa e um botão de envio.
        // Se houver um erro, uma mensagem de erro é exibida.
        // Se os dados estiverem sendo carregados, uma mensagem de carregamento é exibida.
        // Caso contrário, os filmes são mapeados e renderizados como MovieCard componentes.
        <div className="home">
            {/* Renderiza o formulário de pesquisa */}
            <form onSubmit={handleSearch} className="search-form">
                <input 
                type="text" 
                placeholder="Search for movies..." 
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}/>
                <button type="submit" className="search-button">Search</button>
            </form>

            {/* Exibe mensagens de erro, se houver */}
            {error && <div className="error-message">{error}</div>}

            {/* Exibe uma mensagem de carregamento enquanto os dados estão sendo buscados se loading for true */}
            {loading ? (
            <div className="loading">Loading...</div> 
            // Se não estiver carregando, renderiza a grade de filmes
            ) : ( 
              <div className="movies-grid">
                {movies.map((movie) => (
                    <MovieCard movie={movie} key={movie.id}/>
                ))}
              </div>
            )}
        </div>
    )
}

export default Home