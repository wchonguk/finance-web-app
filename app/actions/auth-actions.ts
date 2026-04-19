"use server"

import { signIn } from "@/auth"

export async function loginAction() {
  await signIn("microsoft-entra-id", { redirectTo: "/" })
}
