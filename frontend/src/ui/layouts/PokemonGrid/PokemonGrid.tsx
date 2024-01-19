'use client'
import {
  useFavoritePokemon,
  useGetAllPokemons,
  useUnFavoritePokemon,
} from '@/adapters/usePokemons'
import { Category, Filters } from '@/domain'
import { PokemonCard } from '@/ui/organisms/PokemonCard'
import InfiniteScroll from 'react-infinite-scroller'
import styles from './styles.module.scss'

type PokemonGridProps = {
  activeCategory: Category
  filters: Filters
}

export function PokemonGrid({ activeCategory, filters }: PokemonGridProps) {
  const { pokemons, isLoading, loadNextPage } = useGetAllPokemons(
    activeCategory,
    filters,
  )

  const { onPokemonFavorite, isLoading: isFavouriteMutating } =
    useFavoritePokemon()
  const { onPokemonUnFavorite, isLoading: isUnFavouriteMutating } =
    useUnFavoritePokemon()

  const renderedPokemons = pokemons.map(
    ({ id, name, image, types, isFavorite }) => {
      const onFavoriteChange = isFavorite
        ? onPokemonUnFavorite
        : onPokemonFavorite
      return (
        <PokemonCard
          key={id}
          name={name}
          imageSrc={image}
          types={types}
          favorite={isFavorite}
          onFavoriteChange={(e) => {
            e.preventDefault()
            onFavoriteChange(id)
          }}
        />
      )
    },
  )

  return (
    <InfiniteScroll pageStart={0} loadMore={loadNextPage} hasMore={!isLoading}>
      <div className={styles.main}>{renderedPokemons}</div>
    </InfiniteScroll>
  )
}
