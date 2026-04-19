"use client"

import Link from "next/link"
import { TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"

const navItems = [
  { name: "Dashboard", href: "/" },
  { name: "Transactions", href: "/transactions" },
  { name: "Budgets", href: "/budgets" },
]

export function Header({ userName }: { userName: string }) {
  return (
    <header className="border-b border-border bg-background">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-6 w-6 text-teal-600" />
          <span className="text-xl font-semibold text-foreground">LedgerFlow</span>
        </div>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <span className="hidden text-sm font-medium text-foreground sm:block">{userName}</span>
          <Button size="sm" variant="outline" asChild>
            <Link href="/api/auth/signout?callbackUrl=/login">Logout</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
