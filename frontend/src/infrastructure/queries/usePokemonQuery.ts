import type { QueryHookOptions } from '../../lib/apollo-client'
import { gql, useQuery } from '../../lib/apollo-client'
import { POKEMON_FRAGMENT } from '../fragments'
import { Query, QueryPokemonByNameArgs, QueryPokemonsArgs } from '../generated'

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
