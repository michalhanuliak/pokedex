import { Stack, Text } from '@/ui/atoms'
import classNames from 'classnames'
import { useState } from 'react'
import styles from './styles.module.scss'

export type DetailSkeletonProps = {
  title: string
}

export function DetailSkeleton({ title }: DetailSkeletonProps) {
  const [isLoadingSlow, setIsLoadingSlow] = useState(false)

  setTimeout(() => {
    setIsLoadingSlow(true)
  }, 500)

  if (!isLoadingSlow) {
    return
  }

  return (
    <div className={styles.main}>
      <div className={classNames(styles.skeleton, styles.box)}></div>
      <div className={classNames(styles.skeleton, styles.box)}></div>
      <Stack column>
        <Text variant="title">{title}</Text>
        <Stack className={styles.smallBoxContainer}>
          <div className={classNames(styles.skeleton, styles.boxSmall)}></div>
          <div className={classNames(styles.skeleton, styles.boxSmall)}></div>
        </Stack>
      </Stack>
    </div>
  )
}
