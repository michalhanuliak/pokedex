import { useGetPokemoTypesQuery } from '@/infrastructure/queries/usePokemonQuery'
import { getPokemonTypeOptions } from '@/utils'
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

  const options = useMemo(() => getPokemonTypeOptions(data), [data, isLoading])

  return { options, isLoading }
}
