"use client"
import { Button } from "@/components/elements/Button"
import Image from "next/image"
import Link from "next/link"
import { it } from "node:test"
import { useEffect, useRef, useState } from "react"

const NAV_ITEMS = [{ label: "練習相手を探す", href: "/auth/search" }]
const PROFILE_NAV_ITEMS = [
  { label: "プロフィール", href: "/auth/profile" },
  { label: "ログアウト", href: "/" },
]

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!isOpen) return
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isOpen])

  return (
    <header className="bg-off-white border-espresso relative flex w-full items-center justify-between rounded-full border-5">
      <div className="px-6 py-6">
        <Link
          href="/auth/search"
          className="text-grass-green text-lg font-bold tracking-tight"
        >
          LangExchange
        </Link>
      </div>
      <div className="flex items-center gap-1 px-6">
        <nav>
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-espresso/70 hover:bg-light-green/40 hover:text-espresso rounded-lg px-3 py-2.5 text-sm font-medium transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="cursor-pointer"
        >
          <Image
            src="https://placehold.jp/40x40.png"
            width={40}
            height={40}
            alt="プロフィール画像"
            className="rounded-full"
          />
        </button>
      </div>

      {isOpen && (
        <nav
          ref={menuRef}
          className="bg-off-white border-espresso/10 shadow-card absolute top-16 right-4 z-50 flex min-w-36 flex-col overflow-hidden rounded-xl border"
        >
          {PROFILE_NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-espresso hover:bg-light-green/30 px-4 py-3 text-sm font-medium transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
