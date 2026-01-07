'use server';

import { auth } from '@/lib/auth';
import connectToDatabase from '@/lib/db';
import Task from '@/models/Task';
import Lead from '@/models/Lead'; // Ensure Lead is registered
import { revalidatePath } from 'next/cache';

export async function getDashboardStats() {
    await connectToDatabase();
    // Count Leads
    const leadCount = await Lead.countDocuments({ status: 'NEW' });
    const followUpCount = await Lead.countDocuments({ status: 'FOLLOW_UP' });

    // Count Tasks due today or overdue
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const pendingTasks = await Task.countDocuments({
        status: 'PENDING',
        dueDate: { $lte: new Date(new Date().setHours(23, 59, 59, 999)) }
    });

    return {
        leads: leadCount,
        followUps: followUpCount,
        pendingTasks,
        revenue: 0 // Placeholder until invoices module
    };
}

export async function getTodaysTasks() {
    await connectToDatabase();
    const session = await auth();
    if (!session) return [];

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    const tasks = await Task.find({
        assignedTo: session.user?.id, // Filter by user?
        dueDate: { $lte: todayEnd }, // Show all past and today's tasks not done
        status: { $in: ['PENDING', 'OVERDUE'] }
    }).populate('relatedLead', 'name company').sort({ dueDate: 1 });

    return JSON.parse(JSON.stringify(tasks));
}
