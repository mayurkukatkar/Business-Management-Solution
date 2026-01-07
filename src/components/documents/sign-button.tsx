'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { verifyDocumentOtp, sendDocumentOtp } from "@/actions/document-actions"

export function SignDocumentButton({ docId }: { docId: string }) {
    const [open, setOpen] = useState(false);
    const [step, setStep] = useState<'INIT' | 'OTP'>('INIT');
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSendOtp = async () => {
        setLoading(true);
        const res = await sendDocumentOtp(docId); // Auto-import this
        setLoading(false);
        if (res.success) {
            alert('OTP sent to your registered email!');
            setStep('OTP');
        } else {
            alert(res.message || 'Failed to send OTP');
        }
    }

    const handleVerifyParams = async () => {
        setLoading(true);
        const res = await verifyDocumentOtp(docId, otp);
        setLoading(false);
        if (res.success) {
            alert('Document Signed Successfully!');
            setOpen(false);
            window.location.reload();
        } else {
            alert('Invalid OTP');
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Sign Document</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>E-Signature</DialogTitle>
                    <DialogDescription>
                        {step === 'INIT'
                            ? "We will send a One-Time Password (OTP) to your registered mobile number."
                            : "Enter the 6-digit OTP sent to your mobile."}
                    </DialogDescription>
                </DialogHeader>

                {step === 'INIT' ? (
                    <DialogFooter>
                        <Button onClick={handleSendOtp} disabled={loading}>
                            {loading ? 'Sending...' : 'Send OTP'}
                        </Button>
                    </DialogFooter>
                ) : (
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="otp" className="text-right">OTP</Label>
                            <Input id="otp" value={otp} onChange={(e) => setOtp(e.target.value)} className="col-span-3" />
                        </div>
                        <DialogFooter>
                            <Button onClick={handleVerifyParams} disabled={loading}>
                                {loading ? 'Verifying...' : 'Verify & Sign'}
                            </Button>
                        </DialogFooter>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}
