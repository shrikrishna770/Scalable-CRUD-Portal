'use client';

import React from 'react';
import { Edit3, Trash2, Tag, Calendar } from 'lucide-react';
import { Button } from './ui/Button';
import { cn } from '@/lib/utils';

export function NoteCard({ note, onEdit, onDelete }) {
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    };

    return (
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-indigo-100/40 hover:-translate-y-1 transition-all group">
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-slate-900 line-clamp-1">{note.title}</h3>
                <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="icon" onClick={() => onEdit(note)} className="text-slate-400 hover:text-indigo-600">
                        <Edit3 className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => onDelete(note._id)} className="text-slate-400 hover:text-red-500">
                        <Trash2 className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            <p className="text-slate-600 line-clamp-3 mb-6 font-medium leading-relaxed">
                {note.content}
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
                {note.tags.map((tag) => (
                    <span
                        key={tag}
                        className="inline-flex items-center px-3 py-1 bg-indigo-50 text-indigo-600 text-xs font-bold rounded-full border border-indigo-100"
                    >
                        <Tag className="w-3 h-3 mr-1" />
                        {tag}
                    </span>
                ))}
            </div>

            <div className="flex items-center text-xs font-bold text-slate-400 pt-4 border-t border-slate-50">
                <Calendar className="w-3.5 h-3.5 mr-1.5" />
                {formatDate(note.createdAt)}
            </div>
        </div>
    );
}
