import { loginAction } from "@/app/actions/auth-actions"
import { Button } from "@/components/ui/button"

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50">
      <div className="w-full max-w-md rounded-lg border bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-semibold">Sign in to LedgerFlow</h1>
        <p className="mt-2 text-sm text-muted-foreground">Use your Microsoft Entra ID account.</p>
        <form action={loginAction} className="mt-6">
          <Button type="submit" className="w-full">
            Sign in with Microsoft
          </Button>
        </form>
      </div>
    </main>
  )
}
