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
}

export function PokemonCardHeader({
  pokemon: { id, name, image, isFavorite, types },
  imageProps,
  hideTypes = false,
}: PokemonCardHeaderProps) {
  const { onPokemonFavorite, isLoading: isFavouriteMutating } =
    useFavoritePokemon()
  const { onPokemonUnFavorite, isLoading: isUnFavouriteMutating } =
    useUnFavoritePokemon()

  const onFavoriteChange = isFavorite ? onPokemonUnFavorite : onPokemonFavorite
  return (
    <CardHeader
      imageProps={{
        ...imageProps,
        src: image,
      }}
      name={name}
      favorite={isFavorite}
      onFavoriteChange={() => onFavoriteChange(id)}
      description={hideTypes ? '' : types.join(', ')}
    />
  )
}
