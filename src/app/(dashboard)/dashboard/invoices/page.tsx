import { Button } from "@/components/ui/button"
import { PlusCircle, FileText } from "lucide-react"
import Link from "next/link"
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
import { Badge } from "@/components/ui/badge"
import { getDocuments } from "@/actions/document-actions"
import { InvoiceActions } from "@/components/invoices/invoice-actions"

export default async function DocumentsPage() {
    const documents = await getDocuments();

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold md:text-2xl">Documents</h1>
                <Link href="/dashboard/invoices/create">
                    <Button size="sm" className="gap-1">
                        <PlusCircle className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                            Create New
                        </span>
                    </Button>
                </Link>
            </div>

            <Card>
                <CardHeader className="px-7">
                    <CardTitle>Recent Documents</CardTitle>
                    <CardDescription>
                        Quotations and Invoices generated for clients.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Number</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead className="hidden sm:table-cell">Client</TableHead>
                                <TableHead className="hidden md:table-cell">Date</TableHead>
                                <TableHead className="text-right">Amount</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {documents.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center h-48 text-muted-foreground">
                                        <div className="flex flex-col items-center gap-1">
                                            <FileText className="h-8 w-8 mb-2" />
                                            <p>No documents found.</p>
                                            <Link href="/dashboard/invoices/create" className="text-primary hover:underline">
                                                Create your first one
                                            </Link>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                documents.map((doc: any) => (
                                    <TableRow key={doc._id}>
                                        <TableCell className="font-medium">{doc.number}</TableCell>
                                        <TableCell>
                                            <Badge variant={doc.type === 'INVOICE' ? 'default' : 'outline'}>
                                                {doc.type}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="hidden sm:table-cell">
                                            {doc.relatedLead?.name}
                                            <div className="text-xs text-muted-foreground">{doc.relatedLead?.company}</div>
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            {new Date(doc.issuedDate).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell className="text-right font-medium">
                                            ₹{doc.totalAmount.toFixed(2)}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <InvoiceActions doc={doc} />
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
