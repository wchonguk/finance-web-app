import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Mail, Trash2 } from "lucide-react"

const activities = [
  {
    icon: Check,
    iconBg: "bg-teal-100",
    iconColor: "text-teal-600",
    user: "Jane",
    action: "marked",
    target: "INV-2023-",
    result: "as paid.",
    time: "2 hours",
  },
  {
    icon: Mail,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    user: "Invoice sent",
    action: "",
    target: "Cyberdyne",
    result: ".",
    time: "5 hours",
  },
  {
    icon: Trash2,
    iconBg: "bg-red-100",
    iconColor: "text-red-500",
    user: 'Expense"Office',
    action: "",
    target: "",
    result: "deleted.",
    time: "Yesterday",
  },
]

export function RecentActivity() {
  return (
    <Card className="border border-border">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-foreground">Recent</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className={`rounded-md p-2 ${activity.iconBg}`}>
                <activity.icon className={`h-4 w-4 ${activity.iconColor}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground">
                  <span className="font-medium">{activity.user}</span>{" "}
                  {activity.action && <span>{activity.action}</span>}{" "}
                  {activity.target && <span className="font-medium">{activity.target}</span>}{" "}
                  <span>{activity.result}</span>
                </p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
