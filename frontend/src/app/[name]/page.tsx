import { PokemonDetail } from '@/ui/layouts/PokemonDetail/PokemonDetail'
import styles from './styles.module.scss'

type Props = {
  params: {
    name: string
  }
}

export default function Detail({ params }: Props) {
  return (
    <main className={styles.main}>
      <PokemonDetail name={params.name} />
    </main>
  )
}
