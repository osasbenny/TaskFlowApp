/**
 * TaskFlow App - Task Store
 * Centralized state management using Zustand
 */

import { create } from 'zustand';
import { Task, Category, TaskFilter, TaskSort, AppSettings, TaskStats } from '../types';
import { generateId, isToday, isUpcoming, isOverdue, parseDateTime } from '../utils/dateUtils';

interface TaskStoreState {
  // State
  tasks: Task[];
  categories: Category[];
  settings: AppSettings;
  filter: TaskFilter;
  sort: TaskSort;

  // Task Actions
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => Task;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleTaskCompletion: (id: string) => void;
  duplicateTask: (id: string) => Task;

  // Category Actions
  addCategory: (name: string, color?: string) => Category;
  updateCategory: (id: string, name: string, color?: string) => void;
  deleteCategory: (id: string) => void;
  getCategories: () => Category[];

  // Filter & Sort Actions
  setFilter: (filter: TaskFilter) => void;
  setSort: (sort: TaskSort) => void;
  clearFilters: () => void;

  // Settings Actions
  updateSettings: (settings: Partial<AppSettings>) => void;

  // Query Actions
  getFilteredAndSortedTasks: () => Task[];
  getTodayTasks: () => Task[];
  getUpcomingTasks: () => Task[];
  getCompletedTasks: () => Task[];
  getOverdueTasks: () => Task[];
  getTasksByCategory: (categoryId: string) => Task[];
  getTaskStats: () => TaskStats;
  getTaskById: (id: string) => Task | undefined;
  searchTasks: (query: string) => Task[];
}

