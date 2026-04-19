import { NextResponse } from "next/server"
import { ZodError } from "zod"
import { requireUser } from "@/lib/auth-helpers"
import { badRequest, handleApiError, unauthorized } from "@/lib/api"
import { budgetInputSchema } from "@/lib/validation"
import { createBudget, listBudgets } from "@/lib/repositories/budgets-repository"
import { ensureUser } from "@/lib/repositories/users-repository"

export async function GET() {
  try {
    const user = await requireUser()
    if (!user) return unauthorized()

    const dbUserId = await ensureUser(user.id, user.email, user.name)
    const data = await listBudgets(dbUserId)
    return NextResponse.json(data)
  } catch (error) {
    return handleApiError("api.budgets.GET", error)
  }
}

export async function POST(request: Request) {
  try {
    const user = await requireUser()
    if (!user) return unauthorized()

    const body = await request.json()
    const parsed = budgetInputSchema.parse(body)
    const dbUserId = await ensureUser(user.id, user.email, user.name)
    await createBudget(dbUserId, parsed)

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (error) {
    if (error instanceof ZodError) {
      return badRequest(error)
    }

    return handleApiError("api.budgets.POST", error)
  }
}
