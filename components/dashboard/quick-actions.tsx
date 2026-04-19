import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, UserPlus, Calculator, Settings } from "lucide-react"

const actions = [
  { name: "Upload", icon: Upload },
  { name: "Add", icon: UserPlus },
  { name: "Tax", icon: Calculator },
  { name: "Setting", icon: Settings },
]

export function QuickActions() {
  return (
    <Card className="border border-border">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-foreground">Quick</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {actions.map((action) => (
            <button
              key={action.name}
              className="flex flex-col items-center justify-center gap-2 rounded-lg border border-border bg-background p-4 transition-colors hover:bg-muted"
            >
              <action.icon className="h-5 w-5 text-foreground" />
              <span className="text-sm text-foreground">{action.name}</span>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
