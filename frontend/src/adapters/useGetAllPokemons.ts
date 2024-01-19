import { useGetPokemonsQuery } from '@/infrastructure/queries/usePokemonQuery'
import { useMemo } from 'react'

export function useGetAllPokemons() {
  const { data, loading: isLoading } = useGetPokemonsQuery({
    onError: (error) => {
      console.error(error)
    },
  })

  const pokemons = useMemo(() => {
    if (!data) return []
    return data.pokemons.edges.map((edge) => edge)
  }, [data])

  return { pokemons, isLoading }
}
