import { PencilIcon } from 'lucide-react'

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
  id: string
  name: string
  description: string
  tags: string[]
}

export function CardTools({ id, name, description, tags }: Props) {
  return (
    <Card>
      <CardContent className="w-full min-w-[1100px]">
        <CardHeader>
          <CardTitle className="w-full text-lg">{name}</CardTitle>
          <div className="flex w-full justify-end">
            <RemoveToolButton id={id} name={name} />
            <Button size="icon" variant="ghost">
              <PencilIcon />
            </Button>
          </div>
        </CardHeader>
        <CardDescription className="text-md mb-5 px-6">
          {description}
        </CardDescription>
        <CardFooter>
          {tags.map((tag, idx) => (
            <div key={idx}>
              <span className="mx-1 font-bold">#{tag}</span>
            </div>
          ))}
        </CardFooter>
      </CardContent>
    </Card>
  )
}
