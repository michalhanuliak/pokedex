import { useGetPokemonsQuery } from '@/infrastructure/queries/usePokemonQuery'
import { useMemo } from 'react'

export function usePokemonTypeOptions() {
  const { data, loading: isLoading } = useGetPokemonsQuery({
    variables: {
      query: {},
    },
    onError: (error) => {
      console.error(error)
    },
  })

  const options = useMemo(() => {
    if (!data) return []

    const allTypes = data.pokemons.edges.map((pokemon) => pokemon.types).flat()
    const uniqueTypes = Array.from(new Set(allTypes))
    const options = uniqueTypes.map((type) => ({
      label: type,
      value: type.toLocaleLowerCase(),
    }))
    return [{ label: 'All', value: 'all' }, ...options]
  }, [data, isLoading])

  return { options, isLoading }
}
