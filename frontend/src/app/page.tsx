import { Category, Filters, View } from '@/domain'
import { Stack } from '@/ui/atoms'
import { PokemonsView } from '@/ui/layouts/PokemonsView'
import { PokemonTabs } from '@/ui/organisms'
import { PokemonFilters } from '@/ui/organisms/PokemonFilters'

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
    <main>
      <Stack column>
        <PokemonFilters filters={filters} />
        <PokemonTabs activeCategory={category} />
        <PokemonsView
          activeCategory={category}
          filters={filters}
          listView={view === View.LIST}
        />
      </Stack>
    </main>
  )
}
