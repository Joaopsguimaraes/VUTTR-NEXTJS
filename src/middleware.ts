/* eslint-disable prefer-const */
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import acceptLanguage from 'accept-language'

import { cookieName, fallbackLng, languages } from './i18n/settings'

acceptLanguage.languages(languages)

const isPublicRoute = createRouteMatcher([
  '/:locale/sign-in(.*)',
  '/:locale/sign-up(.*)',
])

type MiddleProps = {
  response: NextResponse
  cookieName: string
  cookieValue: string
}

function setLanguageCookie({ response, cookieName, cookieValue }: MiddleProps) {
  const maxAge = 60 * 60 * 24 * 7 // one week
  const cookieHeader = `${cookieName}=${cookieValue}; Path=/; Max-Age=${maxAge}; SameSite=Strict`
  response.headers.set('Set-Cookie', cookieHeader)
}

export default clerkMiddleware(
  async (auth, req: NextRequest) => {
    const path = req.nextUrl.pathname

    if (path.startsWith('/api') || path.startsWith('/_next')) {
      if (!isPublicRoute(req)) {
        await auth().protect()
      }

      return NextResponse.next()
    }

    let cookieValue = req.cookies.get(cookieName)?.value
    let headerValue = req.headers.get('Accept-Language')
    let lng = cookieValue || acceptLanguage.get(headerValue) || fallbackLng

    if (!languages.includes(lng)) {
      lng = acceptLanguage.get(headerValue) || fallbackLng
    }

    const pathSegments = req.nextUrl.pathname.split('/')
    const pathLanguage = pathSegments[1]
    let response = NextResponse.next()

    if (!languages.includes(pathLanguage) && !path.startsWith('/_next')) {
      const newPath = `/${lng}${req.nextUrl.pathname}`
      response = NextResponse.redirect(new URL(newPath, req.url))
      if (cookieValue !== lng) {
        setLanguageCookie({ response, cookieName, cookieValue: lng })
      }
      return response
    }

    if (!isPublicRoute(req)) {
      auth().protect()
    }

    if (cookieValue !== lng) {
      setLanguageCookie({ response, cookieName, cookieValue: lng })
    }

    return response
  },
  {
    // debug: true,
  }
)

export const config = {
  matcher: ['/((?!_next|static).*)'],
}
