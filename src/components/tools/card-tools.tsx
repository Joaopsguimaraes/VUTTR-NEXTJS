import type { ListToolsType } from '@/validations/list-tools'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { EditTool } from './edit-tool'
import { RemoveToolButton } from './remove-tool-button'

interface CardToolProps {
  data: ListToolsType
}

export function CardTool({ data }: CardToolProps) {
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
