'use client'
import { HeartIcon } from '@/ui/icons/HeartIcon/HeartIcon'
import classNames from 'classnames'
import Image, { ImageProps } from 'next/image'
import { MouseEvent } from 'react'
import { Stack, Text } from '../../atoms'
import styles from './styles.module.scss'

export type CardHeaderProps = {
  imageProps: ImageProps
  name: string
  description?: string
  favorite: boolean
  onFavoriteChange?: (e: MouseEvent) => void
  flat: boolean
}

export function CardHeader({
  imageProps,
  name,
  description,
  favorite,
  onFavoriteChange,
  flat = false,
}: CardHeaderProps) {
  return (
    <Stack className={classNames(styles.main, flat && styles.flat)} column>
      <Image {...imageProps} className={classNames(flat && styles.hidden)} />
      <Stack className={styles.container}>
        <Stack
          column
          className={classNames(styles.detail, flat && styles.flat)}
        >
          <Text>{name}</Text>
          {description && <Text>{description}</Text>}
        </Stack>
        <div
          className={classNames(styles.icon, flat && styles.flat)}
          onClick={onFavoriteChange}
        >
          <HeartIcon weight={favorite ? 'fill' : 'regular'} color="red" />
        </div>
      </Stack>
    </Stack>
  )
}
