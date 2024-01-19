'use client'

import { Filters } from '@/domain'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

const EMPTY_FILTERS: Filters = {
  query: '',
  type: '',
}

export function useFilters(defaultFilters: Filters) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const [filters, setFilters] = useState<Filters>(
    defaultFilters ?? EMPTY_FILTERS,
  )

  const handleTypeChange = (type: string) => {
    const params = new URLSearchParams(searchParams)
    if (type === 'all') {
      params.delete('type')
    } else {
      params.set('type', type)
    }

    replace(`${pathname}?${params.toString()}`)
    setFilters((prev) => ({ ...prev, type }))
  }

  const handleSearch = (query: string) => {
    const params = new URLSearchParams(searchParams)
    if (query === '' || query === undefined) {
      params.delete('query')
    } else {
      params.set('query', query)
    }

    replace(`${pathname}?${params.toString()}`)
    setFilters((prev) => ({ ...prev, query }))
  }

  return { onTypeChange: handleTypeChange, onSearch: handleSearch, filters }
}
