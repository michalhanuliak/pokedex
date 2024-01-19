import { Category, Filters } from '@/domain'
import {
  GET_POKEMONS,
  Query,
  useFavoritePokemonMutation,
  useUnFavoritePokemonMutation,
} from '@/infrastructure'
import { enqueueSnackbar } from '@/lib/notistack'
import { createVariables } from '@/utils'

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
