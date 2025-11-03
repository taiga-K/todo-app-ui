import { create } from 'zustand';
import type { TodoStatus, TodoPriority } from '@/features/kanban/constants/status';

export interface FilterState {
  search: string;
  status: TodoStatus[];
  priority: TodoPriority | null;
  assigneeId: string | null;
  sortBy: 'priority' | 'dueDate' | null;
}

interface FilterActions {
  setSearch: (search: string) => void;
  setStatus: (status: TodoStatus[]) => void;
  setPriority: (priority: TodoPriority | null) => void;
  setAssigneeId: (assigneeId: string | null) => void;
  setSortBy: (sortBy: 'priority' | 'dueDate' | null) => void;
  clearFilters: () => void;
}

const initialState: FilterState = {
  search: '',
  status: [],
  priority: null,
  assigneeId: null,
  sortBy: null,
};

export const useFilterStore = create<FilterState & FilterActions>((set) => ({
  ...initialState,
  setSearch: (search) => set({ search }),
  setStatus: (status) => set({ status }),
  setPriority: (priority) => set({ priority }),
  setAssigneeId: (assigneeId) => set({ assigneeId }),
  setSortBy: (sortBy) => set({ sortBy }),
  clearFilters: () => set(initialState),
}));
