import { matchSorter } from 'match-sorter';
import { useMemo } from 'react';

export type Result = { title: string; url: string; content: string , description?: string, }

export default function useSearch({ search, docs }): Result[] {
  const results = useMemo(() => {
    if (!search) return []
      const re: Result[] = matchSorter(
        docs,
        search,
        { keys: ['title', 'description'], threshold: matchSorter.rankings.CONTAINS }
      )
      return re.slice(0, 5)
  }, [search])

  return results
}
