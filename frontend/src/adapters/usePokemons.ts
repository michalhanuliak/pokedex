import { Category, Filters } from '@/domain'
import {
  GET_POKEMONS,
  useFavoritePokemonMutation,
  useGetPokemonQuery,
  useGetPokemonsQuery,
  useUnFavoritePokemonMutation,
} from '@/infrastructure/queries/usePokemonQuery'
import { useApolloClient } from '@apollo/client'
import { useEffect, useMemo, useState } from 'react'

const DEFAULT_PAGE_SIZE = 20

export function useGetAllPokemons(category: Category, filters: Filters) {
  const client = useApolloClient()

  const [currentPage, setCurrentPage] = useState(1)
  const { data, loading: isLoading } = useGetPokemonsQuery({
    variables: {
      query: {
        filter: {
          isFavorite: category === Category.FAVORITE ? true : undefined,
          type: filters?.type,
        },
        search: filters.query,
        limit: currentPage * DEFAULT_PAGE_SIZE,
        offset: (currentPage - 1) * DEFAULT_PAGE_SIZE,
      },
    },
    onCompleted: (data) => {
      client.cache.updateQuery({ query: GET_POKEMONS }, (prev) => {
        return {
          ...prev,
          ...data,
        }
      })
    },
    onError: (error) => {
      console.error(error)
    },
  })

  const loadNextPage = () => {
    setCurrentPage((prev) => prev + 1)
  }

  const pokemons = useMemo(() => {
    if (!data) return []
    return data.pokemons.edges
  }, [data, category, currentPage, filters])

  useEffect(() => {
    setCurrentPage(1)
  }, [category, filters])

  return { pokemons, isLoading, currentPage, loadNextPage }
}

export function useFavoritePokemon() {
  const apolloClient = useApolloClient()
  const [favoritePokemon, { loading: isLoading }] = useFavoritePokemonMutation({
    onError: (error) => {
      console.error(error)
    },
  })

  const handleFavoritePokemon = (id?: string) => {
    if (!id) return

    favoritePokemon({
      variables: { id },
    })
    apolloClient.refetchQueries({
      include: [GET_POKEMONS],
    })
  }

  return {
    isLoading,
    onPokemonFavorite: handleFavoritePokemon,
  }
}

export function useUnFavoritePokemon() {
  const apolloClient = useApolloClient()

  const [unFavoritePokemon, { loading: isLoading }] =
    useUnFavoritePokemonMutation({
      onError: (error) => {
        console.error(error)
      },
    })

  const handleUnFavoritePokemon = (id?: string) => {
    if (!id) return

    unFavoritePokemon({ variables: { id } })
    apolloClient.refetchQueries({
      include: [GET_POKEMONS],
    })
  }

  return {
    isLoading,
    onPokemonUnFavorite: handleUnFavoritePokemon,
  }
}

export function useGetPokemonByName(name: string) {
  const { data, loading: isLoading } = useGetPokemonQuery({
    variables: {
      name,
    },
    onError: (error) => {
      console.error(error)
    },
  })

  const pokemon = data?.pokemonByName

  return { pokemon, isLoading }
}
