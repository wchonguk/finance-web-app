import { redirect } from "next/navigation"
import { Header } from "@/components/dashboard/header"
import { Footer } from "@/components/dashboard/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { auth } from "@/auth"
import { ensureUser } from "@/lib/repositories/users-repository"
import { getDashboardSummary } from "@/lib/services/dashboard-service"

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value)
}

export default async function DashboardPage() {
  const session = await auth()
  if (!session?.user?.id) {
    redirect("/login")
  }

  const dbUserId = await ensureUser(session.user.id, session.user.email ?? null, session.user.name ?? null)
  const summary = await getDashboardSummary(dbUserId)

  return (
    <div className="min-h-screen bg-slate-50">
      <Header userName={session.user.name ?? "User"} />
      <main className="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold">Financial Overview</h1>

        <div className="grid gap-4 md:grid-cols-4">
          <Card><CardHeader><CardTitle>Income (MTD)</CardTitle></CardHeader><CardContent>{formatCurrency(summary.totalIncome)}</CardContent></Card>
          <Card><CardHeader><CardTitle>Expenses (MTD)</CardTitle></CardHeader><CardContent>{formatCurrency(summary.totalExpenses)}</CardContent></Card>
          <Card><CardHeader><CardTitle>Net (MTD)</CardTitle></CardHeader><CardContent>{formatCurrency(summary.net)}</CardContent></Card>
          <Card><CardHeader><CardTitle>Transactions</CardTitle></CardHeader><CardContent>{summary.transactionCount}</CardContent></Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {summary.recent.map((item) => (
                <li key={`${item.description}-${item.transactionDate}`} className="flex items-center justify-between rounded-md border p-3">
                  <span>{item.description}</span>
                  <span className={item.type === "expense" ? "text-red-600" : "text-emerald-600"}>{formatCurrency(item.amount)}</span>
                </li>
              ))}
              {!summary.recent.length && <li className="text-muted-foreground">No transactions yet.</li>}
            </ul>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  )
}
