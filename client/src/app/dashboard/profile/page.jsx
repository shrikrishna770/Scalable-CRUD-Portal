'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import api from '@/lib/api';
import { User, Mail, Save, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

const profileSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
});

export default function ProfilePage() {
    const { user, updateUser } = useAuth();
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: user?.name,
            email: user?.email,
        },
    });

    const onSubmit = async (data) => {
        setIsLoading(true);
        setError(null);
        setSuccess(null);
        try {
            const res = await api.put('/auth/profile', data);
            updateUser(res.data);
            setSuccess('Profile updated successfully!');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update profile.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-8">
                <Link href="/dashboard" className="inline-flex items-center text-sm font-bold text-slate-400 hover:text-indigo-600 mb-4 transition-colors">
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Back to Notes
                </Link>
                <h1 className="text-4xl font-black text-slate-900 tracking-tight">Account Settings</h1>
                <p className="text-slate-600 mt-2 font-medium">Manage your personal information and preferences.</p>
            </div>

            <div className="bg-white rounded-[32px] border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden">
                <div className="p-8 border-b border-slate-50 flex items-center space-x-6">
                    <div className="w-20 h-20 bg-indigo-600 rounded-[28px] flex items-center justify-center shadow-xl shadow-indigo-200">
                        <User className="text-white w-10 h-10" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900">{user?.name}</h2>
                        <p className="text-slate-600 font-bold">{user?.email}</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
                    {error && (
                        <div className="p-4 bg-red-50 text-red-500 rounded-2xl text-sm font-bold border border-red-100 animate-in fade-in slide-in-from-top-2">
                            {error}
                        </div>
                    )}
                    {success && (
                        <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl text-sm font-bold border border-emerald-100 animate-in fade-in slide-in-from-top-2">
                            {success}
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                            label="Full Name"
                            icon={<User />}
                            {...register('name')}
                            error={errors.name?.message}
                        />
                        <Input
                            label="Email Address"
                            type="email"
                            icon={<Mail />}
                            {...register('email')}
                            error={errors.email?.message}
                            disabled
                            className="bg-slate-50 cursor-not-allowed opacity-70"
                        />
                    </div>

                    <div className="pt-4 flex justify-end">
                        <Button type="submit" isLoading={isLoading} className="px-10 h-14 rounded-2xl">
                            <Save className="w-5 h-5 mr-2" />
                            Save Changes
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
