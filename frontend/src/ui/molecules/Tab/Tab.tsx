'use client'
import { classNames } from '@/lib/classNames'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import { Text } from '../../atoms'
import styles from './styles.module.scss'

export type TabProps = {
  category: string
  path: string
  active?: boolean
}

export function Tab({ category, path, active }: TabProps) {
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const createCategoryPath = useCallback(() => {
    const params = new URLSearchParams(searchParams)
    params.set('category', path)
    return `${pathname}?${params.toString()}`
  }, [pathname, path, searchParams])

  return (
    <Link
      href={createCategoryPath()}
      className={classNames(styles.main, active && styles.active)}
    >
      <Text>{category}</Text>
    </Link>
  )
}
