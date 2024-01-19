import {
  useFavoritePokemon,
  useUnFavoritePokemon,
} from '@/adapters/usePokemons'
import { Pokemon } from '@/domain'
import { CardHeader, CardHeaderProps } from '@/ui/molecules/CardHeader'

export type PokemonCardHeaderProps = {
  pokemon: Pokemon
  imageProps: Omit<CardHeaderProps['imageProps'], 'src'>
  hideTypes?: boolean
  flat?: boolean
}

export function PokemonCardHeader({
  pokemon: { id, name, image, isFavorite, types },
  imageProps,
  flat = false,
  hideTypes = false,
}: PokemonCardHeaderProps) {
  const { handleFavoritePokemon, isLoading: isFavouriteMutating } =
    useFavoritePokemon()
  const { handleUnFavoritePokemon, isLoading: isUnFavouriteMutating } =
    useUnFavoritePokemon()

  const onFavoriteChange = isFavorite
    ? handleFavoritePokemon
    : handleUnFavoritePokemon
  return (
    <CardHeader
      imageProps={{
        ...imageProps,
        src: image,
      }}
      flat={flat}
      name={name}
      favorite={isFavorite}
      onFavoriteChange={() => onFavoriteChange(id)}
      description={hideTypes ? '' : types.join(', ')}
    />
  )
}
