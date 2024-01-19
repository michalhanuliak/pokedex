import { useGetPokemoTypesQuery } from '@/infrastructure/queries/usePokemonQuery'
import { enqueueSnackbar } from '@/lib/notistack'
import { getPokemonTypeOptions } from '@/utils'
import { useMemo } from 'react'

export function usePokemonTypeOptions() {
  const { data, loading: isLoading } = useGetPokemoTypesQuery({
    variables: {
      query: {},
    },
    onError: () => {
      enqueueSnackbar('Failed to fetch options', { variant: 'error' })
    },
  })

  const options = useMemo(() => getPokemonTypeOptions(data), [data])

  return { options, isLoading }
}
