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
  }
`

const POKEMON_DETAIL_FRAGMENT = gql`
  ${POKEMON_FRAGMENT}
  fragment PokemonDetail on Pokemon {
    ...Pokemon
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
      edges {
        ...Pokemon
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
  ${POKEMON_FRAGMENT}
  mutation FavoritePokemon($id: ID!) {
    favoritePokemon(id: $id) {
      ...Pokemon
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
  ${POKEMON_FRAGMENT}
  mutation UnFavoritePokemon($id: ID!) {
    unFavoritePokemon(id: $id) {
      ...Pokemon
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

export const GET_POKEMON = gql`
  ${POKEMON_DETAIL_FRAGMENT}
  query GetPokemonByName($name: String!) {
    pokemonByName(name: $name) {
      ...PokemonDetail
    }
  }
`

export const useGetPokemonQuery = (
  baseOptions?: QueryHookOptions<Query, QueryPokemonByNameArgs>,
) => {
  return useQuery<Query, QueryPokemonByNameArgs>(GET_POKEMON, baseOptions)
}
