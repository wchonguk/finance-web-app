import { NextResponse } from "next/server"
import { ZodError } from "zod"
import { getDbPool, sql } from "@/lib/db"
import { requireUser } from "@/lib/auth-helpers"
import { badRequest, handleApiError, unauthorized } from "@/lib/api"
import { ensureUser } from "@/lib/repositories/users-repository"
import { budgetInputSchema } from "@/lib/validation"

function parseId(id: string) {
  const value = Number(id)
  return Number.isFinite(value) ? value : null
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await requireUser()
    if (!user) return unauthorized()

    const { id } = await params
    const budgetId = parseId(id)
    if (!budgetId) {
      return NextResponse.json({ error: "Invalid budget id" }, { status: 400 })
    }

    const body = await request.json()
    const parsed = budgetInputSchema.parse(body)
    const dbUserId = await ensureUser(user.id, user.email, user.name)

    const pool = await getDbPool()
    const result = await pool
      .request()
      .input("BudgetId", sql.Int, budgetId)
      .input("UserId", sql.Int, dbUserId)
      .input("CategoryId", sql.Int, parsed.categoryId)
      .input("MonthlyLimit", sql.Decimal(18, 2), parsed.monthlyLimit)
      .input("Month", sql.Int, parsed.month)
      .input("Year", sql.Int, parsed.year)
      .query(`
        UPDATE dbo.Budgets
        SET CategoryId = @CategoryId,
            MonthlyLimit = @MonthlyLimit,
            Month = @Month,
            Year = @Year,
            UpdatedAt = SYSUTCDATETIME()
        WHERE Id = @BudgetId AND UserId = @UserId;
      `)

    if (!(result.rowsAffected[0] ?? 0)) {
      return NextResponse.json({ error: "Budget not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    if (error instanceof ZodError) return badRequest(error)
    return handleApiError("api.budgets.PATCH", error)
  }
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await requireUser()
    if (!user) return unauthorized()

    const { id } = await params
    const budgetId = parseId(id)
    if (!budgetId) {
      return NextResponse.json({ error: "Invalid budget id" }, { status: 400 })
    }

    const dbUserId = await ensureUser(user.id, user.email, user.name)
    const pool = await getDbPool()
    const result = await pool
      .request()
      .input("BudgetId", sql.Int, budgetId)
      .input("UserId", sql.Int, dbUserId)
      .query("DELETE FROM dbo.Budgets WHERE Id = @BudgetId AND UserId = @UserId")

    if (!(result.rowsAffected[0] ?? 0)) {
      return NextResponse.json({ error: "Budget not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return handleApiError("api.budgets.DELETE", error)
  }
}
