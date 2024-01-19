'use client'
import { useGetAllPokemons } from '@/adapters/usePokemons'
import { Category, Filters } from '@/domain'
import { PokemonCard } from '@/ui/molecules/PokemonCard'
import { PokemonCardHeader } from '@/ui/organisms/PokemonCardHeader'
import classNames from 'classnames'
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
  const { pokemons, isLoading, loadNextPage } = useGetAllPokemons(
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
      />
    )
    return listView ? (
      Header
    ) : (
      <PokemonCard key={id} href={`/${name.toLowerCase().replace(' ', '-')}`}>
        {Header}
      </PokemonCard>
    )
  })

  return (
    <div className={classNames(styles.main, listView && styles.list)}>
      {renderedPokemons}
    </div>
  )
}
