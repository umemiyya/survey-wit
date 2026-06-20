'use client'

import Link from 'next/link'
import { useUser, UserButton } from '@clerk/nextjs'

export function Navbar() {
  const { user, isLoaded } = useUser()

  return (
    <header className="border-b border-slate-100 bg-white">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center">
            <span className="text-white text-xs font-semibold">S</span>
          </div>
          <span className="font-semibold text-slate-900 text-sm">Survey Kepuasan</span>
        </Link>

        <div className="flex items-center gap-3">
          {!isLoaded ? (
            <div className="w-8 h-8 rounded-full bg-slate-200 animate-pulse" />
          ) : user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-slate-600 hidden sm:block">
                {user.fullName ?? user.emailAddresses[0].emailAddress}
              </span>
              <UserButton afterSignOutUrl="/" />
            </div>
          ) : (
            <Link
              href="/sign-in"
              className="text-sm font-medium px-4 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              Masuk
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}