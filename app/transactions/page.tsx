"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/dashboard/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type Transaction = {
  id: number
  amount: number
  description: string
  type: "income" | "expense"
  transactionDate: string
  categoryName: string
  categoryId: number
}

const initialForm = {
  amount: "",
  description: "",
  type: "expense",
  categoryId: "1",
  transactionDate: new Date().toISOString().slice(0, 16),
}

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [form, setForm] = useState(initialForm)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  async function loadTransactions() {
    setLoading(true)
    setError(null)
    const response = await fetch("/api/transactions")
    if (!response.ok) {
      setError("Could not load transactions")
      setLoading(false)
      return
    }

    const data = (await response.json()) as Transaction[]
    setTransactions(data)
    setLoading(false)
  }

  useEffect(() => {
    loadTransactions().catch(() => {
      setError("Could not load transactions")
      setLoading(false)
    })
  }, [])

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)

    const response = await fetch("/api/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: Number(form.amount),
        description: form.description,
        type: form.type,
        categoryId: Number(form.categoryId),
        transactionDate: new Date(form.transactionDate).toISOString(),
      }),
    })

    if (!response.ok) {
      setError("Could not save transaction")
      return
    }

    setForm(initialForm)
    await loadTransactions()
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header userName="User" />
      <main className="mx-auto max-w-5xl space-y-6 px-4 py-8">
        <Card>
          <CardHeader><CardTitle>Add Transaction</CardTitle></CardHeader>
          <CardContent>
            <form className="grid gap-3 md:grid-cols-5" onSubmit={onSubmit}>
              <Input placeholder="Description" value={form.description} onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))} />
              <Input placeholder="Amount" type="number" value={form.amount} onChange={(e) => setForm((prev) => ({ ...prev, amount: e.target.value }))} />
              <Input placeholder="Category ID" type="number" value={form.categoryId} onChange={(e) => setForm((prev) => ({ ...prev, categoryId: e.target.value }))} />
              <Input type="datetime-local" value={form.transactionDate} onChange={(e) => setForm((prev) => ({ ...prev, transactionDate: e.target.value }))} />
              <Button type="submit">Save</Button>
            </form>
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Transactions</CardTitle></CardHeader>
          <CardContent>
            {loading && <p>Loading...</p>}
            {!loading && !transactions.length && <p>No transactions yet.</p>}
            <ul className="space-y-2">
              {transactions.map((txn) => (
                <li key={txn.id} className="flex justify-between border-b pb-2 text-sm">
                  <span>{txn.description} ({txn.categoryName})</span>
                  <span>{txn.type === "expense" ? "-" : "+"}${txn.amount.toFixed(2)}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
