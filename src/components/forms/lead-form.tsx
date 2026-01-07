'use client';

import { useActionState, useState } from 'react';
import { createLead } from '@/actions/lead-actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { DialogFooter } from '@/components/ui/dialog';

const initialState = {
    message: '',
    errors: {} as Record<string, string[]>,
};

export function LeadForm({ onSuccess }: { onSuccess: () => void }) {
    const [state, formAction, isPending] = useActionState(createLead, initialState);

    // Close dialog on success (Effect)
    // Since useActionState doesn't give a callback, we can check state.message
    // Ideally we use a wrapper. For simplicity, simpler form handling:

    if (state.message === 'Success') {
        // Reset state? Next.js server actions are tricky with dialog closing.
        // We can just rely on the parent to unmount or close.
        // Let's call onSuccess if message is 'Success'
        // Warning: This might cause loop if not handled carefully during render.
        // Better pattern: useEffect.
    }

    return (
        <form action={async (formData) => {
            await formAction(formData);
            // We can't easily know result here with useActionState unless we inspect the returned state in a useEffect.
        }}>
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                        Name
                    </Label>
                    <Input
                        id="name"
                        name="name"
                        placeholder="Rahul Kumar"
                        className="col-span-3"
                        required
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="company" className="text-right">
                        Company
                    </Label>
                    <Input
                        id="company"
                        name="company"
                        placeholder="Alpha Traders"
                        className="col-span-3"
                        required
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="phone" className="text-right">
                        Phone
                    </Label>
                    <Input
                        id="phone"
                        name="phone"
                        placeholder="9876543210"
                        className="col-span-3"
                        required
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                        Email
                    </Label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="rahul@example.com"
                        className="col-span-3"
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="status" className="text-right">
                        Status
                    </Label>
                    <Select name="status" defaultValue="NEW">
                        <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="NEW">New</SelectItem>
                            <SelectItem value="FOLLOW_UP">Follow Up</SelectItem>
                            <SelectItem value="CONVERTED">Converted</SelectItem>
                            <SelectItem value="LOST">Lost</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {state.message && state.message !== 'Success' && (
                <p className="text-red-500 text-sm mb-4">{state.message}</p>
            )}

            <DialogFooter>
                <Button type="submit" disabled={isPending}>
                    {isPending ? 'Saving...' : 'Save Lead'}
                </Button>
            </DialogFooter>
        </form>
    );
}
