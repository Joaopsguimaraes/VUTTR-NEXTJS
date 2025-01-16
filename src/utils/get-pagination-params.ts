import { clamp } from 'lodash'

export function getPaginationParams(searchParams: {
  [key: string]: string | string[] | undefined
}) {
  const search = searchParams?.search ? searchParams.search.toString() : ''

  const page = searchParams?.page ? Math.max(Number(searchParams.page), 0) : 0

  const perPage = searchParams?.limit
    ? clamp(Number(searchParams.limit), 1, 100)
    : 10

  return {
    page,
    perPage,
    search,
  }
}
