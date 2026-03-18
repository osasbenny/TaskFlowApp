/**
 * TaskFlow App - useTaskManager Hook
 * Manages task operations with automatic persistence
 */

import { useEffect, useCallback } from 'react';
import { useTaskStore } from '../store/taskStore';
import { StorageService } from '../services/storageService';
import { NotificationService } from '../services/notificationService';
import { Task } from '../types';
import { isValidReminderDateTime } from '../utils/dateUtils';

export function useTaskManager() {
  const store = useTaskStore();

  // Load data on mount
  useEffect(() => {
    const loadData = async () => {
      const [tasks, categories, settings] = await Promise.all([
        StorageService.loadTasks(),
        StorageService.loadCategories(),
        StorageService.loadSettings(),
      ]);

      if (tasks.length > 0) {
        // Replace store tasks with loaded tasks
        useTaskStore.setState({ tasks });
      }

      if (categories.length > 0) {
        useTaskStore.setState({ categories });
      }

      if (settings) {
        useTaskStore.setState({ settings });
      }
    };

    loadData().catch(console.error);
  }, []);

  // Persist tasks whenever they change
  useEffect(() => {
    StorageService.saveTasks(store.tasks).catch(console.error);
  }, [store.tasks]);

  // Persist categories whenever they change
  useEffect(() => {
    StorageService.saveCategories(store.categories).catch(console.error);
  }, [store.categories]);

  // Persist settings whenever they change
  useEffect(() => {
    StorageService.saveSettings(store.settings).catch(console.error);
  }, [store.settings]);

  // Create task with reminder scheduling
  const createTask = useCallback(
    async (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
      const task = store.addTask(taskData);

      // Schedule reminder if enabled
      if (task.reminderEnabled && task.dueDate && task.dueTime) {
        if (isValidReminderDateTime(task.dueDate, task.dueTime)) {
          const notificationId = await NotificationService.scheduleReminder(task);
          if (notificationId) {
            store.updateTask(task.id, { notificationId });
          }
        }
      }

      return task;
    },
    [store]
  );

  // Update task with reminder rescheduling
  const updateTask = useCallback(
    async (id: string, updates: Partial<Task>) => {
      const oldTask = store.getTaskById(id);
      if (!oldTask) return;

      // Cancel old reminder if it exists
      if (oldTask.notificationId) {
        await NotificationService.cancelReminder(oldTask.notificationId);
      }

      // Update task
      store.updateTask(id, updates);
      const updatedTask = store.getTaskById(id);

      // Schedule new reminder if enabled
      if (updatedTask && updates.reminderEnabled !== false) {
        if (updatedTask.reminderEnabled && updatedTask.dueDate && updatedTask.dueTime) {
          if (isValidReminderDateTime(updatedTask.dueDate, updatedTask.dueTime)) {
            const notificationId = await NotificationService.scheduleReminder(updatedTask);
            if (notificationId) {
              store.updateTask(id, { notificationId });
            }
          }
        }
      }
    },
    [store]
  );

  // Delete task with reminder cleanup
  const deleteTask = useCallback(
    async (id: string) => {
      const task = store.getTaskById(id);
      if (task && task.notificationId) {
        await NotificationService.cancelReminder(task.notificationId);
      }
      store.deleteTask(id);
    },
    [store]
  );

  // Complete task with reminder cancellation
  const completeTask = useCallback(
    async (id: string) => {
      const task = store.getTaskById(id);
      if (task && task.notificationId) {
        await NotificationService.cancelReminder(task.notificationId);
      }
      store.updateTask(id, { completed: true, notificationId: undefined });
    },
    [store]
  );

  // Restore completed task
  const restoreTask = useCallback(
    async (id: string) => {
      const task = store.getTaskById(id);
      if (!task) return;

      store.updateTask(id, { completed: false });

      // Reschedule reminder if it was enabled
      if (task.reminderEnabled && task.dueDate && task.dueTime) {
        if (isValidReminderDateTime(task.dueDate, task.dueTime)) {
          const notificationId = await NotificationService.scheduleReminder(task);
          if (notificationId) {
            store.updateTask(id, { notificationId });
          }
        }
      }
    },
    [store]
  );

  return {
    ...store,
    createTask,
    updateTask,
    deleteTask,
    completeTask,
    restoreTask,
  };
}
