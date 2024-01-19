import { PartialPokemonMutation } from '@/domain'
import {
  MutationHookOptions,
  QueryHookOptions,
  gql,
  useMutation,
  useQuery,
} from '@apollo/client'
import {
  MutationFavoritePokemonArgs,
  MutationUnFavoritePokemonArgs,
  Query,
  QueryPokemonByNameArgs,
  QueryPokemonsArgs,
} from '../generated/types'

const POKEMON_FRAGMENT = gql`
  fragment Pokemon on Pokemon {
    id
    name
    types
    image
    isFavorite
    sound
    weight {
      maximum
      minimum
    }
    height {
      maximum
      minimum
    }
    maxHP
    maxCP
    attacks {
      special {
        damage
        type
      }
      fast {
        damage
        type
      }
    }
    resistant
    weaknesses
    evolutions {
      id
      name
      image
      isFavorite
    }
  }
`

export const GET_POKEMONS = gql`
  ${POKEMON_FRAGMENT}
  query GetPokemons($query: PokemonsQueryInput!) {
    pokemons(query: $query) {
      count
      edges {
        ...Pokemon
      }
    }
  }
`

export const useGetPokemonsQuery = <
  T extends Pick<Query, 'pokemons'>,
  D extends QueryPokemonsArgs,
>(
  baseOptions?: QueryHookOptions<T, D>,
) => {
  return useQuery<T, D>(GET_POKEMONS, baseOptions)
}

export const FAVORITE_POKEMON_MUTATION = gql`
  ${POKEMON_FRAGMENT}
  mutation FavoritePokemon($id: ID!) {
    favoritePokemon(id: $id) {
      ...Pokemon
    }
  }
`

export const useFavoritePokemonMutation = <
  T extends Pick<PartialPokemonMutation, 'favoritePokemon'>,
  D extends MutationFavoritePokemonArgs,
>(
  baseOptions?: MutationHookOptions<T, D>,
) => {
  return useMutation<T, D>(FAVORITE_POKEMON_MUTATION, baseOptions)
}

export const UNFAVORITE_POKEMON_MUTATION = gql`
  ${POKEMON_FRAGMENT}
  mutation UnFavoritePokemon($id: ID!) {
    unFavoritePokemon(id: $id) {
      ...Pokemon
    }
  }
`

export const useUnFavoritePokemonMutation = <
  T extends Pick<PartialPokemonMutation, 'unFavoritePokemon'>,
  D extends MutationUnFavoritePokemonArgs,
>(
  baseOptions?: MutationHookOptions<T, D>,
) => {
  return useMutation<T, D>(UNFAVORITE_POKEMON_MUTATION, baseOptions)
}

export const GET_POKEMON = gql`
  ${POKEMON_FRAGMENT}
  query GetPokemonByName($name: String!) {
    pokemonByName(name: $name) {
      ...Pokemon
    }
  }
`

export const useGetPokemonByNameQuery = <
  T extends Pick<Query, 'pokemonByName'>,
  D extends QueryPokemonByNameArgs,
>(
  baseOptions?: QueryHookOptions<T, D>,
) => {
  return useQuery<T, D>(GET_POKEMON, baseOptions)
}

export const GET_POKEMON_TYPES = gql`
  query GetPokemonTypes {
    pokemonTypes
  }
`

export const useGetPokemoTypesQuery = <T extends Query>(
  baseOptions?: QueryHookOptions<T>,
) => {
  return useQuery<T>(GET_POKEMON_TYPES, baseOptions)
}
