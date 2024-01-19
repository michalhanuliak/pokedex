import {
  useFavoritePokemon,
  useUnFavoritePokemon,
} from '@/adapters/usePokemons'
import { Pokemon } from '@/domain'
import { CardHeader } from '@/ui/molecules/CardHeader'
import { ImageProps } from 'next/image'

export type PokemonCardHeaderProps = {
  pokemon: Pokemon
  imageProps?: Omit<ImageProps, 'src'>
  hideTypes?: boolean
  flat?: boolean
}

export function PokemonCardHeader({
  pokemon: { id, name, image, isFavorite, types },
  filters,
  category,
  imageProps,
  flat = false,
  hideTypes = false,
}: PokemonCardHeaderProps) {
  const { handleFavoritePokemon } = useFavoritePokemon(category, filters)
  const { handleUnFavoritePokemon } = useUnFavoritePokemon(category, filters)

  const onFavoriteChange = isFavorite
    ? handleUnFavoritePokemon
    : handleFavoritePokemon

  return (
    <CardHeader
      imageProps={
        flat || !imageProps
          ? undefined
          : {
              ...imageProps,
              src: image,
            }
      }
      flat={flat}
      name={name}
      favorite={isFavorite}
      onFavoriteChange={(event) => {
        event?.preventDefault()
        onFavoriteChange(id)
      }}
      description={hideTypes ? '' : types.join(', ')}
    />
  )
}
