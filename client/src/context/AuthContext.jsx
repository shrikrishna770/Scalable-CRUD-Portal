'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import api from '@/lib/api';
import { useRouter, usePathname } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();
    const queryClient = useQueryClient();

    useEffect(() => {
        const fetchProfile = async () => {
            const token = Cookies.get('token');
            if (token) {
                try {
                    const res = await api.get('/auth/profile');
                    setUser(res.data);
                } catch (err) {
                    console.error('Failed to fetch profile', err);
                    if (err.response?.status === 401) {
                        Cookies.remove('token');
                        setUser(null);
                    }
                }
            }
            setLoading(false);
        };

        fetchProfile();
    }, []);

    useEffect(() => {
        const token = Cookies.get('token');
        const publicRoutes = ['/login', '/signup', '/'];

        if (!loading) {
            if (!token && !publicRoutes.includes(pathname)) {
                router.push('/login');
            } else if (token && (pathname === '/login' || pathname === '/signup')) {
                router.push('/dashboard');
            }
        }
    }, [pathname, loading, router]);

    const login = (token, userData) => {
        queryClient.clear();
        Cookies.set('token', token, { expires: 1 });
        setUser(userData);
        router.push('/dashboard');
    };

    const logout = () => {
        queryClient.clear();
        Cookies.remove('token');
        setUser(null);
        router.push('/login');
    };

    const updateUser = (userData) => {
        setUser(userData);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
