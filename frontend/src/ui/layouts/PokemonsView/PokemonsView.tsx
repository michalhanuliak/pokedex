'use client'
import { useGetAllPokemons } from '@/adapters/usePokemons'
import { useViewSettingsContext } from '@/contexts/useViewSettingsContext'
import { Pokemon, View } from '@/domain'
import { Text } from '@/ui/atoms'
import { TiltedCard } from '@/ui/molecules/TiltedCard'
import { PokemonCardHeader } from '@/ui/organisms/PokemonCardHeader'
import classNames from 'classnames'
import { SnackbarProvider } from 'notistack'
import { useMemo } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import styles from './styles.module.scss'

type PokemonsViewProps = {
  initPokemons?: Pokemon[]
}

export function PokemonsView({ initPokemons = [] }: PokemonsViewProps) {
  const { view, filters, category } = useViewSettingsContext()
  const { pokemons, loadNextPage, hasNextPage, isLoading } = useGetAllPokemons(
    category,
    filters,
  )

  const renderedPokemons = useMemo(
    () =>
      (pokemons ?? initPokemons).map((pokemon) => {
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
          />
        )
        return view === View.LIST ? (
          Header
        ) : (
          <TiltedCard
            key={id}
            href={`/${name.toLowerCase().replace(' ', '-')}`}
          >
            {Header}
          </TiltedCard>
        )
      }),
    [initPokemons, pokemons, view],
  )

  return (
    <SnackbarProvider autoHideDuration={2000}>
      <InfiniteScroll
        pageStart={0}
        loadMore={loadNextPage}
        hasMore={hasNextPage}
      >
        <div
          className={classNames(styles.main, view === View.LIST && styles.list)}
        >
          {pokemons?.length === 0 && !isLoading && (
            <Text>No pokemons found</Text>
          )}
          {renderedPokemons}
        </div>
      </InfiniteScroll>
    </SnackbarProvider>
  )
}
