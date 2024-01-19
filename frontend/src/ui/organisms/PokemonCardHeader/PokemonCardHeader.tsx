'use client'
import { useFavoritePokemon, useUnFavoritePokemon } from '@/adapters'
import { useViewSettingsContext } from '@/contexts'
import { Pokemon, View } from '@/domain'
import { ImageProps } from 'next/image'
import { useState } from 'react'
import { CardHeader } from '../../molecules'
import { PokemonDetailModal } from '../PokemonDetailModal'
import styles from './styles.module.scss'

export type PokemonCardHeaderProps = {
  pokemon: Pokemon
  imageProps?: Omit<ImageProps, 'src'>
  hideTypes?: boolean
  hideModalButton?: boolean
}

export function PokemonCardHeader({
  pokemon,
  imageProps,
  hideTypes = false,
  hideModalButton = false,
}: PokemonCardHeaderProps) {
  const { id, name, image, isFavorite, types } = pokemon

  const { filters, view } = useViewSettingsContext()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { handleFavoritePokemon } = useFavoritePokemon(pokemon, filters)
  const { handleUnFavoritePokemon } = useUnFavoritePokemon(filters)

  function handleModalToggle() {
    setIsModalOpen((isOpen) => !isOpen)
  }
  const onFavoriteChange = isFavorite
    ? handleUnFavoritePokemon
    : handleFavoritePokemon

  return (
    <div className={styles.main}>
      <PokemonDetailModal
        pokemon={pokemon}
        isOpen={isModalOpen}
        onClose={handleModalToggle}
      />

      <CardHeader
        imageProps={
          view === View.LIST || !imageProps
            ? undefined
            : {
                ...imageProps,
                src: image,
              }
        }
        flat={view === View.LIST}
        name={name}
        favorite={isFavorite}
        onFavoriteChange={(event) => {
          event?.preventDefault()
          onFavoriteChange(id)
        }}
        onModalToggle={hideModalButton ? undefined : handleModalToggle}
        description={hideTypes ? '' : types.join(', ')}
      />
    </div>
  )
}
