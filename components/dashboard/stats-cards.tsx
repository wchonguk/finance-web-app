import { Card, CardContent } from "@/components/ui/card"
import { ArrowUp } from "lucide-react"

const stats = [
  {
    label: "Total Revenue (MTD)",
    value: "$42,500.0",
    change: "+12.5% vs last",
    changeType: "positive" as const,
  },
  {
    label: "Outstanding Invoices",
    value: "$12,840.5",
    link: "8 invoices",
    changeType: "link" as const,
  },
  {
    label: "Expenses (MTD)",
    value: "$8,210.0",
    change: "+4.2%",
    changeType: "positive" as const,
  },
  {
    label: "Net Profit",
    value: "$34,290.0",
    change: "Healthy",
    changeType: "healthy" as const,
  },
]

export function StatsCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="border border-border">
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p className="mt-1 text-2xl font-semibold text-foreground">{stat.value}</p>
            {stat.changeType === "positive" && (
              <div className="mt-1 flex items-center gap-1 text-sm text-teal-600">
                <ArrowUp className="h-3 w-3" />
                <span>{stat.change}</span>
              </div>
            )}
            {stat.changeType === "link" && (
              <p className="mt-1 text-sm text-orange-500 hover:underline cursor-pointer">
                {stat.link}
              </p>
            )}
            {stat.changeType === "healthy" && (
              <p className="mt-1 text-sm text-teal-600">{stat.change}</p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
