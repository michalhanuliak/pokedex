import { Category, Filters } from '@/domain'
import { Query } from '@/infrastructure/generated/types'
import {
  GET_POKEMONS,
  useFavoritePokemonMutation,
  useGetPokemonByNameQuery,
  useGetPokemonsQuery,
  useUnFavoritePokemonMutation,
} from '@/infrastructure/queries/usePokemonQuery'
import { createAudioUrl } from '@/utils'
import { useApolloClient } from '@apollo/client'
import { useLayoutEffect, useMemo, useState } from 'react'

const DEFAULT_PAGE_SIZE = 20

function createVariables(category?: Category, filters?: Filters) {
  return {
    query: {
      filter: {
        isFavorite: category === Category.FAVORITE ? true : undefined,
        type: filters?.type,
      },
      search: filters?.query,
      limit: DEFAULT_PAGE_SIZE,
    },
  }
}

export function useGetAllPokemons(category: Category, filters: Filters) {
  const [currentPage, setCurrentPage] = useState(1)

  const variables = createVariables(category, filters)

  const {
    data,
    loading: isLoading,
    fetchMore,
  } = useGetPokemonsQuery({
    variables,
    onError: (error) => {
      console.error(error)
    },
  })

  const hasNextPage = useMemo(
    () => (data?.pokemons.count ?? NaN) > currentPage * DEFAULT_PAGE_SIZE,
    [data],
  )

  const loadMore = async () => {
    if (!hasNextPage) return
    await fetchMore({
      variables: {
        ...variables,
        query: {
          ...variables.query,
          offset: DEFAULT_PAGE_SIZE * currentPage,
        },
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        return {
          ...prev,
          pokemons: {
            ...prev.pokemons,
            edges: [...prev.pokemons.edges, ...fetchMoreResult?.pokemons.edges],
          },
        }
      },
    })
    setCurrentPage((prev) => prev + 1)
  }

  const pokemons = useMemo(() => data?.pokemons.edges ?? [], [data])

  useLayoutEffect(() => {
    setCurrentPage(1)
  }, [category, filters])

  return {
    pokemons,
    isLoading,
    currentPage,
    loadNextPage: loadMore,
    hasNextPage,
  }
}

export function useFavoritePokemon(category?: Category, filters?: Filters) {
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
      optimisticResponse: (variables) => {
        return {
          favoritePokemon: {
            __typename: 'Pokemon',
            id: variables.id,
            isFavorite: true,
          },
        }
      },
      update: (cache, { data }) => {
        const variables = createVariables(Category.FAVORITE, filters)

        cache.updateQuery<Query>(
          { query: GET_POKEMONS, variables },
          (cachedQuery) => {
            const pokemonEdges = cachedQuery?.pokemons.edges ?? []
            const updatedPokemonEdges = [...pokemonEdges, data?.favoritePokemon]

            const updatedQuery = <Query>{
              ...cachedQuery,
              pokemons: {
                ...(cachedQuery?.pokemons ?? {}),
                edges: updatedPokemonEdges,
              },
            }

            return updatedQuery
          },
        )
      },
    })
  }

  return {
    isLoading,
    handleFavoritePokemon,
  }
}

export function useUnFavoritePokemon(category?: Category, filters?: Filters) {
  const [unFavoritePokemon, { loading: isLoading }] =
    useUnFavoritePokemonMutation({
      onError: (error) => {
        console.error(error)
      },
    })

  const handleUnFavoritePokemon = (id?: string) => {
    if (!id) return

    unFavoritePokemon({
      variables: { id },
      update: (cache) => {
        const variables = createVariables(category, filters)

        cache.updateQuery<Query, typeof variables>(
          { query: GET_POKEMONS, variables },
          (cachedQuery) => {
            const pokemonEdges = cachedQuery?.pokemons.edges ?? []
            const updatedPokemonEdges = pokemonEdges.filter((pokemon) => {
              return pokemon.id !== id
            })

            const updatedQuery = <Query>{
              ...cachedQuery,
              pokemons: {
                ...(cachedQuery?.pokemons ?? {}),
                edges: updatedPokemonEdges,
              },
            }

            return updatedQuery
          },
        )
      },
    })
  }

  return {
    isLoading,
    handleUnFavoritePokemon,
  }
}

export function useGetPokemonByName(name: string) {
  const { data, loading: isLoading } = useGetPokemonByNameQuery({
    variables: {
      name,
    },
    onError: (error) => {
      console.error(error)
    },
  })

  const pokemon = data?.pokemonByName

  const getSoundUrl = async () => {
    if (!pokemon) return
    const audio = await fetch(pokemon.sound, {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    })

    return createAudioUrl(await audio.arrayBuffer())
  }

  const handlePlaySound = async () => {
    const url = await getSoundUrl()
    const audio = new Audio(url)
    audio.play()
  }

  return { pokemon, isLoading, handlePlaySound }
}
