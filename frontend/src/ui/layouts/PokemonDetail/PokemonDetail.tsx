'use client'
import { useGetPokemonByName } from '@/adapters/usePokemons'
import { Stack } from '@/ui/atoms'
import { IconButton } from '@/ui/atoms/IconButton'
import { ArrowLeftIcon } from '@/ui/icons/ArrowLeftIcon'
import { SpeakerSimpleHighIcon } from '@/ui/icons/SpeakerSimpleHighIcon'
import { PokemonCardHeader } from '@/ui/organisms/PokemonCardHeader'
import { PokemonStats } from '@/ui/organisms/PokemonStats/PokemonStats'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { PokemonEvolutions } from '../PokemonEvolutions'
import styles from './styles.module.scss'

export type PokemonDetailProps = {
  name: string
}

export function PokemonDetail({ name }: PokemonDetailProps) {
  const { pokemon, isLoading, handlePlaySound } = useGetPokemonByName(name)
  const router = useRouter()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!pokemon) {
    return <div>Not found</div>
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
          src={pokemon.image}
          objectFit="contain"
          priority
          className={styles.image}
        />
      </Stack>

      <Stack column>
        <PokemonCardHeader pokemon={pokemon} hideModalButton />
        <PokemonStats pokemon={pokemon} />
      </Stack>
      <PokemonEvolutions evolutions={pokemon.evolutions} />
    </div>
  )
}
