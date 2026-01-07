import { Badge } from "@/components/ui/badge"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { getLeads } from "@/actions/lead-actions"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { AddLeadDialog } from "@/components/leads/add-lead-dialog"

export default async function LeadsPage() {
    const leads = await getLeads();

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold md:text-2xl">Leads</h1>
                <AddLeadDialog />
            </div>
            <Card>
                <CardHeader className="px-7">
                    <CardTitle>Recent Leads</CardTitle>
                    <CardDescription>
                        Manage your leads and view their status.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Customer</TableHead>
                                <TableHead className="hidden sm:table-cell">Company</TableHead>
                                <TableHead className="hidden sm:table-cell">Status</TableHead>
                                <TableHead className="hidden md:table-cell">Phone</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {leads.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center h-24 text-muted-foreground">
                                        No leads found. Click "Add Lead" to create one.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                leads.map((lead: any) => (
                                    <TableRow key={lead._id}>
                                        <TableCell>
                                            <div className="font-medium">{lead.name}</div>
                                            <div className="hidden text-sm text-muted-foreground md:inline">
                                                {lead.email}
                                            </div>
                                        </TableCell>
                                        <TableCell className="hidden sm:table-cell">
                                            {lead.company}
                                        </TableCell>
                                        <TableCell className="hidden sm:table-cell">
                                            <Badge className="text-xs" variant={lead.status === 'CONVERTED' ? 'secondary' : 'outline'}>
                                                {lead.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            {lead.phone}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="ghost" size="sm">View</Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
