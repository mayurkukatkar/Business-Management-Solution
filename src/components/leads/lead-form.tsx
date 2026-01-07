'use client';

import { useActionState } from 'react';
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
import { useEffect } from 'react';

const initialState = {
    message: '',
    errors: {} as Record<string, string[]>,
};

export function LeadForm({ onSuccess }: { onSuccess: () => void }) {
    const [state, formAction, isPending] = useActionState(createLead, initialState);

    useEffect(() => {
        if (state?.message === 'Success') {
            onSuccess();
        }
    }, [state, onSuccess]);

    return (
        <form action={formAction} className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                    Name
                </Label>
                <div className="col-span-3">
                    <Input id="name" name="name" className="col-span-3" required />
                    {state?.errors?.name && (
                        <p className="text-xs text-red-500">{state.errors.name.join(', ')}</p>
                    )}
                </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="company" className="text-right">
                    Company
                </Label>
                <div className="col-span-3">
                    <Input id="company" name="company" className="col-span-3" required />
                    {state?.errors?.company && (
                        <p className="text-xs text-red-500">{state.errors.company.join(', ')}</p>
                    )}
                </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                    Email
                </Label>
                <div className="col-span-3">
                    <Input id="email" name="email" type="email" className="col-span-3" />
                    {state?.errors?.email && (
                        <p className="text-xs text-red-500">{state.errors.email.join(', ')}</p>
                    )}
                </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                    Phone
                </Label>
                <div className="col-span-3">
                    <Input id="phone" name="phone" type="tel" className="col-span-3" required />
                    {state?.errors?.phone && (
                        <p className="text-xs text-red-500">{state.errors.phone.join(', ')}</p>
                    )}
                </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                    Status
                </Label>
                <div className="col-span-3">
                    <Select name="status" defaultValue="NEW">
                        <SelectTrigger>
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
            {state?.message && state.message !== 'Success' && (
                <div className="grid grid-cols-4 items-center gap-4">
                    <div className="col-start-2 col-span-3">
                        <p className="text-sm text-red-500">{state.message}</p>
                    </div>
                </div>
            )}
            <div className="flex justify-end">
                <Button type="submit" disabled={isPending}>
                    {isPending ? 'Saving...' : 'Save Lead'}
                </Button>
            </div>
        </form>
    );
}
