import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';

export function useNotes(search, tag) {
    return useQuery({
        queryKey: ['notes', { search, tag }],
        queryFn: async () => {
            const { data } = await api.get('/notes', {
                params: { search, tag },
            });
            return data;
        },
    });
}

export function useCreateNote() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (note) => {
            const { data } = await api.post('/notes', note);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notes'] });
        },
    });
}

export function useUpdateNote() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, ...note }) => {
            const { data } = await api.put(`/notes/${id}`, note);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notes'] });
        },
    });
}

export function useDeleteNote() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id) => {
            const { data } = await api.delete(`/notes/${id}`);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notes'] });
        },
    });
}
