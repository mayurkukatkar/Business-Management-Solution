'use server';

import { signIn } from '@/lib/auth';
import { AuthError } from 'next-auth';
import connectToDatabase from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { redirect } from 'next/navigation';

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('credentials', { ...Object.fromEntries(formData), redirectTo: '/dashboard' });
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
}

export async function registerUser(
    prevState: string | undefined,
    formData: FormData,
) {
    const { name, email, password } = Object.fromEntries(formData);

    if (!name || !email || !password) {
        return 'Please fill in all fields.';
    }

    try {
        await connectToDatabase();

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return 'User already exists.';
        }

        const hashedPassword = await bcrypt.hash(password as string, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });

        await newUser.save();
    } catch (error) {
        console.error('Registration error:', error);
        return 'Failed to register user.';
    }

    redirect('/dashboard');
}
