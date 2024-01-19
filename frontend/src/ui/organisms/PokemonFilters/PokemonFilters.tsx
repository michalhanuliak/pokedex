'use client'
import { usePokemonTypeOptions } from '@/adapters/useOptions'
import { Filters, View } from '@/domain'
import { useFilters } from '@/hooks/useFilters'
import { Stack } from '@/ui/atoms'
import { IconButton } from '@/ui/atoms/IconButton'
import { Select } from '@/ui/atoms/Select'
import { TextField } from '@/ui/atoms/TextField'
import { ListIcon, SquaresFourIcon } from '@/ui/icons'
import styles from './styles.module.scss'

export type PokemonFiltersProps = {
  filters: Filters
  listView?: boolean
}
export function PokemonFilters({
  filters,
  listView = false,
}: PokemonFiltersProps) {
  const { search, handleTypeChange, handleSearchChange, handleViewChange } =
    useFilters(filters)

  const { options } = usePokemonTypeOptions()

  return (
    <Stack className={styles.main}>
      <Stack>
        <TextField
          onChange={(_, value) => handleSearchChange(value)}
          placeholder="Search"
          value={search}
        />
        <Select
          options={options}
          onChange={(_, value) => handleTypeChange(value)}
          value={filters.type}
        />
      </Stack>
      <Stack>
        <IconButton
          onClick={() => handleViewChange(View.LIST)}
          icon={<ListIcon color="#112D4E" />}
          active={listView}
        />

        <IconButton
          onClick={() => handleViewChange(View.GRID)}
          icon={<SquaresFourIcon color="#112D4E" />}
          active={!listView}
        />
      </Stack>
    </Stack>
  )
}
