import { useCreateToolDialog } from '@/context/create-tool-context'
import { useTranslations } from 'next-intl'

import { CreateToolForm } from './create-tool-form'
import { Button } from './ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'

export function CreateToolDialog() {
  const { onOpenDialog, setOnOpenDialog } = useCreateToolDialog()
  const t = useTranslations('CreateTools')

  return (
    <Dialog open={onOpenDialog} onOpenChange={setOnOpenDialog}>
      <DialogTrigger asChild>
        <Button className="min-w-40 self-end">{t('btnCreate')}</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Cadastre a Tool</DialogTitle>
        </DialogHeader>
        <CreateToolForm />
      </DialogContent>
    </Dialog>
  )
}
