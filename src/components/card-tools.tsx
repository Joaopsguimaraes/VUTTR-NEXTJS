import type { EditToolType } from '@/validations/edit-tool-schema'
import type { ListToolsType } from '@/validations/list-tools'
import { PencilIcon } from 'lucide-react'

import { EditTool } from './edit-tool'
import { RemoveToolButton } from './remove-tool-button'
import { Button } from './ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card'

interface Props {
  data: ListToolsType
}

export function CardTools({ data }: Props) {
  return (
    <Card>
      <CardContent className="w-full min-w-[1100px]">
        <CardHeader>
          <CardTitle className="w-full text-lg">{data.name}</CardTitle>
          <div className="flex w-full justify-end">
            <EditTool data={data} />
            <RemoveToolButton id={data.id} name={data.name} />
          </div>
        </CardHeader>
        <CardDescription className="text-md mb-5 px-6">
          {data.description}
        </CardDescription>
        <CardFooter>
          {data.tags.map((tag, idx) => (
            <div key={idx}>
              <span className="mx-1 font-bold">#{tag}</span>
            </div>
          ))}
        </CardFooter>
      </CardContent>
    </Card>
  )
}
