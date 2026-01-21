'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import {
    LogOut,
    User as UserIcon,
    LayoutDashboard,
    Sparkles,
    Bell
} from 'lucide-react';

export default function DashboardLayout({ children }) {
    const { user, logout } = useAuth();

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center space-x-8">
                        <Link href="/dashboard" className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                                <Sparkles className="text-white w-5 h-5" />
                            </div>
                            <span className="text-xl font-black text-slate-900 tracking-tight">NoteX</span>
                        </Link>

                        <nav className="hidden md:flex items-center space-x-1">
                            <Link href="/dashboard">
                                <Button variant="ghost" size="sm" className="font-bold text-indigo-600 bg-indigo-50">
                                    <LayoutDashboard className="w-4 h-4 mr-2" />
                                    Notes
                                </Button>
                            </Link>
                        </nav>
                    </div>

                    <div className="flex items-center space-x-3">
                        <Button variant="ghost" size="icon" className="text-slate-400">
                            <Bell className="w-5 h-5" />
                        </Button>

                        <div className="h-8 w-px bg-slate-200 mx-2" />

                        <div className="flex items-center space-x-3 pl-2">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-bold text-slate-900">{user?.name}</p>
                                <p className="text-xs font-semibold text-slate-400">{user?.email}</p>
                            </div>
                            <Link href="/dashboard/profile">
                                <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center border-2 border-white shadow-sm hover:ring-2 hover:ring-indigo-100 transition-all">
                                    <UserIcon className="text-indigo-600 w-5 h-5" />
                                </div>
                            </Link>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={logout}
                                className="text-slate-400 hover:text-red-500 hover:bg-red-50"
                            >
                                <LogOut className="w-5 h-5" />
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            <main className="flex-1 overflow-auto">
                <div className="max-w-7xl mx-auto px-4 py-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
