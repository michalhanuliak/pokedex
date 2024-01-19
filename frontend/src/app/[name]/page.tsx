import { PokemonDetail } from '@/ui/layouts/PokemonDetail/PokemonDetail'

type Props = {
  params: {
    name: string
  }
}

export default function Detail({ params }: Props) {
  return (
    <main>
      <PokemonDetail name={params.name} />
    </main>
  )
}
