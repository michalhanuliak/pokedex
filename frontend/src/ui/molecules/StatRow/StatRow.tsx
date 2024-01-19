import { Stack } from '../../atoms/Stack'
import { Text } from '../../atoms/Text'
import styles from './styles.module.scss'

export type StatRowProps = {
  label: string
  value: string | number
}

export function StatRow({ label, value }: StatRowProps) {
  return (
    <Stack className={styles.main}>
      <Text variant="title">{label}</Text>
      <Text className={styles.value}>{value}</Text>
    </Stack>
  )
}
