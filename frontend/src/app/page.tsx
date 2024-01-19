import { Category, Filters, View } from '@/domain'
import { Stack } from '@/ui/atoms'
import { PokemonsView } from '@/ui/layouts/PokemonsView'
import { PokemonTabs } from '@/ui/organisms'
import { PokemonFilters } from '@/ui/organisms/PokemonFilters'
import styles from './styles.module.scss'

type Props = {
  searchParams: {
    category: Category
    query: string
    type: string
    view: View
  }
}

export default function Home({ searchParams }: Props) {
  const { category, query, type, view } = searchParams

  const filters: Filters = {
    query,
    type,
  }

  return (
    <main className={styles.main}>
      <Stack column>
        <PokemonTabs activeCategory={category} />
        <Stack column className={styles.container}>
          <PokemonFilters filters={filters} listView={view === View.LIST} />
          <PokemonsView
            activeCategory={category}
            filters={filters}
            listView={view === View.LIST}
          />
        </Stack>
      </Stack>
    </main>
  )
}
