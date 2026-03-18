/**
 * TaskFlow App - Type Definitions
 * Core models and interfaces for the application
 */

export type Priority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  notes?: string;
  category: string;
  priority: Priority;
  dueDate?: string; // ISO date string (YYYY-MM-DD)
  dueTime?: string; // Time string (HH:mm)
  reminderEnabled: boolean;
  reminderAt?: string; // ISO datetime string
  completed: boolean;
  createdAt: string; // ISO datetime string
  updatedAt: string; // ISO datetime string
  notificationId?: string; // Platform-specific notification ID
}

export interface Category {
  id: string;
  name: string;
  color?: string; // Hex color code
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TaskFilter {
  searchQuery?: string;
  category?: string;
  priority?: Priority;
  completed?: boolean;
  dueDateFrom?: string;
  dueDateTo?: string;
}

export interface TaskSort {
  field: 'dueDate' | 'createdAt' | 'priority' | 'title';
  order: 'asc' | 'desc';
}

export interface AppSettings {
  theme: 'light' | 'dark' | 'system';
  defaultStartScreen: 'home' | 'today' | 'upcoming' | 'all';
  showCompletedTasks: boolean;
  notificationsEnabled: boolean;
}

export interface TaskStats {
  totalTasks: number;
  completedTasks: number;
  tasksToday: number;
  upcomingTasks: number;
  overdueTasks: number;
}

export interface NotificationPayload {
  taskId: string;
  taskTitle: string;
  taskTime?: string;
}
