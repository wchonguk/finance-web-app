import { getDbPool, sql } from "@/lib/db"

export type BudgetRecord = {
  id: number
  monthlyLimit: number
  month: number
  year: number
  categoryId: number
  categoryName: string
}

export async function listBudgets(userId: number): Promise<BudgetRecord[]> {
  const pool = await getDbPool()
  const result = await pool.request().input("UserId", sql.Int, userId).query(`
    SELECT b.Id, b.MonthlyLimit, b.Month, b.Year, b.CategoryId, c.Name AS CategoryName
    FROM dbo.Budgets b
    INNER JOIN dbo.Categories c ON c.Id = b.CategoryId
    WHERE b.UserId = @UserId
    ORDER BY b.Year DESC, b.Month DESC;
  `)

  return result.recordset.map((row) => ({
    id: row.Id,
    monthlyLimit: Number(row.MonthlyLimit),
    month: row.Month,
    year: row.Year,
    categoryId: row.CategoryId,
    categoryName: row.CategoryName,
  }))
}

export async function createBudget(
  userId: number,
  input: { monthlyLimit: number; month: number; year: number; categoryId: number },
) {
  const pool = await getDbPool()
  await pool
    .request()
    .input("UserId", sql.Int, userId)
    .input("CategoryId", sql.Int, input.categoryId)
    .input("MonthlyLimit", sql.Decimal(18, 2), input.monthlyLimit)
    .input("Month", sql.Int, input.month)
    .input("Year", sql.Int, input.year)
    .query(`
      INSERT INTO dbo.Budgets (UserId, CategoryId, MonthlyLimit, Month, Year)
      VALUES (@UserId, @CategoryId, @MonthlyLimit, @Month, @Year);
    `)
}
