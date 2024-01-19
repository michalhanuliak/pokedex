import { Category } from '@/domain'
import { Stack } from '@/ui/atoms'
import { Tab } from '@/ui/molecules'
import styles from './styles.module.scss'

type PokemonTabsProps = {
  activeCategory: Category
}

export function PokemonTabs({ activeCategory }: PokemonTabsProps) {
  return (
    <Stack className={styles.main}>
      <Tab
        category="All"
        active={Category.ALL === activeCategory}
        path={Category.ALL}
      />
      <Tab
        category="Favorite"
        active={Category.FAVORITE === activeCategory}
        path={Category.FAVORITE}
      />
    </Stack>
  )
}
