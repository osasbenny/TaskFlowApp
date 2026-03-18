/**
 * TaskFlow App - Storage Service
 * Handles local persistence using AsyncStorage
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task, Category, AppSettings } from '../types';

const STORAGE_KEYS = {
  TASKS: '@taskflow/tasks',
  CATEGORIES: '@taskflow/categories',
  SETTINGS: '@taskflow/settings',
};

export class StorageService {
  /**
   * Save tasks to AsyncStorage
   */
  static async saveTasks(tasks: Task[]): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
    } catch (error) {
      console.error('Error saving tasks:', error);
      throw error;
    }
  }

  /**
   * Load tasks from AsyncStorage
   */
  static async loadTasks(): Promise<Task[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.TASKS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error loading tasks:', error);
      return [];
    }
  }

  /**
   * Save categories to AsyncStorage
   */
  static async saveCategories(categories: Category[]): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
    } catch (error) {
      console.error('Error saving categories:', error);
      throw error;
    }
  }

  /**
   * Load categories from AsyncStorage
   */
  static async loadCategories(): Promise<Category[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.CATEGORIES);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error loading categories:', error);
      return [];
    }
  }

  /**
   * Save settings to AsyncStorage
   */
  static async saveSettings(settings: AppSettings): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    } catch (error) {
      console.error('Error saving settings:', error);
      throw error;
    }
  }

  /**
   * Load settings from AsyncStorage
   */
  static async loadSettings(): Promise<AppSettings | null> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.SETTINGS);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error loading settings:', error);
      return null;
    }
  }

  /**
   * Clear all data from AsyncStorage
   */
  static async clearAll(): Promise<void> {
    try {
      await AsyncStorage.multiRemove(Object.values(STORAGE_KEYS));
    } catch (error) {
      console.error('Error clearing storage:', error);
      throw error;
    }
  }

  /**
   * Get storage size (for debugging)
   */
  static async getStorageInfo(): Promise<{ used: number; total: number }> {
    try {
      const keys = await AsyncStorage.getAllKeys();
      let used = 0;

      for (const key of keys) {
        const value = await AsyncStorage.getItem(key);
        if (value) {
          used += value.length;
        }
      }

      return { used, total: 10 * 1024 * 1024 }; // 10MB typical limit
    } catch (error) {
      console.error('Error getting storage info:', error);
      return { used: 0, total: 0 };
    }
  }
}
