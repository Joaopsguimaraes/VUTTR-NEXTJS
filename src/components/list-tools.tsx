import { listToolsSchema } from '@/validations/list-tools'

import { db } from '@/lib/prisma'

import { CardTools } from './card-tools'
import { CreateTool } from './create-tool'
import { HeaderToolList } from './header-tool-list'

export async function ListTools() {
  const data = await db.tool.findMany()
  const dataFormatted = listToolsSchema.parse(data)

  return (
    <div className="flex w-[1100px] flex-col items-center gap-4">
      <HeaderToolList />
      {dataFormatted?.map((data) => (
        <CardTools
          key={data.id}
          name={data.name}
          description={data.description}
          tags={data.tags}
          id={data.id.toString()}
        />
      ))}
    </div>
  )
}
