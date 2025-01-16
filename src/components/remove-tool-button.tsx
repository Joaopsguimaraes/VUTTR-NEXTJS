'use client'

import { useActionState } from 'react'
import { onRemoveToolAction } from '@/actions/delete-tool-action'
import { Loader, TrashIcon } from 'lucide-react'

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog'
import { Button } from './ui/button'

interface Props {
  id: string
  name: string
}

export function RemoveToolButton({ id, name }: Props) {
  const [_, handleRemoveTool, isPending] = useActionState(onRemoveToolAction, {
    message: '',
  })

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="icon" variant="ghost" type="button">
          <TrashIcon />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogTitle>{`Deseja remover a tool ${name}?`}</AlertDialogTitle>
        <form action={handleRemoveTool}>
          <input type="hidden" name="id" value={id} />
          <input type="hidden" name="name" value={name} />
          <div className="flex w-full items-center justify-end gap-2">
            <AlertDialogCancel asChild>
              <Button className="min-w-40" variant="outline" type="button">
                Cancelar
              </Button>
            </AlertDialogCancel>
            <Button className="min-w-40">
              {isPending ? (
                <Loader className="animate-spin" />
              ) : (
                <span>Confirmar</span>
              )}
            </Button>
          </div>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  )
}
