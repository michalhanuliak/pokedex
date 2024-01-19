import { Pokemon } from '@/domain'

import { Stack, Text } from '../../atoms'
import { TiltedCard } from '../../molecules'
import { PokemonCardHeader } from '../../organisms/PokemonCardHeader'
import styles from './styles.module.scss'

export type PokemonEvolutionsProps = {
  evolutions: Pokemon[]
}

export function PokemonEvolutions({ evolutions }: PokemonEvolutionsProps) {
  const renderedEvolutions = evolutions.map((evolution) => {
    return (
      <TiltedCard key={evolution.id} href={`/${evolution.name}`}>
        <PokemonCardHeader
          pokemon={evolution}
          imageProps={{
            alt: `Evolution ${name}`,
            width: 300,
            height: 300,
          }}
          hideTypes
          hideModalButton
        />
      </TiltedCard>
    )
  })

  return (
    <Stack column className={styles.main}>
      <Text variant="title">Evolutions</Text>
      {renderedEvolutions.length === 0 && (
        <Text>This is the highest evolution</Text>
      )}
      <Stack className={styles.container}>{renderedEvolutions}</Stack>
    </Stack>
  )
}
