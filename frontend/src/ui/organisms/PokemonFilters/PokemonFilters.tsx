'use client'
import { usePokemonTypeOptions } from '@/adapters/useOptions'
import { Filters, View } from '@/domain'
import { useFilters } from '@/hooks/useFilters'
import { Stack } from '@/ui/atoms'
import { Select } from '@/ui/atoms/Select'
import { TextField } from '@/ui/atoms/TextField'
import { ListIcon, SquaresFourIcon } from '@/ui/icons'

export type PokemonFiltersProps = {
  filters: Filters
}
export function PokemonFilters({ filters }: PokemonFiltersProps) {
  const { handleTypeChange, handleSearch, handleViewChange } = useFilters()

  const { options } = usePokemonTypeOptions()

  return (
    <Stack>
      <TextField onChange={(_, value) => handleSearch(value)} />
      <Select
        options={options}
        onChange={(_, value) => handleTypeChange(value)}
      />
      <Stack column>
        <div onClick={() => handleViewChange(View.LIST)}>
          <ListIcon color="red" />
        </div>

        <div onClick={() => handleViewChange(View.GRID)}>
          <SquaresFourIcon color="red" />
        </div>
      </Stack>
    </Stack>
  )
}
