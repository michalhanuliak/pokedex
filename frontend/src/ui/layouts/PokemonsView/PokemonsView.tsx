'use client'
import { useGetAllPokemons } from '@/adapters/usePokemons'
import { Category, Filters } from '@/domain'
import { TiltedCard } from '@/ui/molecules/TiltedCard'
import { PokemonCardHeader } from '@/ui/organisms/PokemonCardHeader'
import classNames from 'classnames'
import InfiniteScroll from 'react-infinite-scroller'
import styles from './styles.module.scss'

type PokemonsViewProps = {
  activeCategory: Category
  filters: Filters
  listView: boolean
}

export function PokemonsView({
  activeCategory,
  filters,
  listView,
}: PokemonsViewProps) {
  const { pokemons, isLoading, loadNextPage, hasNextPage } = useGetAllPokemons(
    activeCategory,
    filters,
  )

  const renderedPokemons = pokemons.map((pokemon) => {
    const { id, name } = pokemon
    const Header = (
      <PokemonCardHeader
        key={id}
        pokemon={pokemon}
        imageProps={{
          alt: `Pokemon ${name}`,
          width: 300,
          height: 300,
        }}
        flat={listView}
        filters={filters}
        category={activeCategory}
      />
    )
    return listView ? (
      Header
    ) : (
      <TiltedCard key={id} href={`/${name.toLowerCase().replace(' ', '-')}`}>
        {Header}
      </TiltedCard>
    )
  })

  return (
    <InfiniteScroll pageStart={0} loadMore={loadNextPage} hasMore={hasNextPage}>
      <div className={classNames(styles.main, listView && styles.list)}>
        {renderedPokemons}
      </div>
    </InfiniteScroll>
  )
}
