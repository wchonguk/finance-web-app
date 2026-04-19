import { NextResponse } from "next/server"
import { ZodError } from "zod"
import { requireUser } from "@/lib/auth-helpers"
import { badRequest, handleApiError, unauthorized } from "@/lib/api"
import { ensureUser } from "@/lib/repositories/users-repository"
import { deleteTransaction, updateTransaction } from "@/lib/repositories/transactions-repository"
import { transactionInputSchema } from "@/lib/validation"

function parseId(id: string) {
  const value = Number(id)
  return Number.isFinite(value) ? value : null
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await requireUser()
    if (!user) return unauthorized()

    const { id } = await params
    const transactionId = parseId(id)
    if (!transactionId) {
      return NextResponse.json({ error: "Invalid transaction id" }, { status: 400 })
    }

    const body = await request.json()
    const parsed = transactionInputSchema.parse(body)
    const dbUserId = await ensureUser(user.id, user.email, user.name)

    const rowsAffected = await updateTransaction(dbUserId, transactionId, parsed)
    if (!rowsAffected) {
      return NextResponse.json({ error: "Transaction not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    if (error instanceof ZodError) {
      return badRequest(error)
    }

    return handleApiError("api.transactions.PATCH", error)
  }
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await requireUser()
    if (!user) return unauthorized()

    const { id } = await params
    const transactionId = parseId(id)
    if (!transactionId) {
      return NextResponse.json({ error: "Invalid transaction id" }, { status: 400 })
    }

    const dbUserId = await ensureUser(user.id, user.email, user.name)
    const rowsAffected = await deleteTransaction(dbUserId, transactionId)
    if (!rowsAffected) {
      return NextResponse.json({ error: "Transaction not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return handleApiError("api.transactions.DELETE", error)
  }
}
