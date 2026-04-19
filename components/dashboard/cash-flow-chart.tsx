"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Legend } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { month: "Jun", income: 31000, expenses: 28000 },
  { month: "Jul", income: 28000, expenses: 26000 },
  { month: "Aug", income: 32000, expenses: 29000 },
  { month: "Sep", income: 25000, expenses: 24000 },
  { month: "Oct", income: 42000, expenses: 30000 },
  { month: "Nov", income: 48000, expenses: 35000 },
]

const chartConfig = {
  income: {
    label: "Income",
    color: "#0d9488",
  },
  expenses: {
    label: "Expenses",
    color: "#94a3b8",
  },
}

export function CashFlowChart() {
  return (
    <Card className="border border-border">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-foreground">Cash Flow</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0d9488" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#0d9488" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="expensesGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#94a3b8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#64748b", fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#64748b", fontSize: 12 }}
                tickFormatter={(value) => `${value / 1000}k`}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend
                verticalAlign="top"
                align="right"
                iconType="square"
                wrapperStyle={{ paddingBottom: 20 }}
              />
              <Area
                type="monotone"
                dataKey="income"
                stroke="#0d9488"
                strokeWidth={2}
                fill="url(#incomeGradient)"
                name="Income"
              />
              <Area
                type="monotone"
                dataKey="expenses"
                stroke="#94a3b8"
                strokeWidth={2}
                fill="url(#expensesGradient)"
                name="Expenses"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
