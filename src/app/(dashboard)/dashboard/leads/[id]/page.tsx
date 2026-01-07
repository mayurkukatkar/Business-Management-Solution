import { auth } from "@/lib/auth"
import connectToDatabase from "@/lib/db"
import Lead from "@/models/Lead"
import { notFound } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Phone, Mail, Building, Clock, ArrowLeft } from "lucide-react"
import Link from "next/link"

async function getLead(id: string) {
    await connectToDatabase();
    const session = await auth();
    if (!session) return null;

    try {
        const lead = await Lead.findById(id);
        return lead ? JSON.parse(JSON.stringify(lead)) : null;
    } catch (error) {
        return null;
    }
}

export default async function LeadDetailsPage({ params }: { params: { id: string } }) {
    const { id } = params;
    // In Next.js 15, params is async? Or not yet? 
    // Assuming standard Next 14/15 behavior where component is async.

    const lead = await getLead(id);

    if (!lead) {
        notFound();
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
                <Link href="/dashboard/leads">
                    <Button variant="outline" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <h1 className="text-xl font-semibold tracking-tight">{lead.name}</h1>
                <Badge variant={lead.status === 'CONVERTED' ? 'default' : 'secondary'}>
                    {lead.status}
                </Badge>
                <div className="ml-auto flex items-center gap-2">
                    <Button>Create Quote</Button>
                    <Button variant="outline">Edit</Button>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <div className="flex flex-col gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Contact Details</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                            <div className="flex items-center gap-2">
                                <Building className="h-4 w-4 text-muted-foreground" />
                                <span>{lead.company}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-muted-foreground" />
                                <span>{lead.phone}</span>
                            </div>
                            {lead.email && (
                                <div className="flex items-center gap-2">
                                    <Mail className="h-4 w-4 text-muted-foreground" />
                                    <span>{lead.email}</span>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Notes</CardTitle>
                            <CardDescription>Internal team notes.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {lead.notes && lead.notes.length > 0 ? (
                                <div className="flex flex-col gap-4">
                                    {lead.notes.map((note: any, i: number) => (
                                        <div key={i} className="flex flex-col gap-1 border-b pb-2 last:border-0">
                                            <p className="text-sm">{note.content}</p>
                                            <span className="text-xs text-muted-foreground">{new Date(note.createdAt).toLocaleDateString()}</span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-muted-foreground">No notes added.</p>
                            )}
                            <div className="mt-4">
                                <Button variant="ghost" size="sm" className="w-full">Add Note</Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="flex flex-col gap-6">
                    <Card className="h-full">
                        <CardHeader>
                            <CardTitle>Activity Timeline</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col gap-4">
                                <div className="flex gap-4">
                                    <span className="relative flex h-2 w-2 items-center justify-center rounded-full bg-sky-500 mt-2"></span>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium">Lead Created</span>
                                        <span className="text-xs text-muted-foreground">{new Date(lead.createdAt).toLocaleString()}</span>
                                    </div>
                                </div>
                                {/* Placeholder for future timeline items */}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
