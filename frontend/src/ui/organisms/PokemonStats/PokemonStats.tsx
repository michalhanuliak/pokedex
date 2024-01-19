'use client'
import {
  useFavoritePokemon,
  useGetPokemonByName,
  useUnFavoritePokemon,
} from '@/adapters/usePokemons'
import { Card } from '@/ui/molecules'
import { CardHeader } from '@/ui/molecules/CardHeader'

export type PokemonStatsProps = {
  name: string
}

export function PokemonStats({ name }: PokemonStatsProps) {
  const { pokemon, isLoading } = useGetPokemonByName(name)

  const { onPokemonFavorite, isLoading: isFavouriteMutating } =
    useFavoritePokemon()
  const { onPokemonUnFavorite, isLoading: isUnFavouriteMutating } =
    useUnFavoritePokemon()

  const onFavoriteChange = pokemon?.isFavorite
    ? onPokemonUnFavorite
    : onPokemonFavorite

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <Card>
      <CardHeader
        imageProps={{
          src: pokemon?.image ?? '',
          alt: `Pokemon ${name}`,
          width: 600,
          height: 600,
        }}
        name={name}
        description={pokemon?.types.join(', ') ?? ''}
        favorite={!!pokemon?.isFavorite}
        onFavoriteChange={() => onFavoriteChange(pokemon?.id)}
      />
    </Card>
  )
}
