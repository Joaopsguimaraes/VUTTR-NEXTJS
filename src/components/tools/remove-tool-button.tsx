'use client'

import { useActionState } from 'react'
import { onRemoveToolAction } from '@/actions/delete-tool-action'
import { Loader, TrashIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog'
import { Button } from '../ui/button'

interface RemoveToolButtonProps {
  id: string
  name: string
}

export function RemoveToolButton({ id, name }: RemoveToolButtonProps) {
  const [_, handleRemoveTool, isPending] = useActionState(onRemoveToolAction, {
    message: '',
  })
  const t = useTranslations('removeTool')

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="icon" variant="ghost" type="button">
          <TrashIcon />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogTitle>{`${t('titleDialog')} ${name}?`}</AlertDialogTitle>
        <form action={handleRemoveTool}>
          <input type="hidden" name="id" value={id} />
          <input type="hidden" name="name" value={name} />
          <div className="flex w-full items-center justify-end gap-2">
            <AlertDialogCancel asChild>
              <Button className="min-w-40" variant="outline" type="button">
                {t('btnCancel')}
              </Button>
            </AlertDialogCancel>
            <Button className="min-w-40">
              {isPending ? (
                <Loader className="animate-spin" />
              ) : (
                <span>{t('btnConfirm')}</span>
              )}
            </Button>
          </div>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  )
}
