import { useMemo } from 'react'
import { matchSorter } from 'match-sorter'

export type Result = { title: string; url: string; content: string , description?: string, }

export default function useSearch({ search, folder, docs }): Result[] {
  const results = useMemo(() => {
    if (!search) return []
      const re: Result[] = matchSorter(
        docs,
        search,
        { keys: ['title', 'description', 'content'], threshold: matchSorter.rankings.CONTAINS }
      )
      return re.slice(0, 5)
  }, [search])

  return results
}
