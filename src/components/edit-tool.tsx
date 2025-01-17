'use client'

import { useActionState, useEffect } from 'react'
import { onEditToolAction } from '@/actions/edit-tool-action'
import {
  editToolSchema,
  type EditToolType,
} from '@/validations/edit-tool-schema'
import type { ListToolsType } from '@/validations/list-tools'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader, PencilIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'

import { useToast } from '@/hooks/use-toast'

import { Button } from './ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Skeleton } from './ui/skeleton'
import { Textarea } from './ui/textarea'

interface Props {
  data: ListToolsType
}

export function EditTool({ data }: Props) {
  const [result, handleCreateTool, isPending] = useActionState(
    onEditToolAction,
    {
      error: false,
      message: '',
    }
  )
  const form = useForm<EditToolType>({
    resolver: zodResolver(editToolSchema),
    defaultValues: {
      ...data,
      tags: data.tags.join(','),
    },
  })
  const t = useTranslations('EditTool')
  const { toast } = useToast()
  const { register } = form

  useEffect(() => {
    if (result.error) {
      if (Array.isArray(result.message)) {
        result.message.forEach((error) => {
          toast({
            title: t(`validations.${error.path.trim().toLowerCase()}`),
            description: error.message,
            variant: 'destructive',
          })
        })
      } else {
        toast({
          title: result.message,
          variant: 'destructive',
        })
      }
    }

    if (result.message === 'SUCCESS') {
      toast({
        title: t('successCreateTool'),
        variant: 'success',
      })
    }
  }, [result])

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon" variant="ghost">
          <PencilIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{`${t('Atualizar a tool')}: ${data.name}`}</DialogTitle>
        </DialogHeader>
        <form action={handleCreateTool} className="flex flex-col gap-5">
          {isPending ? (
            Array.from({ length: 4 }).map((_, idx) => (
              <Skeleton key={idx} className="h-10" />
            ))
          ) : (
            <>
              <div className="space-y-2">
                <Label>{t('labelName')}</Label>
                <Input
                  placeholder={t('namePlaceholder')}
                  {...form.register('name')}
                />
              </div>

              <div className="space-y-2">
                <Label>{t('labelUrl')}</Label>
                <Input placeholder={t('urlPlaceholder')} {...register('url')} />
              </div>

              <div className="space-y-2">
                <Label>{t('labelDescription')}</Label>
                <Textarea
                  placeholder={t('descriptionPlaceholder')}
                  rows={10}
                  {...register('description')}
                />
              </div>
              <div className="space-y-2">
                <Label>{t('labelTags')}</Label>
                <Input
                  placeholder={t('tagsPlaceholder')}
                  {...register('tags')}
                />
              </div>
            </>
          )}

          <DialogFooter className="flex w-full justify-end gap-2">
            <Button type="button" variant="outline" className="min-w-40">
              {t('btnUpdate')}
            </Button>
            <Button disabled={isPending} className="min-w-40">
              {isPending ? (
                <Loader className="animate-spin" />
              ) : (
                <span>{t('btnCreate')}</span>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
