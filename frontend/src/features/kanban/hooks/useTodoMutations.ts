import {
  useCreateTodoMutation,
  useUpdateTodoMutation,
  useUpdateTodoStatusMutation,
  useArchiveTodoMutation,
  useRestoreTodoMutation,
} from '@/features/kanban/services/todoMutations';

export function useTodoMutations() {
  const createMutation = useCreateTodoMutation();
  const updateMutation = useUpdateTodoMutation();
  const updateStatusMutation = useUpdateTodoStatusMutation();
  const archiveMutation = useArchiveTodoMutation();
  const restoreMutation = useRestoreTodoMutation();

  return {
    create: createMutation,
    update: updateMutation,
    updateStatus: updateStatusMutation,
    archive: archiveMutation,
    restore: restoreMutation,
    isLoading:
      createMutation.isPending ||
      updateMutation.isPending ||
      updateStatusMutation.isPending ||
      archiveMutation.isPending ||
      restoreMutation.isPending,
  };
}
