'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ArrowRight, CheckCircle2, Zap, Shield, Sparkles } from 'lucide-react';

export default function Home() {
    return (
        <div className="min-h-screen bg-white">
            <nav className="max-w-7xl mx-auto px-6 py-8 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
                        <Sparkles className="text-white w-6 h-6" />
                    </div>
                    <span className="text-2xl font-black text-slate-900 tracking-tight">NoteX</span>
                </div>
                <div className="flex items-center space-x-4">
                    <Link href="/login">
                        <Button variant="ghost">Sign In</Button>
                    </Link>
                    <Link href="/signup">
                        <Button>Get Started</Button>
                    </Link>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-6 pt-20 pb-32">
                <div className="text-center space-y-8 max-w-4xl mx-auto">
                    <div className="inline-flex items-center space-x-2 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-sm font-bold animate-fade-in">
                        <Zap className="w-4 h-4" />
                        <span>Powering 10,000+ productive minds</span>
                    </div>

                    <h1 className="text-6xl md:text-7xl font-black text-slate-900 leading-[1.1] tracking-tight">
                        Your ideas, organized <br />
                        <span className="text-indigo-600">at the speed of light.</span>
                    </h1>

                    <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
                        The minimal note-taking app that helps you capture, organize, and retrieve your thoughts instantly. Built for clarity and focus.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
                        <Link href="/signup">
                            <Button size="lg" className="w-full sm:w-auto h-16 px-10 text-lg rounded-2xl group">
                                Start for Free
                                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                        <Link href="/login">
                            <Button variant="outline" size="lg" className="w-full sm:w-auto h-16 px-10 text-lg rounded-2xl">
                                Live Demo
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mt-40">
                    {[
                        {
                            icon: <Zap className="w-6 h-6 text-indigo-600" />,
                            title: "Lightning Fast",
                            desc: "Optimized for speed. Your notes sync instantly across all your devices without any lag."
                        },
                        {
                            icon: <Shield className="w-6 h-6 text-indigo-600" />,
                            title: "Secure by Design",
                            desc: "Your data is encrypted and secure. We use industry-standard JWT and hashing for your peace of mind."
                        },
                        {
                            icon: <CheckCircle2 className="w-6 h-6 text-indigo-600" />,
                            title: "Search & Filter",
                            desc: "Find anything in seconds. Robust search and tagging system keeps your thoughts organized."
                        }
                    ].map((feature, i) => (
                        <div key={i} className="p-8 bg-slate-50 rounded-3xl border border-slate-100 hover:border-indigo-200 transition-colors group">
                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
                            <p className="text-slate-500 leading-relaxed font-medium">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
