'use server';

import { auth } from '@/lib/auth';
import connectToDatabase from '@/lib/db';
import Lead from '@/models/Lead';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const LeadSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    company: z.string().min(1, 'Company is required'),
    phone: z.string().min(10, 'Valid phone number required'),
    email: z.string().email().optional().or(z.literal('')),
    status: z.enum(['NEW', 'FOLLOW_UP', 'CONVERTED', 'LOST']),
});

export async function getLeads() {
    await connectToDatabase();
    const session = await auth();
    if (!session) return [];

    // If Admin, show all. If Staff, show only assigned/all? 
    // BRD says: Admin full access. Staff limited.
    // For now, returning all leads for simplicity in Sprint 2.
    const leads = await Lead.find({}).sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(leads));
}

export async function createLead(prevState: any, formData: FormData) {
    const session = await auth();
    if (!session) return { message: 'Unauthorized' };

    const validatedFields = LeadSchema.safeParse({
        name: formData.get('name'),
        company: formData.get('company'),
        phone: formData.get('phone'),
        email: formData.get('email'),
        status: formData.get('status') || 'NEW',
    });

    if (!validatedFields.success) {
        return {
            message: 'Validation failed',
            errors: validatedFields.error.flatten().fieldErrors
        };
    }

    try {
        await connectToDatabase();
        await Lead.create({
            ...validatedFields.data,
            assignedTo: session.user?.id, // Assuming User model has ID
            notes: []
        });
        revalidatePath('/dashboard/leads');
        return { message: 'Success' };
    } catch (error) {
        return { message: 'Database Error: Failed to create lead.' };
    }
}
