import { listToolsSchema } from '@/validations/list-tools'

import { getTools } from '@/lib/prisma'
import { ListTools } from '@/components/list-tools'

type Props = PageSearchParams

export default async function Page({ searchParams }: Props) {
  const search = await searchParams

  const data = await getTools(search)

  const dataParsed = listToolsSchema.parse(data)

  return (
    <section className="relative flex size-full flex-col items-center">
      <ListTools data={dataParsed} />
    </section>
  )
}
