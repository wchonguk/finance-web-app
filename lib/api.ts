import { NextResponse } from "next/server"
import { ZodError } from "zod"
import { logError } from "@/lib/logger"

export function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
}

export function badRequest(error: ZodError) {
  return NextResponse.json(
    {
      error: "Invalid request",
      details: error.flatten(),
    },
    { status: 400 },
  )
}

export function handleApiError(context: string, error: unknown) {
  logError(context, error)
  return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
}
