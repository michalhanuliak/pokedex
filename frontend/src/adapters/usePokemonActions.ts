'use client'
import { Category, Filters, Pokemon, Query } from '@/domain'

import {
  useFavoritePokemonMutation,
  useUnFavoritePokemonMutation,
} from '@/infrastructure/mutations'
import { GET_POKEMONS } from '@/infrastructure/queries'
import { enqueueSnackbar } from '@/lib/notistack'
import { createVariables } from '@/utils'

export function useFavoritePokemon(
  pokemon: Pokemon,
  filters?: Filters,
  category?: Category,
) {
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
            ...pokemon,
            id: new Date().toISOString(),
            isFavorite: true,
            // Evolutions are missing data
            maxHP: pokemon?.maxHP,
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
            if (!cachedQuery || !data?.favoritePokemon?.maxHP)
              return cachedQuery

            const pokemonEdges = cachedQuery?.pokemons.edges ?? []
            const updatedPokemonEdges = [
              ...pokemonEdges,
              ...(data?.favoritePokemon ? [data.favoritePokemon] : []),
            ]

            const updatedQuery: Query = {
              ...cachedQuery,
              pokemons: {
                ...cachedQuery.pokemons,
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
            if (!cachedQuery) return cachedQuery

            const pokemonEdges = cachedQuery?.pokemons.edges ?? []
            const updatedPokemonEdges = pokemonEdges.filter((pokemon) => {
              return pokemon.id !== id
            })

            const updatedQuery = {
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
