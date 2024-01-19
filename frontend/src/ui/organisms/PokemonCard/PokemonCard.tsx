'use client'
import { HeartIcon } from '@/ui/icons/HeartIcon/HeartIcon'
import { Card } from '@/ui/molecules'
import Image from 'next/image'
import Link from 'next/link'
import { MouseEvent } from 'react'
import Tilt from 'react-parallax-tilt'
import { Stack, Text } from '../../atoms'
import styles from './styles.module.scss'

export type PokemonCardProps = {
  imageSrc: string
  name: string
  types: string[]
  favorite: boolean
  onFavoriteChange?: (e: MouseEvent) => void
}

export function PokemonCard({
  imageSrc,
  name,
  types,
  favorite,
  onFavoriteChange,
}: PokemonCardProps) {
  const renderedTypes = types.map((type) => <Text key={type}>{type}</Text>)

  return (
    <Tilt tiltMaxAngleX={4} tiltMaxAngleY={4}>
      <Link href={`/${name.toLowerCase().replace(' ', '-')}`}>
        <Card>
          <Image
            src={imageSrc}
            alt={`Pokemon ${name}`}
            width={300}
            height={300}
          />
          <Stack>
            <Stack column className={styles.detail}>
              <Text>{name}</Text>
              <Stack>{renderedTypes}</Stack>
            </Stack>
            <div className={styles.icon} onClick={onFavoriteChange}>
              <HeartIcon weight={favorite ? 'fill' : 'regular'} color="red" />
            </div>
          </Stack>
        </Card>
      </Link>
    </Tilt>
  )
}
