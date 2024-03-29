'use client'
import { classNames } from '@/lib/classNames'
import Image, { ImageProps } from 'next/image'
import { MouseEvent } from 'react'
import { IconButton, Stack, Text } from '../../atoms'
import { EyeIcon, HeartIcon } from '../../icons'
import styles from './styles.module.scss'

export type CardHeaderProps = {
  name: string
  favorite: boolean
  onFavoriteChange: (e: MouseEvent) => void
  onModalToggle?: () => void
  description?: string
  imageProps?: ImageProps
  flat?: boolean
}

export function CardHeader({
  imageProps,
  name,
  favorite,
  onFavoriteChange,
  onModalToggle,
  description,
  flat = false,
}: CardHeaderProps) {
  return (
    <Stack className={classNames(styles.main, flat && styles.flat)} column>
      {imageProps && (
        <Image
          {...imageProps}
          className={classNames(styles.image, flat && styles.hidden)}
        />
      )}
      <Stack className={styles.container}>
        <Stack
          column
          className={classNames(styles.detail, flat && styles.flat)}
        >
          <Text variant="title">{name}</Text>
          {description && <Text>{description}</Text>}
        </Stack>
        <Stack>
          {onModalToggle && (
            <IconButton
              icon={<EyeIcon weight="fill" />}
              onClick={(event) => {
                event.preventDefault()
                onModalToggle()
              }}
              className={styles.eye}
              aria-label="View details"
            />
          )}
          <IconButton
            className={classNames(styles.icon, flat && styles.flat)}
            onClick={onFavoriteChange}
            icon={
              <HeartIcon weight={favorite ? 'fill' : 'regular'} color="red" />
            }
          />
        </Stack>
      </Stack>
    </Stack>
  )
}