const DEFAULT_CATEGORIES: Category[] = [
  { id: 'personal', name: 'Personal', isDefault: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: 'work', name: 'Work', isDefault: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: 'shopping', name: 'Shopping', isDefault: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: 'health', name: 'Health', isDefault: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: 'study', name: 'Study', isDefault: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
];

const DEFAULT_SETTINGS: AppSettings = {
  theme: 'system',
  defaultStartScreen: 'home',
  showCompletedTasks: true,
  notificationsEnabled: true,
};

const DEFAULT_SORT: TaskSort = {
  field: 'dueDate',
  order: 'asc',
};

export const useTaskStore = create<TaskStoreState>((set: any, get: any) => ({
  tasks: [],
  categories: DEFAULT_CATEGORIES,
  settings: DEFAULT_SETTINGS,
  filter: {},
  sort: DEFAULT_SORT,

  // Task Actions
  addTask: (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    set((state: TaskStoreState) => ({
      tasks: [...state.tasks, newTask],
    }));
    return newTask;
  },

  updateTask: (id: string, updates: Partial<Task>) => {
    set((state: TaskStoreState) => ({
      tasks: state.tasks.map((task: Task) =>
        task.id === id
          ? { ...task, ...updates, updatedAt: new Date().toISOString() }
          : task
      ),
    }));
  },

  deleteTask: (id: string) => {
    set((state: TaskStoreState) => ({
      tasks: state.tasks.filter((task: Task) => task.id !== id),
    }));
  },

  toggleTaskCompletion: (id: string) => {
    const task = get().getTaskById(id);
    if (task) {
      get().updateTask(id, { completed: !task.completed });
    }
  },

  duplicateTask: (id: string) => {
    const task = get().getTaskById(id);
    if (!task) throw new Error('Task not found');

    const duplicatedTask = {
      ...task,
      title: `${task.title} (Copy)`,
      completed: false,
    };
    return get().addTask(duplicatedTask);
  },

  // Category Actions
  addCategory: (name: string, color?: string) => {
    const newCategory: Category = {
      id: generateId(),
      name,
      color,
      isDefault: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    set((state: TaskStoreState) => ({
      categories: [...state.categories, newCategory],
    }));
    return newCategory;
  },

  updateCategory: (id: string, name: string, color?: string) => {
    set((state: TaskStoreState) => ({
      categories: state.categories.map((cat: Category) =>
        cat.id === id
          ? { ...cat, name, color, updatedAt: new Date().toISOString() }
          : cat
      ),
    }));
  },

  deleteCategory: (id: string) => {
    set((state: TaskStoreState) => ({
      categories: state.categories.filter((cat: Category) => cat.id !== id),
    }));
  },

  getCategories: () => get().categories,

  // Filter & Sort Actions
  setFilter: (filter: TaskFilter) => {
    set({ filter } as any);
  },

  setSort: (sort: TaskSort) => {
    set({ sort } as any);
  },

  clearFilters: () => {
    set({ filter: {}, sort: DEFAULT_SORT } as any);
  },

  // Settings Actions
  updateSettings: (settings: Partial<AppSettings>) => {
    set((state: TaskStoreState) => ({
      settings: { ...state.settings, ...settings },
    }));
  },

  // Query Actions
  getFilteredAndSortedTasks: (): Task[] => {
    const state = get();
    let filtered = state.tasks;

    // Apply filters
    if (state.filter.searchQuery) {
      const query: string = state.filter.searchQuery.toLowerCase();
      filtered = filtered.filter(
        (task: Task) =>
          task.title.toLowerCase().includes(query) ||
          task.notes?.toLowerCase().includes(query)
      );
    }

    if (state.filter.category) {
      filtered = filtered.filter((task: Task) => task.category === state.filter.category);
    }

    if (state.filter.priority) {
      filtered = filtered.filter((task: Task) => task.priority === state.filter.priority);
    }

    if (state.filter.completed !== undefined) {
      filtered = filtered.filter((task: Task) => task.completed === state.filter.completed);
    }

    if (state.filter.dueDateFrom) {
      filtered = filtered.filter((task: Task) => task.dueDate && task.dueDate >= state.filter.dueDateFrom!);
    }

    if (state.filter.dueDateTo) {
      filtered = filtered.filter((task: Task) => task.dueDate && task.dueDate <= state.filter.dueDateTo!);
    }

    // Apply sorting
    const sorted = [...filtered].sort((a: Task, b: Task) => {
      const field = state.sort.field;
      let aVal: any, bVal: any;

      if (field === 'dueDate') {
        aVal = a.dueDate || '9999-12-31';
        bVal = b.dueDate || '9999-12-31';
      } else if (field === 'createdAt') {
        aVal = a.createdAt;
        bVal = b.createdAt;
      } else if (field === 'priority') {
        const priorityOrder: Record<string, number> = { high: 0, medium: 1, low: 2 };
        aVal = priorityOrder[a.priority];
        bVal = priorityOrder[b.priority];
      } else if (field === 'title') {
        aVal = a.title.toLowerCase();
        bVal = b.title.toLowerCase();
      }

      if (aVal < bVal) return state.sort.order === 'asc' ? -1 : 1;
      if (aVal > bVal) return state.sort.order === 'asc' ? 1 : -1;
      return 0;
    });

    return sorted;
  },

  getTodayTasks: (): Task[] => {
    return get().tasks.filter((task: Task) => !task.completed && task.dueDate && isToday(task.dueDate));
  },

  getUpcomingTasks: (): Task[] => {
    return get().tasks.filter((task: Task) => !task.completed && task.dueDate && isUpcoming(task.dueDate));
  },

  getCompletedTasks: (): Task[] => {
    return get().tasks.filter((task: Task) => task.completed);
  },

  getOverdueTasks: (): Task[] => {
    return get().tasks.filter((task: Task) => !task.completed && task.dueDate && isOverdue(task.dueDate));
  },

  getTasksByCategory: (categoryId: string): Task[] => {
    return get().tasks.filter((task: Task) => task.category === categoryId && !task.completed);
  },

  getTaskStats: (): TaskStats => {
    const state = get();
    const activeTasks = state.tasks.filter((t: Task) => !t.completed);
    const completedTasks = state.tasks.filter((t: Task) => t.completed);
    const todayTasks = activeTasks.filter((t: Task) => t.dueDate && isToday(t.dueDate));
    const upcomingTasks = activeTasks.filter((t: Task) => t.dueDate && isUpcoming(t.dueDate));
    const overdueTasks = activeTasks.filter((t: Task) => t.dueDate && isOverdue(t.dueDate));

    return {
      totalTasks: state.tasks.length,
      completedTasks: completedTasks.length,
      tasksToday: todayTasks.length,
      upcomingTasks: upcomingTasks.length,
      overdueTasks: overdueTasks.length,
    };
  },

  getTaskById: (id: string) => {
    return get().tasks.find((task: Task) => task.id === id);
  },

  searchTasks: (query: string) => {
    const lowerQuery = query.toLowerCase();
    return get().tasks.filter(
      (task: Task) =>
        task.title.toLowerCase().includes(lowerQuery) ||
        task.notes?.toLowerCase().includes(lowerQuery)
    );
  },
}));
