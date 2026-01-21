'use client';

import React, { useState } from 'react';
import {
    useNotes,
    useCreateNote,
    useUpdateNote,
    useDeleteNote
} from '@/hooks/useNotes';
import { NoteCard } from '@/components/NoteCard';
import { NoteModal } from '@/components/NoteModal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import {
    Search,
    Plus,
    Filter,
    Inbox
} from 'lucide-react';

export default function DashboardPage() {
    const [search, setSearch] = useState('');
    const [selectedTag, setSelectedTag] = useState(undefined);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingNote, setEditingNote] = useState(null);

    const { data: notes, isLoading } = useNotes(search, selectedTag);
    const createMutation = useCreateNote();
    const updateMutation = useUpdateNote();
    const deleteMutation = useDeleteNote();

    const handleCreate = () => {
        setEditingNote(null);
        setIsModalOpen(true);
    };

    const handleEdit = (note) => {
        setEditingNote(note);
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (confirm('Are you sure you want to delete this note?')) {
            await deleteMutation.mutateAsync(id);
        }
    };

    const handleSubmit = async (data) => {
        if (editingNote) {
            await updateMutation.mutateAsync({ id: editingNote._id, ...data });
        } else {
            await createMutation.mutateAsync(data);
        }
        setIsModalOpen(false);
    };

    const allTags = Array.from(
        new Set(notes?.flatMap((n) => n.tags) || [])
    ).sort();

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="relative flex-1 max-w-lg">
                    <Input
                        placeholder="Search your notes..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        icon={<Search />}
                    />
                </div>

                <div className="flex items-center space-x-3">
                    <div className="relative group">
                        <Button variant="outline" className="h-12 rounded-xl">
                            <Filter className="w-4 h-4 mr-2" />
                            {selectedTag || 'All Tags'}
                        </Button>

                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                            <button
                                className="w-full text-left px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50 hover:text-indigo-600"
                                onClick={() => setSelectedTag(undefined)}
                            >
                                All Tags
                            </button>
                            {allTags.map((tag) => (
                                <button
                                    key={tag}
                                    className="w-full text-left px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50 hover:text-indigo-600"
                                    onClick={() => setSelectedTag(tag)}
                                >
                                    #{tag}
                                </button>
                            ))}
                        </div>
                    </div>

                    <Button onClick={handleCreate} className="h-12 rounded-xl shadow-lg shadow-indigo-100">
                        <Plus className="w-5 h-5 mr-2" />
                        New Note
                    </Button>
                </div>
            </div>

            {isLoading ? (
                <div className="flex flex-col items-center justify-center py-32 space-y-4">
                    <div className="w-12 h-12 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin" />
                    <p className="text-slate-400 font-bold">Summoning your notes...</p>
                </div>
            ) : notes && notes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {notes.map((note) => (
                        <NoteCard
                            key={note._id}
                            note={note}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-32 text-center bg-white rounded-[40px] border-2 border-dashed border-slate-100">
                    <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mb-6">
                        <Inbox className="w-10 h-10 text-slate-300" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900">No notes found</h3>
                    <p className="text-slate-500 mt-2 max-w-xs mx-auto font-medium">
                        {search || selectedTag
                            ? "We couldn't find any notes matching your current filters."
                            : "Start capturing your ideas and tasks by creating your first note."}
                    </p>
                    {!search && !selectedTag && (
                        <Button onClick={handleCreate} variant="outline" className="mt-8 border-2">
                            Create First Note
                        </Button>
                    )}
                </div>
            )}

            <NoteModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmit}
                note={editingNote}
                isLoading={createMutation.isPending || updateMutation.isPending}
            />
        </div>
    );
}
