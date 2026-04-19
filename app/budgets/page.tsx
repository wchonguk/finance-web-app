"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/dashboard/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

type Budget = {
  id: number
  monthlyLimit: number
  month: number
  year: number
  categoryName: string
  categoryId: number
}

export default function BudgetsPage() {
  const [budgets, setBudgets] = useState<Budget[]>([])
  const [form, setForm] = useState({ categoryId: "1", monthlyLimit: "", month: "1", year: String(new Date().getFullYear()) })
  const [error, setError] = useState<string | null>(null)

  async function loadBudgets() {
    const response = await fetch("/api/budgets")
    if (!response.ok) {
      setError("Could not load budgets")
      return
    }

    const data = (await response.json()) as Budget[]
    setBudgets(data)
  }

  useEffect(() => {
    loadBudgets().catch(() => setError("Could not load budgets"))
  }, [])

  async function submitBudget(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const response = await fetch("/api/budgets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        categoryId: Number(form.categoryId),
        monthlyLimit: Number(form.monthlyLimit),
        month: Number(form.month),
        year: Number(form.year),
      }),
    })

    if (!response.ok) {
      setError("Could not save budget")
      return
    }

    setError(null)
    await loadBudgets()
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header userName="User" />
      <main className="mx-auto max-w-5xl space-y-6 px-4 py-8">
        <Card>
          <CardHeader><CardTitle>Add Budget</CardTitle></CardHeader>
          <CardContent>
            <form className="grid gap-3 md:grid-cols-5" onSubmit={submitBudget}>
              <Input type="number" placeholder="Category ID" value={form.categoryId} onChange={(e) => setForm((prev) => ({ ...prev, categoryId: e.target.value }))} />
              <Input type="number" placeholder="Limit" value={form.monthlyLimit} onChange={(e) => setForm((prev) => ({ ...prev, monthlyLimit: e.target.value }))} />
              <Input type="number" placeholder="Month" value={form.month} onChange={(e) => setForm((prev) => ({ ...prev, month: e.target.value }))} />
              <Input type="number" placeholder="Year" value={form.year} onChange={(e) => setForm((prev) => ({ ...prev, year: e.target.value }))} />
              <Button type="submit">Save</Button>
            </form>
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Budgets</CardTitle></CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {budgets.map((budget) => (
                <li key={budget.id} className="flex justify-between border-b pb-2 text-sm">
                  <span>{budget.categoryName} ({budget.month}/{budget.year})</span>
                  <span>${budget.monthlyLimit.toFixed(2)}</span>
                </li>
              ))}
              {!budgets.length && <li>No budgets yet.</li>}
            </ul>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
