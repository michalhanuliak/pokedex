import { useGetPokemoTypesQuery } from '@/infrastructure/queries/usePokemonQuery'
import { useMemo } from 'react'

export function usePokemonTypeOptions() {
  const { data, loading: isLoading } = useGetPokemoTypesQuery({
    variables: {
      query: {},
    },
    onError: (error) => {
      console.error(error)
    },
  })

  const options = useMemo(() => {
    if (!data) return []

    const allTypes = data.pokemonTypes
    const options = allTypes.map((type) => ({
      label: type,
      value: type.toLocaleLowerCase(),
    }))
    return [{ label: 'All', value: 'all' }, ...options]
  }, [data, isLoading])

  return { options, isLoading }
}
