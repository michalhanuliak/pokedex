'use client'
import { useGetPokemonByName } from '@/adapters/usePokemons'
import { Card } from '@/ui/molecules'
import { PokemonCardHeader } from '@/ui/organisms/PokemonCardHeader'
import { PokemonEvolutions } from '../PokemonEvolutions'

export type PokemonDetailProps = {
  name: string
}

export function PokemonDetail({ name }: PokemonDetailProps) {
  const { pokemon, isLoading } = useGetPokemonByName(name)

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!pokemon) {
    return <div>Not found</div>
  }

  return (
    <Card>
      <PokemonCardHeader
        pokemon={pokemon}
        imageProps={{
          alt: `Pokemon ${name}`,
          width: 600,
          height: 600,
        }}
      />
      <PokemonEvolutions evolutions={pokemon.evolutions} />
    </Card>
  )
}
