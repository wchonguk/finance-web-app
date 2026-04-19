"use client"

import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { TrendingUp } from "lucide-react"

const navItems = [
  { name: "Dashboard", href: "/", active: true },
  { name: "Invoices", href: "/invoices", active: false },
  { name: "Expenses", href: "/expenses", active: false },
  { name: "Reports", href: "/reports", active: false },
  { name: "Settings", href: "/settings", active: false },
]

export function Header() {
  return (
    <header className="border-b border-border bg-background">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-6 w-6 text-teal-600" />
          <span className="text-xl font-semibold text-foreground">LedgerFlo</span>
        </div>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                item.active
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarImage src="/avatar.jpg" alt="Jane" />
            <AvatarFallback className="bg-muted text-muted-foreground">JD</AvatarFallback>
          </Avatar>
          <span className="hidden text-sm font-medium text-foreground sm:block">Jane</span>
        </div>
      </div>
    </header>
  )
}
