'use client'

import type { FormEvent } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useDebouncedCallback } from '@/utils/use-debounce-callback'
import { SearchIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Button } from '../ui/button'
import { Input } from '../ui/input'

export function SearchTool() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const t = useTranslations('ListTools')

  function submitSearchTerm(search: string) {
    const newUrl = new URL(pathname, window.location.origin)
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.delete('page')

    if (search) {
      newSearchParams.set('name', search)
    } else {
      newSearchParams.delete('name')
    }

    newUrl.search = newSearchParams.toString()
    router.push(newUrl.toString())
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const search = formData.get('name') as string

    submitSearchTerm(search)
  }

  function handleOnChange(event: FormEvent<HTMLInputElement>) {
    event.preventDefault()
    const search = (event.target as HTMLInputElement).value
    submitSearchTerm(search)
  }

  const debouncedHandleSubmit = useDebouncedCallback(handleOnChange, 500)

  return (
    <form
      className="flex items-start gap-2"
      onChange={debouncedHandleSubmit}
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col items-start gap-1">
        <Input
          className="w-96"
          placeholder={t('searchPlaceholder')}
          name="name"
          id="name"
          defaultValue={searchParams.get('name') ?? ''}
        />
        {/* <div className="mt-2 flex items-center gap-2">
          <Checkbox />
          <Label>{t('enableSearchTags')}</Label>
        </div> */}
      </div>
      <Button variant="outline" size="icon" type="submit">
        <SearchIcon />
      </Button>
    </form>
  )
}
