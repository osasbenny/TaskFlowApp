/**
 * TaskFlow App - Notification Service
 * Handles local notifications and reminders
 */

import * as Notifications from 'expo-notifications';
import { Task } from '../types';
import { parseDateTime } from '../utils/dateUtils';

// Configure notification behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  } as any),
});

export class NotificationService {
  /**
   * Request notification permissions from user
   */
  static async requestPermissions(): Promise<boolean> {
    try {
      const { status } = await Notifications.requestPermissionsAsync();
      return status === 'granted';
    } catch (error) {
      console.error('Error requesting notification permissions:', error);
      return false;
    }
  }

  /**
   * Check if notifications are enabled
   */
  static async checkPermissions(): Promise<boolean> {
    try {
      const { status } = await Notifications.getPermissionsAsync();
      return status === 'granted';
    } catch (error) {
      console.error('Error checking notification permissions:', error);
      return false;
    }
  }

  /**
   * Schedule a notification for a task reminder
   */
  static async scheduleReminder(task: Task): Promise<string | null> {
    try {
      // Check permissions first
      const hasPermission = await this.checkPermissions();
      if (!hasPermission) {
        console.warn('Notification permission not granted');
        return null;
      }

      // Validate reminder datetime
      if (!task.dueDate || !task.dueTime || !task.reminderEnabled) {
        return null;
      }

      const reminderDate = parseDateTime(task.dueDate, task.dueTime);
      if (!reminderDate || reminderDate <= new Date()) {
        console.warn('Invalid reminder datetime');
        return null;
      }

      // Schedule the notification
      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Task Reminder',
          body: task.title,
          data: {
            taskId: task.id,
            taskTitle: task.title,
          },
          badge: 1,
        },
        trigger: {
          type: 'date' as any,
          date: reminderDate,
        } as any,
      });

      return notificationId;
    } catch (error) {
      console.error('Error scheduling reminder:', error);
      return null;
    }
  }

  /**
   * Cancel a scheduled notification
   */
  static async cancelReminder(notificationId?: string): Promise<void> {
    try {
      if (!notificationId) return;
      await Notifications.cancelScheduledNotificationAsync(notificationId);
    } catch (error) {
      console.error('Error cancelling reminder:', error);
    }
  }

  /**
   * Cancel all scheduled notifications
   */
  static async cancelAllReminders(): Promise<void> {
    try {
      await Notifications.cancelAllScheduledNotificationsAsync();
    } catch (error) {
      console.error('Error cancelling all reminders:', error);
    }
  }

  /**
   * Get all scheduled notifications
   */
  static async getScheduledNotifications(): Promise<Notifications.NotificationRequest[]> {
    try {
      return await Notifications.getAllScheduledNotificationsAsync();
    } catch (error) {
      console.error('Error getting scheduled notifications:', error);
      return [];
    }
  }

  /**
   * Send an immediate local notification (for testing)
   */
  static async sendImmediateNotification(title: string, body: string): Promise<void> {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
        },
        trigger: null, // Immediate
      });
    } catch (error) {
      console.error('Error sending immediate notification:', error);
    }
  }

  /**
   * Set up notification event listeners
   */
  static setupListeners(
    onNotificationReceived?: (notification: Notifications.Notification) => void,
    onNotificationTapped?: (response: Notifications.NotificationResponse) => void
  ): (() => void)[] {
    const subscriptions: (() => void)[] = [];

    if (onNotificationReceived) {
      subscriptions.push(
        Notifications.addNotificationReceivedListener(onNotificationReceived).remove
      );
    }

    if (onNotificationTapped) {
      subscriptions.push(
        Notifications.addNotificationResponseReceivedListener(onNotificationTapped).remove
      );
    }

    return subscriptions;
  }
}
