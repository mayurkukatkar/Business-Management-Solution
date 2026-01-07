'use server';

import { auth } from '@/lib/auth';
import connectToDatabase from '@/lib/db';
import Document from '@/models/Document';
import '@/models/Lead'; // Register Lead model
import { revalidatePath } from 'next/cache';
import { sendOtpEmail } from '@/lib/email';
import crypto from 'crypto';

// ... (keep creating & verify generic actions same if needed, but we focus on OTP actions)

export async function createDocument(data: any) {
    const session = await auth();
    if (!session) return { message: 'Unauthorized' };

    try {
        await connectToDatabase();

        const count = await Document.countDocuments({ type: data.type });
        const prefix = data.type === 'INVOICE' ? 'INV' : 'QT';
        const number = `${prefix}-${String(count + 1).padStart(3, '0')}`;

        // ... (rest of create logic, using data.items etc)
        const newDoc = await Document.create({
            ...data,
            number,
            createdBy: session.user?.id,
            items: data.items.map((item: any) => ({
                ...item,
                amount: item.quantity * item.rate
            })),
            subTotal: data.items.reduce((acc: number, item: any) => acc + (item.quantity * item.rate), 0),
            taxAmount: 0,
            totalAmount: 0
        });

        newDoc.taxAmount = (newDoc.subTotal * newDoc.taxRate) / 100;
        newDoc.totalAmount = newDoc.subTotal + newDoc.taxAmount;
        await newDoc.save();

        revalidatePath('/dashboard/invoices');
        return { message: 'Success', id: newDoc._id };
    } catch (error) {
        console.error(error);
        return { message: 'Failed to create document' };
    }
}

export async function getDocuments(type?: string) {
    await connectToDatabase();
    const filter = type ? { type } : {};
    const docs = await Document.find(filter).populate('relatedLead', 'name company').sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(docs));
}

export async function getDocumentPublic(id: string) {
    try {
        await connectToDatabase();
        // Ensure we don't leak internal OTP fields, standard query doesn't select them anyway
        const doc = await Document.findById(id).populate('relatedLead', 'name company phone email');
        return doc ? JSON.parse(JSON.stringify(doc)) : null;
    } catch (error) {
        return null;
    }
}

export async function sendDocumentOtp(id: string) {
    try {
        await connectToDatabase();
        const doc = await Document.findById(id).populate('relatedLead', 'email');
        if (!doc) return { success: false, message: 'Document not found' };

        const email = doc.relatedLead?.email;
        if (!email) return { success: false, message: 'Lead has no email address' };

        // Generate 6 digit OTP
        const otp = crypto.randomInt(100000, 999999).toString();

        // Save to DB (hashed ideally, but plain for simple MVP as requested)
        // We select the doc again to ensure we can save hidden fields if needed, 
        // but Mongoose allows saving if we set it.
        doc.currentOtp = otp;
        doc.otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 mins
        await doc.save();

        // Send Email
        await sendOtpEmail(email, otp);

        return { success: true };
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Failed to send OTP' };
    }
}

export async function verifyDocumentOtp(id: string, otp: string) {
    try {
        await connectToDatabase();
        // Need to explicitly select hidden fields
        const doc = await Document.findById(id).select('+currentOtp +otpExpires');

        if (!doc) return { success: false, message: 'Not found' };

        if (doc.status === 'ACCEPTED' || doc.signature?.otpVerified) {
            return { success: true, message: 'Already signed' };
        }

        if (!doc.currentOtp || doc.currentOtp !== otp) {
            return { success: false, message: 'Invalid OTP' };
        }

        if (new Date() > doc.otpExpires) {
            return { success: false, message: 'OTP Expired' };
        }

        // Success
        doc.signature = {
            signedBy: 'Client (Verified via Email)',
            signedAt: new Date(),
            ipAddress: '0.0.0.0', // Placeholder IP
            otpVerified: true
        };
        doc.status = 'ACCEPTED';

        // Clear OTP
        doc.currentOtp = undefined;
        doc.otpExpires = undefined;

        await doc.save();

        revalidatePath(`/p/documents/${id}`);
        return { success: true };
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Error signing' };
    }
}
