'use client'
import { useGetAllPokemons } from '@/adapters/useGetAllPokemons'
import { Card } from '@/components/molecules/Card/Card'
import styles from './styles.module.scss'

export function PokemonGrid() {
  const { pokemons, isLoading } = useGetAllPokemons()

  const renderedPokemons = pokemons.map(({ id, name, image, types }) => {
    return <Card key={id} imageSrc={image} name={name} types={types} />
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  return <div className={styles.main}>{renderedPokemons}</div>
}
