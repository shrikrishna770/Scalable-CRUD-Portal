'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { X, Tag as TagIcon } from 'lucide-react';

const noteSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    content: z.string().min(1, 'Content is required'),
    tagsString: z.string(),
});

export function NoteModal({ isOpen, onClose, onSubmit, note, isLoading }) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(noteSchema),
    });

    useEffect(() => {
        if (note) {
            reset({
                title: note.title,
                content: note.content,
                tagsString: note.tags.join(', '),
            });
        } else {
            reset({
                title: '',
                content: '',
                tagsString: '',
            });
        }
    }, [note, reset, isOpen]);

    if (!isOpen) return null;

    const handleFormSubmit = (data) => {
        const tags = data.tagsString
            .split(',')
            .map((tag) => tag.trim())
            .filter((tag) => tag !== '');

        onSubmit({
            ...note,
            title: data.title,
            content: data.content,
            tags,
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />

            <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="px-6 py-6 border-b border-slate-100 flex items-center justify-between">
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                        {note ? 'Edit Note' : 'Create New Note'}
                    </h2>
                    <Button variant="ghost" size="icon" onClick={onClose}>
                        <X className="w-5 h-5" />
                    </Button>
                </div>

                <form onSubmit={handleSubmit(handleFormSubmit)} className="p-6 space-y-6">
                    <Input
                        label="Title"
                        placeholder="Important thoughts..."
                        {...register('title')}
                        error={errors.title?.message}
                    />

                    <div className="space-y-1.5">
                        <label className="text-sm font-bold text-slate-900 ml-1">Content</label>
                        <textarea
                            className="w-full px-4 py-3 bg-white border-2 border-slate-100 rounded-2xl outline-none transition-all duration-200 focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 placeholder:text-slate-400 text-slate-900 font-medium min-h-[150px] resize-none"
                            placeholder="Start writing..."
                            {...register('content')}
                        />
                        {errors.content && <p className="text-xs font-medium text-red-500 ml-1">{errors.content.message}</p>}
                    </div>

                    <Input
                        label="Tags (comma separated)"
                        placeholder="work, ideas, project"
                        {...register('tagsString')}
                        icon={<TagIcon />}
                    />

                    <div className="flex space-x-3 pt-4">
                        <Button variant="outline" className="flex-1" onClick={onClose} type="button">
                            Cancel
                        </Button>
                        <Button className="flex-1" type="submit" isLoading={isLoading}>
                            {note ? 'Save Changes' : 'Create Note'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
