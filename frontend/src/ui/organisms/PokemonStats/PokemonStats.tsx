'use client'
import { Pokemon } from '@/domain'
import { Stack } from '@/ui/atoms'
import { Text } from '@/ui/atoms/Text'
import { Card } from '@/ui/molecules'
import { StatRow } from '@/ui/molecules/StatRow/StatRow'
import styles from './styles.module.scss'

export type PokemonStatsProps = {
  pokemon: Pokemon
}

export function PokemonStats({
  pokemon: { maxCP, maxHP, weight, height, weaknesses, resistant, attacks },
}: PokemonStatsProps) {
  const renderedFastAttacks = attacks?.fast?.map(({ damage, type }) => {
    return (
      <StatRow key={`${type}-${damage}`} label={type} value={`${damage} dmg`} />
    )
  })

  const renderedSpecialAttacks = attacks?.special?.map(({ damage, type }) => {
    return (
      <StatRow key={`${type}-${damage}`} label={type} value={`${damage} dmg`} />
    )
  })

  return (
    <Stack column>
      <Card className={styles.card}>
        <Text>Base</Text>
        <StatRow label="Max CP" value={maxCP} />
        <StatRow label="Max HP" value={maxHP} />

        <StatRow
          label="Weight"
          value={`${weight.minimum} - ${weight.maximum}`}
        />
        <StatRow
          label="Height"
          value={`${height.minimum} - ${height.maximum}`}
        />
      </Card>

      <Card className={styles.card}>
        <Text>Utilities</Text>
        <StatRow
          label="Weaknesses"
          value={weaknesses?.join(', ') ?? 'unknown'}
        />
        <StatRow label="Resistant" value={resistant?.join(', ') ?? 'unknown'} />
      </Card>

      <Card className={styles.card}>
        <Text>Fast Attacks</Text>
        {renderedFastAttacks}
      </Card>

      <Card className={styles.card}>
        <Text>Special Attacks</Text>
        {renderedSpecialAttacks}
      </Card>
    </Stack>
  )
}
