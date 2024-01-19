'use client'
import { Category, Filters, View } from '@/domain'
import { useFilters } from '@/hooks/useFilters'
import { PropsWithChildren, createContext, useContext, useMemo } from 'react'

export type ViewSettingsContextType = ReturnType<typeof useFilters> & {
  view: View
  category: Category
}

const ViewSettingsContext = createContext<ViewSettingsContextType>({
  query: '',
  handleTypeChange: () => void 0,
  handleSearchChange: () => void 0,
  handleViewChange: () => void 0,
  view: View.GRID,
  category: Category.ALL,
  filters: {
    query: '',
    type: '',
  },
})

type ViewSettingsContextProps = PropsWithChildren<{
  settings: {
    filters: Filters
    category: Category
    view: View
  }
}>

export function ViewSettingsContextProvider({
  settings,
  children,
}: ViewSettingsContextProps) {
  const filters = useFilters(settings.filters)

  const viewSettings = useMemo(
    () => ({
      ...settings,
      ...filters,
    }),
    [settings, filters],
  )
  return (
    <ViewSettingsContext.Provider value={viewSettings}>
      {children}
    </ViewSettingsContext.Provider>
  )
}

export const useViewSettingsContext = () => useContext(ViewSettingsContext)
