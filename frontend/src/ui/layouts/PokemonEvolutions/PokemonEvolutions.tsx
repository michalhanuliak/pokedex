import { Pokemon } from '@/domain'
import { Stack } from '@/ui/atoms'
import { Card } from '@/ui/molecules'
import { PokemonCardHeader } from '@/ui/organisms/PokemonCardHeader'

export type PokemonEvolutionsProps = {
  evolutions: Pokemon[]
}

export function PokemonEvolutions({ evolutions }: PokemonEvolutionsProps) {
  const renderedEvolutions = evolutions.map((evolution) => {
    return (
      <Card key={evolution.id}>
        <PokemonCardHeader
          pokemon={evolution}
          imageProps={{
            alt: `Evolution ${name}`,
            width: 300,
            height: 300,
          }}
          hideTypes
        />
      </Card>
    )
  })
  return (
    <Stack column>
      <Stack>{renderedEvolutions}</Stack>
    </Stack>
  )
}
