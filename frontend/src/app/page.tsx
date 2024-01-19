import { Category, Filters } from '@/domain'
import { Stack } from '@/ui/atoms'
import { PokemonGrid } from '@/ui/layouts/PokemonGrid'
import { PokemonTabs } from '@/ui/organisms'
import { PokemonFilters } from '@/ui/organisms/PokemonFilters'

type Props = {
  searchParams: {
    category: Category
    query: string
    type: string
  }
}

export default function Home({ searchParams }: Props) {
  const { category, query, type } = searchParams

  const filters: Filters = {
    query,
    type,
  }

  return (
    <main>
      <Stack column>
        <PokemonFilters filters={filters} />
        <PokemonTabs activeCategory={category} />
        <PokemonGrid activeCategory={category} filters={filters} />
      </Stack>
    </main>
  )
}
