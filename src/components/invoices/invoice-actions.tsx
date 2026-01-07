'use client';

import { Button } from "@/components/ui/button"
import { Eye, Download } from "lucide-react"
import Link from "next/link"
import { PDFDownloadLink } from '@react-pdf/renderer';
import { InvoicePDF } from "@/components/pdf/invoice-pdf";
import { useEffect, useState } from "react";

export function InvoiceActions({ doc }: { doc: any }) {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <div className="flex items-center justify-end gap-2">
            <Link href={`/p/documents/${doc._id}`} target="_blank">
                <Button variant="ghost" size="icon" title="View Public Link">
                    <Eye className="h-4 w-4" />
                </Button>
            </Link>

            {isClient ? (
                <PDFDownloadLink
                    document={<InvoicePDF data={doc} />}
                    fileName={`${doc.number || 'document'}.pdf`}
                >
                    {({ loading }) => (
                        // @ts-ignore
                        <Button variant="ghost" size="icon" disabled={loading} title="Download PDF">
                            <Download className="h-4 w-4" />
                        </Button>
                    )}
                </PDFDownloadLink>
            ) : (
                <Button variant="ghost" size="icon" disabled>
                    <Download className="h-4 w-4" />
                </Button>
            )}
        </div>
    )
}
