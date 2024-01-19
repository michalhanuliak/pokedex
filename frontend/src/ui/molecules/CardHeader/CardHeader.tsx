'use client'
import { HeartIcon } from '@/ui/icons/HeartIcon/HeartIcon'
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
}

export function CardHeader({
  imageProps,
  name,
  description,
  favorite,
  onFavoriteChange,
}: CardHeaderProps) {
  return (
    <Stack className={styles.main} column>
      <Image {...imageProps} />
      <Stack className={styles.container}>
        <Stack column className={styles.detail}>
          <Text>{name}</Text>
          {description && <Text>{description}</Text>}
        </Stack>
        <div className={styles.icon} onClick={onFavoriteChange}>
          <HeartIcon weight={favorite ? 'fill' : 'regular'} color="red" />
        </div>
      </Stack>
    </Stack>
  )
}
