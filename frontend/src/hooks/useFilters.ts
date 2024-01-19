'use client'

import { Filters, View } from '@/domain'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { useDebounce } from 'react-use'

export function useFilters(filters: Filters) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const [query, setQuery] = useState(filters.query ?? '')

  const handleTypeChange = (type: string) => {
    const params = new URLSearchParams(searchParams)
    if (type === '') {
      params.delete('type')
    } else {
      params.set('type', type)
    }

    replace(`${pathname}?${params.toString()}`)
  }

  const handleViewChange = (view: View) => {
    const params = new URLSearchParams(searchParams)
    if (view === View.GRID) {
      params.delete('view')
    } else {
      params.set('view', view)
    }

    replace(`${pathname}?${params.toString()}`)
  }

  const handleSearch = (query: string) => {
    const params = new URLSearchParams(searchParams)
    if (query === '' || query === undefined) {
      params.delete('query')
    } else {
      params.set('query', query)
    }

    replace(`${pathname}?${params.toString()}`)
  }

  const handleSearchChange = (query: string) => {
    setQuery(query)
  }

  useDebounce(
    () => {
      handleSearch(query)
    },
    300,
    [query],
  )

  return {
    filters,
    query,
    handleTypeChange,
    handleSearchChange,
    handleViewChange,
  }
}
