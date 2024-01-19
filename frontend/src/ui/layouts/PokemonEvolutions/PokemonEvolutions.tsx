import { Pokemon } from '@/domain'
import { Stack, Text } from '@/ui/atoms'
import { TiltedCard } from '@/ui/molecules'
import { PokemonCardHeader } from '@/ui/organisms/PokemonCardHeader'
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
