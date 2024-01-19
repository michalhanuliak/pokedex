'use client'
import { usePokemonTypeOptions } from '@/adapters/useOptions'
import { useViewSettingsContext } from '@/contexts/useViewSettingsContext'
import { View } from '@/domain'
import { Stack } from '@/ui/atoms'
import { IconButton } from '@/ui/atoms/IconButton'
import { Select } from '@/ui/atoms/Select'
import { TextField } from '@/ui/atoms/TextField'
import { ListIcon, SquaresFourIcon } from '@/ui/icons'
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
        />
        <Select
          options={options.length === 0 ? initTypes : options}
          onChange={(_, value) => handleTypeChange(value)}
          value={filters.type}
          loading={isLoading}
        />
      </Stack>
      <Stack>
        <IconButton
          onClick={() => handleViewChange(View.LIST)}
          icon={<ListIcon color="#112D4E" />}
          active={view === View.LIST}
        />

        <IconButton
          onClick={() => handleViewChange(View.GRID)}
          icon={<SquaresFourIcon color="#112D4E" />}
          active={view === View.GRID}
        />
      </Stack>
    </Stack>
  )
}
