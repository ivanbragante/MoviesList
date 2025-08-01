import { createContext, useState, useContext, useEffect } from "react"

// Cria um contexto chamado MovieContext para compartilhar dados entre componentes.
const MovieContext = createContext()

//Cria um hook para acessar facilmente o contexto em qualquer componente.
export const useMovieContext = () => useContext(MovieContext)

//Componente que envolve a aplicação e fornece o contexto para os filhos.
export const MovieProvider = ({children}) => {

    // Estado para armazenar os filmes favoritos.
    // Inicializa com os favoritos armazenados no localStorage, se existirem.
    // Cria o estado favorites (array de filmes favoritos) e a função para atualizá-lo.
    const [favorites, setFavorites] = useState([])

    // Efeito colateral para carregar os favoritos do localStorage quando o componente é montado.
    // Se houver favoritos armazenados, eles são convertidos de string para objeto e definidos no estado.
    useEffect(() => {
        const storedFavs = localStorage.getItem("favorites")
        if (storedFavs) setFavorites(JSON.parse(storedFavs))
    }, [])

    // Efeito colateral para atualizar o localStorage sempre que a lista de favoritos mudar.
    // Converte o array de favoritos em string e o armazena no localStorage.
    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites))
    }, [favorites])

    // Função para adicionar um filme aos favoritos.
    // Recebe um objeto movie e adiciona ao estado favorites.
    // Utiliza a função setFavorites para atualizar o estado, mantendo os filmes já existentes.
    const addToFavorites = (movie) => {
        setFavorites(prev => [...prev, movie])
    }

    // Função para remover um filme dos favoritos.
    // Recebe o ID do filme e filtra o estado favorites para remover o filme correspondente.
    // Utiliza a função setFavorites para atualizar o estado.
    const removeFromFavorites = (movieId) => {
        setFavorites(prev => prev.filter(movie => movie.id !== movieId))
    }

    // Função para verificar se um filme é favorito.
    // Recebe o ID do filme e verifica se ele está presente no estado favorites.
    // Retorna true se o filme for favorito, caso contrário, retorna false.
    const isFavorite = (movieId) => {
        return favorites.some(movie => movie.id === movieId)
    }


    // Cria um objeto value que contém os dados e funções que serão compartilhados pelo contexto.
    // Este objeto será acessível a todos os componentes que utilizarem o MovieContext.
    const value = {
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite
    }

    // Retorna o provedor do contexto, que envolve os filhos e fornece o objeto value.
    // Isso permite que qualquer componente filho acesse os dados e funções do contexto.    
    return <MovieContext.Provider value={value}>
        {children}
    </MovieContext.Provider>
}