"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts"

const data = [
  { name: "Rent", value: 35, color: "#1e293b" },
  { name: "Salaries", value: 30, color: "#475569" },
  { name: "Software", value: 15, color: "#94a3b8" },
  { name: "Marketing", value: 12, color: "#cbd5e1" },
  { name: "Other", value: 8, color: "#e2e8f0" },
]

export function ExpenseChart() {
  return (
    <Card className="border border-border">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-foreground">Expense</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-x-4 gap-y-1 mb-2">
          {data.map((entry) => (
            <div key={entry.name} className="flex items-center gap-2">
              <div
                className="h-3 w-3 rounded-sm"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-xs text-muted-foreground">{entry.name}</span>
            </div>
          ))}
        </div>
        <div className="h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
