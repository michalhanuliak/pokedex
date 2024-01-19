'use client'
import { useGetAllPokemons } from '@/adapters/useGetAllPokemons'
import styles from './page.module.css'

export default function Home() {
  const { pokemons, isLoading } = useGetAllPokemons()

  console.log(pokemons)

  if (isLoading) {
    return <div>Loading...</div>
  }

  return <main className={styles.main}></main>
}
