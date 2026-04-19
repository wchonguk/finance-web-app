import { NextResponse } from "next/server"
import { requireUser } from "@/lib/auth-helpers"
import { handleApiError, unauthorized } from "@/lib/api"
import { ensureUser } from "@/lib/repositories/users-repository"
import { getDashboardSummary } from "@/lib/services/dashboard-service"

export async function GET() {
  try {
    const user = await requireUser()
    if (!user) return unauthorized()

    const dbUserId = await ensureUser(user.id, user.email, user.name)
    const summary = await getDashboardSummary(dbUserId)

    return NextResponse.json(summary)
  } catch (error) {
    return handleApiError("api.dashboard.GET", error)
  }
}
