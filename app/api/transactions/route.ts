import { NextResponse } from "next/server"
import { ZodError } from "zod"
import { requireUser } from "@/lib/auth-helpers"
import { badRequest, handleApiError, unauthorized } from "@/lib/api"
import { ensureUser } from "@/lib/repositories/users-repository"
import { createTransaction, listTransactions } from "@/lib/repositories/transactions-repository"
import { transactionInputSchema } from "@/lib/validation"

export async function GET() {
  try {
    const user = await requireUser()
    if (!user) return unauthorized()

    const dbUserId = await ensureUser(user.id, user.email, user.name)
    const data = await listTransactions(dbUserId)
    return NextResponse.json(data)
  } catch (error) {
    return handleApiError("api.transactions.GET", error)
  }
}

export async function POST(request: Request) {
  try {
    const user = await requireUser()
    if (!user) return unauthorized()

    const body = await request.json()
    const parsed = transactionInputSchema.parse(body)
    const dbUserId = await ensureUser(user.id, user.email, user.name)

    await createTransaction(dbUserId, parsed)
    return NextResponse.json({ success: true }, { status: 201 })
  } catch (error) {
    if (error instanceof ZodError) {
      return badRequest(error)
    }

    return handleApiError("api.transactions.POST", error)
  }
}
