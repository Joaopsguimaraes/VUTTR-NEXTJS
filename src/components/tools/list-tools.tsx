import { type ListToolsType } from '@/validations/list-tools'

import { CardTool } from './card-tools'
import { HeaderToolList } from './header-tool-list'

interface Props {
  data: ListToolsType[]
}

export function ListTools({ data }: Props) {
  return (
    <div className="mt-10 flex w-[1100px] flex-col items-center gap-4">
      <HeaderToolList />
      {data?.map((tool) => <CardTool key={tool.id} data={tool} />)}
    </div>
  )
}
