'use client'
import { usePokemonTypeOptions } from '@/adapters/useOptions'
import { useViewSettingsContext } from '@/contexts/useViewSettingsContext'
import { View } from '@/domain'
import { IconButton, Select, Stack, TextField } from '../../atoms'
import { ListIcon, SquaresFourIcon } from '../../icons'
import styles from './styles.module.scss'

export type PokemonFiltersProps = {
  initTypes?: {
    label: string
    value: string
  }[]
}

export function PokemonFilters({ initTypes = [] }: PokemonFiltersProps) {
  const { options, isLoading } = usePokemonTypeOptions()
  const {
    view,
    filters,
    query,
    handleSearchChange,
    handleTypeChange,
    handleViewChange,
  } = useViewSettingsContext()

  return (
    <Stack className={styles.main}>
      <Stack>
        <TextField
          onChange={(_, value) => handleSearchChange(value)}
          placeholder="Search"
          value={query}
          aria-label="Search"
        />
        <Select
          options={options.length === 0 ? initTypes : options}
          onChange={(_, value) => handleTypeChange(value)}
          value={filters.type}
          loading={isLoading}
          aria-label="Type"
        />
      </Stack>
      <Stack>
        <IconButton
          onClick={() => handleViewChange(View.LIST)}
          icon={<ListIcon color="#112D4E" />}
          active={view === View.LIST}
          aria-label="List view"
        />

        <IconButton
          onClick={() => handleViewChange(View.GRID)}
          icon={<SquaresFourIcon color="#112D4E" />}
          active={view === View.GRID}
          aria-label="Grid view"
        />
      </Stack>
    </Stack>
  )
}
