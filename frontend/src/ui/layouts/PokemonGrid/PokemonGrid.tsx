'use client'
import { useGetAllPokemons } from '@/adapters/usePokemons'
import { Category, Filters } from '@/domain'
import { PokemonCard } from '@/ui/molecules/PokemonCard'
import { PokemonCardHeader } from '@/ui/organisms/PokemonCardHeader'
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

  const renderedPokemons = pokemons.map((pokemon) => {
    const { id, name } = pokemon
    return (
      <PokemonCard key={id} href={`/${name.toLowerCase().replace(' ', '-')}`}>
        <PokemonCardHeader
          pokemon={pokemon}
          imageProps={{
            alt: `Pokemon ${name}`,
            width: 300,
            height: 300,
          }}
        />
      </PokemonCard>
    )
  })

  return (
    <InfiniteScroll pageStart={0} loadMore={loadNextPage} hasMore={!isLoading}>
      <div className={styles.main}>{renderedPokemons}</div>
    </InfiniteScroll>
  )
}
