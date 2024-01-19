'use client'

import { Filters, View } from '@/domain'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { useDebounce } from 'react-use'

export function useFilters(filters: Filters) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const [search, setSearch] = useState(filters.query ?? '')

  const handleTypeChange = (type: string) => {
    const params = new URLSearchParams(searchParams)
    if (type === 'all') {
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
    setSearch(query)
  }

  useDebounce(
    () => {
      handleSearch(search)
    },
    300,
    [search],
  )

  return { search, handleTypeChange, handleSearchChange, handleViewChange }
}
