import {
  MutationHookOptions,
  QueryHookOptions,
  gql,
  useMutation,
  useQuery,
} from '@apollo/client'
import {
  Mutation,
  MutationFavoritePokemonArgs,
  MutationUnFavoritePokemonArgs,
  Query,
  QueryPokemonsArgs,
} from '../generated/types'

export const GET_POKEMONS = gql`
  query GetPokemons($query: PokemonsQueryInput!) {
    pokemons(query: $query) {
      edges {
        id
        name
        types
        image
        isFavorite
      }
    }
  }
`

export const useGetPokemonsQuery = (
  baseOptions?: QueryHookOptions<Query, QueryPokemonsArgs>,
) => {
  return useQuery<Query, QueryPokemonsArgs>(GET_POKEMONS, baseOptions)
}

export const FAVORITE_POKEMON_MUTATION = gql`
  mutation FavoritePokemon($id: ID!) {
    favoritePokemon(id: $id) {
      id
    }
  }
`

export const useFavoritePokemonMutation = (
  baseOptions?: MutationHookOptions<Mutation, MutationFavoritePokemonArgs>,
) => {
  return useMutation<Mutation, MutationFavoritePokemonArgs>(
    FAVORITE_POKEMON_MUTATION,
    baseOptions,
  )
}

export const UNFAVORITE_POKEMON_MUTATION = gql`
  mutation UnFavoritePokemon($id: ID!) {
    unFavoritePokemon(id: $id) {
      id
    }
  }
`

export const useUnFavoritePokemonMutation = (
  baseOptions?: MutationHookOptions<Mutation, MutationUnFavoritePokemonArgs>,
) => {
  return useMutation<Mutation, MutationUnFavoritePokemonArgs>(
    UNFAVORITE_POKEMON_MUTATION,
    baseOptions,
  )
}
