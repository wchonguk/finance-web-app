import { getDbPool, sql } from "@/lib/db"

export async function getDashboardSummary(userId: number) {
  const pool = await getDbPool()
  const result = await pool.request().input("UserId", sql.Int, userId).query(`
    SELECT
      SUM(CASE WHEN Type = 'income' THEN Amount ELSE 0 END) AS TotalIncome,
      SUM(CASE WHEN Type = 'expense' THEN Amount ELSE 0 END) AS TotalExpenses,
      COUNT(*) AS TransactionCount
    FROM dbo.Transactions
    WHERE UserId = @UserId
      AND YEAR(TransactionDate) = YEAR(GETUTCDATE())
      AND MONTH(TransactionDate) = MONTH(GETUTCDATE());

    SELECT TOP 5 Description, Amount, Type, TransactionDate
    FROM dbo.Transactions
    WHERE UserId = @UserId
    ORDER BY TransactionDate DESC;
  `)

  const totals = result.recordsets[0][0]
  const recent = result.recordsets[1].map((row) => ({
    description: row.Description as string,
    amount: Number(row.Amount),
    type: row.Type as "income" | "expense",
    transactionDate: row.TransactionDate as string,
  }))

  return {
    totalIncome: Number(totals?.TotalIncome ?? 0),
    totalExpenses: Number(totals?.TotalExpenses ?? 0),
    transactionCount: totals?.TransactionCount ?? 0,
    net: Number(totals?.TotalIncome ?? 0) - Number(totals?.TotalExpenses ?? 0),
    recent,
  }
}
