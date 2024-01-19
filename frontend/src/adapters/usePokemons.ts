import { DEFAULT_PAGE_SIZE } from '@/constants'
import { Category, Filters } from '@/domain'
import { useGetPokemonByNameQuery, useGetPokemonsQuery } from '@/infrastructure'
import { enqueueSnackbar } from '@/lib/notistack'
import { createAudioUrl, createVariables } from '@/utils'

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
    [currentPage, data?.pokemons.count],
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

export function useGetPokemonByName(name: string) {
  const { data, loading: isLoading } = useGetPokemonByNameQuery({
    variables: {
      name,
    },
    onError: () => {
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
