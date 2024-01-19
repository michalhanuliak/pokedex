import { Text } from '@/ui/atoms'
import classNames from 'classnames'
import Link from 'next/link'
import styles from './styles.module.scss'

export type TabProps = {
  category: string
  path: string
  active?: boolean
}

export function Tab({ category, path, active }: TabProps) {
  return (
    <Link
      href={`?${new URLSearchParams({ category: path })}`}
      className={classNames(styles.main, active && styles.active)}
    >
      <Text>{category}</Text>
    </Link>
  )
}
