import { getDocumentPublic } from "@/actions/document-actions" // Need to create this
import { notFound } from "next/navigation"
import { InvoicePDF } from "@/components/pdf/invoice-pdf"
import { PDFViewer } from "@react-pdf/renderer"
import { SignDocumentButton } from "@/components/documents/sign-button" // Client component
import { Card, CardContent } from "@/components/ui/card"

// Note: Ensure getDocumentPublic is secure (maybe separate from sensitive internal data)
// For MVP, we use the ID + verify checks.

export default async function PublicDocumentPage({ params }: { params: { id: string } }) {
    const doc = await getDocumentPublic(params.id);
    if (!doc) notFound();

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
            <div className="max-w-4xl w-full flex flex-col gap-6 px-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-gray-800">Review Document: {doc.number}</h1>
                    {doc.signature?.otpVerified ? (
                        <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full font-medium">
                            Signed by {doc.signature.signedBy}
                        </div>
                    ) : (
                        <SignDocumentButton docId={doc._id} />
                    )}
                </div>

                {/* Web PDF Viewer (Needs client side wrapper, creating dummy for now or use iframe if Blob) */}
                {/* Since @react-pdf/renderer is Node/React, for web viewing usually we use PDFDownloadLink or Blob */}
                {/* For simplicity in this demo, we'll just show the details in HTML re-rendered or a placeholder for PDF */}

                <Card>
                    <CardContent className="p-8 min-h-[600px] flex items-center justify-center bg-white shadow-sm">
                        {/* In a real app, embed the PDF here using <iframe src={blobUrl} /> */}
                        <div className="text-center">
                            <p className="text-muted-foreground mb-4">PDF Preview Loading...</p>
                            <p className="text-sm">For this demo, please imagine the PDF is rendered here.</p>
                            {/* We can technically render the PDF to a blob on client side using dynamic import. */}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
