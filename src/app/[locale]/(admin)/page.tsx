import { headers } from 'next/headers'
import { listToolsSchema } from '@/validations/list-tools'
import { auth } from '@clerk/nextjs/server'

import { getTools } from '@/lib/prisma'
import { ListTools } from '@/components/list-tools'

type Props = {
  searchParams: Promise<any>
}

export default async function Page({ searchParams }: Props) {
  const search = await searchParams

  const data = await getTools(search)

  const dataParsed = data.map((tool) => listToolsSchema.parse(tool))

  return (
    <section className="relative flex size-full flex-col items-center">
      <ListTools data={dataParsed} />
    </section>
  )
}
