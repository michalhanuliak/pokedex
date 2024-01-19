'use client'

import { View } from '@/domain'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export function useFilters() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const handleTypeChange = (type: string) => {
    const params = new URLSearchParams(searchParams)
    if (type === 'all') {
      params.delete('type')
    } else {
      params.set('type', type)
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

  const handleViewChange = (view: View) => {
    const params = new URLSearchParams(searchParams)
    if (view === View.GRID) {
      params.delete('view')
    } else {
      params.set('view', view)
    }

    replace(`${pathname}?${params.toString()}`)
  }

  return { handleTypeChange, handleSearch, handleViewChange }
}
