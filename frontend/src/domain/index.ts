import {
  Pokemon as GeneratedPokemon,
  Query as GeneratedQuery,
  Maybe,
} from '@/infrastructure/generated'

export type Pokemon = GeneratedPokemon

export type Query = GeneratedQuery

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
