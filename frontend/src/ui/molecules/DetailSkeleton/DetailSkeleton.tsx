import { classNames } from '@/lib/classNames'
import { useState } from 'react'
import { Stack, Text } from '../../atoms'
import styles from './styles.module.scss'

export type DetailSkeletonProps = {
  title: string
  disableThrottle?: boolean
}

export function DetailSkeleton({
  title,
  disableThrottle = false,
}: DetailSkeletonProps) {
  const [isLoadingSlow, setIsLoadingSlow] = useState(false)

  setTimeout(() => {
    setIsLoadingSlow(true)
  }, 500)

  if (!disableThrottle && !isLoadingSlow) {
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
