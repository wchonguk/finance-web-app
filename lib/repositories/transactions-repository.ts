import { getDbPool, sql } from "@/lib/db"

export type TransactionRecord = {
  id: number
  amount: number
  description: string
  type: "income" | "expense"
  transactionDate: string
  categoryId: number
  categoryName: string
}

export async function listTransactions(userId: number): Promise<TransactionRecord[]> {
  const pool = await getDbPool()
  const result = await pool.request().input("UserId", sql.Int, userId).query(`
    SELECT t.Id, t.Amount, t.Description, t.Type, t.TransactionDate, t.CategoryId, c.Name AS CategoryName
    FROM dbo.Transactions t
    INNER JOIN dbo.Categories c ON c.Id = t.CategoryId
    WHERE t.UserId = @UserId
    ORDER BY t.TransactionDate DESC;
  `)

  return result.recordset.map((row) => ({
    id: row.Id,
    amount: Number(row.Amount),
    description: row.Description,
    type: row.Type,
    transactionDate: row.TransactionDate,
    categoryId: row.CategoryId,
    categoryName: row.CategoryName,
  }))
}

export async function createTransaction(
  userId: number,
  input: { amount: number; description: string; type: "income" | "expense"; transactionDate: string; categoryId: number },
) {
  const pool = await getDbPool()
  await pool
    .request()
    .input("UserId", sql.Int, userId)
    .input("Amount", sql.Decimal(18, 2), input.amount)
    .input("Description", sql.NVarChar(255), input.description)
    .input("Type", sql.NVarChar(20), input.type)
    .input("TransactionDate", sql.DateTime2, new Date(input.transactionDate))
    .input("CategoryId", sql.Int, input.categoryId)
    .query(`
      INSERT INTO dbo.Transactions (UserId, Amount, Description, Type, TransactionDate, CategoryId)
      VALUES (@UserId, @Amount, @Description, @Type, @TransactionDate, @CategoryId);
    `)
}

export async function updateTransaction(
  userId: number,
  transactionId: number,
  input: { amount: number; description: string; type: "income" | "expense"; transactionDate: string; categoryId: number },
) {
  const pool = await getDbPool()
  const result = await pool
    .request()
    .input("UserId", sql.Int, userId)
    .input("TransactionId", sql.Int, transactionId)
    .input("Amount", sql.Decimal(18, 2), input.amount)
    .input("Description", sql.NVarChar(255), input.description)
    .input("Type", sql.NVarChar(20), input.type)
    .input("TransactionDate", sql.DateTime2, new Date(input.transactionDate))
    .input("CategoryId", sql.Int, input.categoryId)
    .query(`
      UPDATE dbo.Transactions
      SET Amount = @Amount,
          Description = @Description,
          Type = @Type,
          TransactionDate = @TransactionDate,
          CategoryId = @CategoryId,
          UpdatedAt = SYSUTCDATETIME()
      WHERE Id = @TransactionId AND UserId = @UserId;
    `)

  return result.rowsAffected[0] ?? 0
}

export async function deleteTransaction(userId: number, transactionId: number) {
  const pool = await getDbPool()
  const result = await pool
    .request()
    .input("UserId", sql.Int, userId)
    .input("TransactionId", sql.Int, transactionId)
    .query("DELETE FROM dbo.Transactions WHERE Id = @TransactionId AND UserId = @UserId")

  return result.rowsAffected[0] ?? 0
}
