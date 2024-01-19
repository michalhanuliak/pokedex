'use client'
import { useGetPokemonByName } from '@/adapters/usePokemons'
import { Card } from '@/ui/molecules'

export type PokemonStatsProps = {
  name: string
}

export function PokemonStats({ name }: PokemonStatsProps) {
  const { pokemon, isLoading } = useGetPokemonByName(name)

  return <Card></Card>
}
