'use client'

import React from 'react'
import Link from 'next/link'

const error = ({ error, reset }: { error: Error; reset: () => void }) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <div className="rounded-lg bg-white p-6 shadow-md">
        <h1 className="mb-4 text-2xl font-bold text-red-600">Error occurred</h1>
        <p className="mb-4 text-gray-700">{'Something went wrong'}</p>
        <button
          onClick={reset}
          className="rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          Try Again
        </button>
        <p className="mt-4 text-gray-600">
          Go back to{' '}
          <Link href="/" className="underline">
            home page
          </Link>
        </p>
      </div>
    </div>
  )
}

export default error
