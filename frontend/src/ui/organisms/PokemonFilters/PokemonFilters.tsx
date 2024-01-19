'use client'
import { usePokemonTypeOptions } from '@/adapters/useOptions'
import { Filters } from '@/domain'
import { useFilters } from '@/hooks/useFilters'
import { Stack } from '@/ui/atoms'
import { Select } from '@/ui/atoms/Select'
import { TextField } from '@/ui/atoms/TextField'

export type PokemonFiltersProps = {
  filters: Filters
}
export function PokemonFilters({ filters }: PokemonFiltersProps) {
  const { onTypeChange, onSearch } = useFilters(filters)

  const { options } = usePokemonTypeOptions()

  return (
    <Stack>
      <TextField onChange={(_, value) => onSearch(value)} />
      <Select options={options} onChange={(_, value) => onTypeChange(value)} />
      <Stack column>
        <div>A</div>
        <div>B</div>
      </Stack>
    </Stack>
  )
}
