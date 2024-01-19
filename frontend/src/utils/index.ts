import { DEFAULT_PAGE_SIZE } from '@/constants'
import { Category, Filters, Query } from '@/domain'

export async function createAudioUrl(
  arrayBuffer: ArrayBuffer,
): Promise<string> {
  const blob = new Blob([arrayBuffer], { type: 'audio/mp3' })
  return URL.createObjectURL(blob)
}

export function createVariables(category?: Category, filters?: Filters) {
  return {
    query: {
      filter: {
        isFavorite: category === Category.FAVORITE ? true : undefined,
        type: filters?.type,
      },
      search: filters?.query ?? '',
      limit: DEFAULT_PAGE_SIZE,
    },
  }
}

export function getPokemonTypeOptions(
  data: Pick<Query, 'pokemonTypes'> | undefined | null,
) {
  if (!data) return []

  const allTypes = data.pokemonTypes
  const options = allTypes.map((type) => ({
    label: type,
    value: type.toLocaleLowerCase(),
  }))
  return [{ label: 'All', value: '' }, ...options]
}
