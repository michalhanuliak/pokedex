import { PokemonDetail } from '@/ui/layouts/PokemonDetail'
import { Metadata } from 'next'
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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `Pokedex - ${params.name}`,
  }
}
