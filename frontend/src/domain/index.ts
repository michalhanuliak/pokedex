import {
  Pokemon as GeneratedPokemon,
  Maybe,
} from '@/infrastructure/generated/types'

export type Pokemon = Pick<
  GeneratedPokemon,
  | 'id'
  | 'name'
  | 'types'
  | 'image'
  | 'isFavorite'
  | 'maxHP'
  | 'maxCP'
  | 'weight'
  | 'height'
  | 'weaknesses'
  | 'resistant'
  | 'attacks'
>

export type Filters = {
  query: string
  type: string
}

export type PartialPokemonMutation = {
  __typename?: 'Mutation'
  favoritePokemon?: Maybe<Partial<Pokemon>>
  unFavoritePokemon?: Maybe<Partial<Pokemon>>
}

export enum Category {
  ALL = 'all',
  FAVORITE = 'favorite',
}

export enum View {
  GRID = 'grid',
  LIST = 'list',
}
