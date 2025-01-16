'use client'

import { SearchIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { CreateTool } from './create-tool'
import { Button } from './ui/button'
import { Checkbox } from './ui/checkbox'
import { Input } from './ui/input'
import { Label } from './ui/label'

export function HeaderToolList() {
  const t = useTranslations('ListTools')

  return (
    <section className="mb-2 flex w-full flex-col gap-5">
      <div className="flex w-full items-center justify-between">
        <h2 className="self-start text-2xl font-bold">{t('title')}</h2>
        <CreateTool />
      </div>
      <form action="" className="flex items-start gap-2">
        <div className="flex flex-col items-start gap-1">
          {/* <Label className="font-medium text-md">{t('search')}</Label> */}
          <Input className="w-96" placeholder={t('searchPlaceholder')} />
          <div className="mt-2 flex items-center gap-2">
            <Checkbox />
            <Label>{t('enableSearchTags')}</Label>
          </div>
        </div>
        <Button variant="outline" size="icon">
          <SearchIcon />
        </Button>
      </form>
    </section>
  )
}
