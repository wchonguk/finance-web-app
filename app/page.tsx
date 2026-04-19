import { Header } from "@/components/dashboard/header"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { CashFlowChart } from "@/components/dashboard/cash-flow-chart"
import { ExpenseChart } from "@/components/dashboard/expense-chart"
import { RecentInvoices } from "@/components/dashboard/recent-invoices"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { Footer } from "@/components/dashboard/footer"
import { Button } from "@/components/ui/button"
import { Download, Plus } from "lucide-react"

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Title Section */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Financial Overview</h1>
            <p className="mt-1 text-muted-foreground">
              Welcome back, Jane Doe. Here is what&apos;s happening with LedgerFlow
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export Report
            </Button>
            <Button className="gap-2 bg-slate-900 hover:bg-slate-800">
              <Plus className="h-4 w-4" />
              Create Invoice
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <StatsCards />

        {/* Charts Section */}
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <CashFlowChart />
          </div>
          <div>
            <ExpenseChart />
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <RecentInvoices />
          </div>
          <div className="space-y-6">
            <QuickActions />
            <RecentActivity />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
