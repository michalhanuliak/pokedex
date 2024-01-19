'use client'
import { useGetPokemonByName } from '@/adapters'
import Image from 'next/image'
import { notFound, useRouter } from 'next/navigation'
import { IconButton, Stack } from '../../atoms'
import { ArrowLeftIcon, SpeakerSimpleHighIcon } from '../../icons'
import { DetailSkeleton } from '../../molecules'
import { PokemonCardHeader, PokemonStats } from '../../organisms'
import { PokemonEvolutions } from '../PokemonEvolutions'
import styles from './styles.module.scss'

export type PokemonDetailProps = {
  name: string
}

export function PokemonDetail({ name }: PokemonDetailProps) {
  const { pokemon, isLoading, handlePlaySound } = useGetPokemonByName(name)
  const router = useRouter()

  if (isLoading) {
    return <DetailSkeleton title="Evolution" />
  }

  if (!pokemon) {
    notFound()
  }

  return (
    <div className={styles.main}>
      <IconButton
        className={styles.backButton}
        onClick={() => router.back()}
        icon={<ArrowLeftIcon />}
        aria-label="Back"
      />
      <Stack className={styles.imageContainer}>
        <IconButton
          className={styles.speaker}
          onClick={handlePlaySound}
          icon={<SpeakerSimpleHighIcon />}
        />
        <Image
          alt={`Pokemon ${name}`}
          width={600}
          height={600}
          src={pokemon?.image}
          objectFit="contain"
          priority
          className={styles.image}
        />
      </Stack>

      <Stack column>
        <PokemonCardHeader pokemon={pokemon} hideModalButton />
        <PokemonStats pokemon={pokemon} />
      </Stack>
      <PokemonEvolutions evolutions={pokemon?.evolutions} />
    </div>
  )
}
