import { DEFAULT_PAGE_SIZE } from '@/constants'
import { Category, Filters } from '@/domain'
import { Query } from '@/infrastructure/generated/types'
import {
  GET_POKEMONS,
  useFavoritePokemonMutation,
  useGetPokemonByNameQuery,
  useGetPokemonsQuery,
  useUnFavoritePokemonMutation,
} from '@/infrastructure/queries/usePokemonQuery'
import { createAudioUrl, createVariables } from '@/utils'
import { enqueueSnackbar } from 'notistack'
import { useLayoutEffect, useMemo, useState } from 'react'

export function useGetAllPokemons(category: Category, filters: Filters) {
  const [currentPage, setCurrentPage] = useState(1)

  const variables = createVariables(category, filters)

  const {
    data,
    loading: isLoading,
    fetchMore,
  } = useGetPokemonsQuery({
    variables,
    onError: () => {
      enqueueSnackbar('Failed to fetch pokemons', {
        variant: 'error',
      })
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

  const pokemons = useMemo(() => data?.pokemons.edges, [data])

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

export function useFavoritePokemon(filters?: Filters, category?: Category) {
  const [favoritePokemon, { loading: isLoading }] = useFavoritePokemonMutation({
    onError: () => {
      enqueueSnackbar('Failed to add pokemon to favorites', {
        variant: 'error',
      })
    },
    onCompleted: () => {
      enqueueSnackbar('Pokemon added to favorites', {
        variant: 'success',
      })
    },
  })

  const handleFavoritePokemon = (id?: string) => {
    if (!id) return

    favoritePokemon({
      variables: { id },
      optimisticResponse: () => {
        return {
          favoritePokemon: {
            __typename: 'Pokemon',
            id: new Date().toISOString(),
            isFavorite: true,
          },
        }
      },
      update: (cache, { data }) => {
        const variables = createVariables(
          category ?? Category.FAVORITE,
          filters,
        )

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

export function useUnFavoritePokemon(filters?: Filters, category?: Category) {
  const [unFavoritePokemon, { loading: isLoading }] =
    useUnFavoritePokemonMutation({
      onError: () => {
        enqueueSnackbar('Failed to remove pokemon from favorites', {
          variant: 'error',
        })
      },
      onCompleted: () => {
        enqueueSnackbar('Pokemon removed from favorites', {
          variant: 'success',
        })
      },
    })

  const handleUnFavoritePokemon = (id?: string) => {
    if (!id) return

    unFavoritePokemon({
      variables: { id },
      update: (cache) => {
        const variables = createVariables(
          category ?? Category.FAVORITE,
          filters,
        )

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
      enqueueSnackbar(`Failed to get pokemon ${name}`, {
        variant: 'error',
      })
    },
  })

  const pokemon = data?.pokemonByName

  const getSoundUrl = async () => {
    if (!pokemon) return
    try {
      const audio = await fetch(pokemon.sound, {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      })

      return createAudioUrl(await audio.arrayBuffer())
    } catch (error) {
      enqueueSnackbar('Failed to fetch pokemon sound', {
        variant: 'error',
      })
    }
  }

  const handlePlaySound = async () => {
    const url = await getSoundUrl()
    const audio = new Audio(url)
    audio.play()
  }

  return { pokemon, isLoading, handlePlaySound }
}
