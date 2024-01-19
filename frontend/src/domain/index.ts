import { Pokemon as GeneratedPokemon } from '@/infrastructure/generated/types'

export type Pokemon = Pick<
  GeneratedPokemon,
  'id' | 'name' | 'types' | 'image' | 'isFavorite'
>

export type Filters = {
  query: string
  type: string
}

export enum Category {
  ALL = 'all',
  FAVORITE = 'favorite',
}

export enum View {
  GRID = 'grid',
  LIST = 'list',
}
