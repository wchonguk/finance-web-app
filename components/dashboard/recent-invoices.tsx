import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye, FileEdit, Mail, Trash2 } from "lucide-react"

const invoices = [
  {
    id: "INV-2023-001",
    client: "Acme Corp",
    amount: "$4,500.0",
    dueDate: "Oct 24,",
    status: "Paid",
    icon: Eye,
  },
  {
    id: "INV-2023-002",
    client: "Globex Inc.",
    amount: "$1,200.00",
    dueDate: "Oct 28,",
    status: "Pending",
    icon: FileEdit,
  },
  {
    id: "INV-2023-003",
    client: "Stark",
    amount: "$8,900.0",
    dueDate: "Oct 15, 2023",
    status: "Overdue",
    icon: Mail,
  },
  {
    id: "INV-2023-004",
    client: "Wayne",
    amount: "$2,340.5",
    dueDate: "Nov 02,",
    status: "Draft",
    icon: Trash2,
  },
]

const statusStyles: Record<string, string> = {
  Paid: "bg-teal-50 text-teal-600 hover:bg-teal-50",
  Pending: "bg-orange-50 text-orange-500 hover:bg-orange-50",
  Overdue: "bg-red-50 text-red-500 hover:bg-red-50",
  Draft: "bg-slate-100 text-slate-500 hover:bg-slate-100",
}

export function RecentInvoices() {
  return (
    <Card className="border border-border">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold text-foreground">Recent</CardTitle>
        <button className="text-sm text-muted-foreground hover:text-foreground">View</button>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="pl-6 text-muted-foreground font-normal">Invoice #</TableHead>
              <TableHead className="text-muted-foreground font-normal">Client</TableHead>
              <TableHead className="text-muted-foreground font-normal">Amount</TableHead>
              <TableHead className="text-muted-foreground font-normal">Due Date</TableHead>
              <TableHead className="text-muted-foreground font-normal">Status</TableHead>
              <TableHead className="pr-6 text-muted-foreground font-normal">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.id} className="hover:bg-muted/50">
                <TableCell className="pl-6 font-medium text-foreground">{invoice.id}</TableCell>
                <TableCell className="text-foreground">{invoice.client}</TableCell>
                <TableCell className="text-foreground">{invoice.amount}</TableCell>
                <TableCell className="text-foreground">{invoice.dueDate}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className={statusStyles[invoice.status]}>
                    {invoice.status}
                  </Badge>
                </TableCell>
                <TableCell className="pr-6">
                  <button className="text-muted-foreground hover:text-foreground">
                    <invoice.icon className="h-4 w-4" />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
