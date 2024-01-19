import { QueryHookOptions, gql, useQuery } from '@apollo/client'
import { Query, QueryPokemonsArgs } from '../generated/types'

export const GET_POKEMONS = gql`
  {
    pokemons(query: {}) {
      edges {
        id
        name
        types
        image
      }
    }
  }
`

export const useGetPokemonsQuery = (
  baseOptions?: QueryHookOptions<Query, QueryPokemonsArgs>,
) => {
  return useQuery<Query, QueryPokemonsArgs>(GET_POKEMONS, baseOptions)
}
