import { ViewSettingsContextProvider } from '@/contexts/useViewSettingsContext'
import { Category, Filters, View } from '@/domain'
import { getClient } from '@/infrastructure/apollo-client'
import {
  GET_POKEMONS,
  GET_POKEMON_TYPES,
} from '@/infrastructure/queries/usePokemonQuery'
import { Stack } from '@/ui/atoms'
import { PokemonsView } from '@/ui/layouts/PokemonsView'
import { PokemonTabs } from '@/ui/organisms'
import { PokemonFilters } from '@/ui/organisms/PokemonFilters'
import { createVariables, getPokemonTypeOptions } from '@/utils'
import styles from './styles.module.scss'

type Props = {
  searchParams: {
    category: Category
    query: string
    type: string
    view: View
  }
}

export const fetchCache = 'force-no-store'
export const revalidate = 0

export default async function Home({ searchParams }: Props) {
  const { category, query, type, view } = searchParams

  const filters: Filters = {
    query,
    type: type ?? '',
  }

  const settings = {
    filters,
    category,
    view: view ?? View.GRID,
  }

  const {
    data: {
      pokemons: { edges: pokemons },
    },
  } = await getClient().query({
    query: GET_POKEMONS,
    variables: createVariables(category, filters),
  })

  const { data: types } = await getClient().query({
    query: GET_POKEMON_TYPES,
  })

  const options = getPokemonTypeOptions(types)

  return (
    <main className={styles.main}>
      <Stack column>
        <PokemonTabs activeCategory={category ?? Category.ALL} />
        <Stack column className={styles.container}>
          <ViewSettingsContextProvider settings={settings}>
            <PokemonFilters initTypes={options} />
            <PokemonsView initPokemons={pokemons} />
          </ViewSettingsContextProvider>
        </Stack>
      </Stack>
    </main>
  )
}
