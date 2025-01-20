import { listToolsSchema } from '@/validations/list-tools'

import { ToolService } from '@/lib/prisma'
import { ListTools } from '@/components/tools/list-tools'

type Props = {
  searchParams: Promise<any>
  // TODO: fix this props, remove any and set correct type
}

export default async function Page({ searchParams }: Props) {
  const search = await searchParams

  const tools = await ToolService.findAll(search)

  const toolsParsed = tools.map((tool) => listToolsSchema.parse(tool))

  return (
    <section className="relative flex size-full flex-col items-center">
      <ListTools data={toolsParsed} />
    </section>
  )
}
