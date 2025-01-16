'use client'

import { useTranslations } from 'next-intl'

import { CreateTool } from './create-tool'
import { SearchTool } from './search-tools'

export function HeaderToolList() {
  const t = useTranslations('ListTools')

  return (
    <section className="mb-2 flex w-full flex-col gap-5">
      <div className="flex w-full items-center justify-between">
        <h2 className="self-start text-2xl font-bold">{t('title')}</h2>
        <CreateTool />
      </div>
      <SearchTool />
    </section>
  )
}
