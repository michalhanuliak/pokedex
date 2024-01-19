import { PartialPokemonMutation } from '@/domain'
import type { MutationHookOptions } from '../../lib/apollo-client'
import { gql, useMutation } from '../../lib/apollo-client'
import { POKEMON_FRAGMENT } from '../fragments'
import {
  Mutation,
  MutationFavoritePokemonArgs,
  MutationUnFavoritePokemonArgs,
} from '../generated'

export const FAVORITE_POKEMON_MUTATION = gql`
  ${POKEMON_FRAGMENT}
  mutation FavoritePokemon($id: ID!) {
    favoritePokemon(id: $id) {
      ...Pokemon
    }
  }
`

export const useFavoritePokemonMutation = <
  T extends Pick<Mutation, 'favoritePokemon'>,
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
