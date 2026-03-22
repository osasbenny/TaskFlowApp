/**
 * TaskFlow App - Date Utilities
 * Helper functions for date and time operations
 */

/**
 * Generate a unique ID using a simple algorithm that works on all platforms
 * (including web/Expo where crypto.getRandomValues() may not be available)
 */
export function generateId(): string {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 15);
  const randomStr2 = Math.random().toString(36).substring(2, 15);
  return `${timestamp}-${randomStr}-${randomStr2}`;
}

/**
 * Check if a date string is today
 */
export function isToday(dateString: string): boolean {
  const date = new Date(dateString);
  const today = new Date();
  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  );
}

/**
 * Check if a date string is in the future (upcoming)
 */
export function isUpcoming(dateString: string): boolean {
  const date = new Date(dateString);
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  return date >= tomorrow;
}

/**
 * Check if a date string is in the past (overdue)
 */
export function isOverdue(dateString: string): boolean {
  const date = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
}

/**
 * Parse date and time strings into a Date object
 */
export function parseDateTime(dateString?: string, timeString?: string): Date | null {
  if (!dateString) return null;

  const date = new Date(dateString);
  if (timeString) {
    const [hours, minutes] = timeString.split(':').map(Number);
    date.setHours(hours, minutes, 0, 0);
  } else {
    date.setHours(9, 0, 0, 0); // Default to 9 AM
  }

  return date;
}

/**
 * Format a date string to a readable format
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (isToday(dateString)) {
    return 'Today';
  } else if (date.toDateString() === tomorrow.toDateString()) {
    return 'Tomorrow';
  } else {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined,
    });
  }
}

/**
 * Format a time string to a readable format
 */
export function formatTime(timeString: string): string {
  const [hours, minutes] = timeString.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
}

/**
 * Format a full datetime for display
 */
export function formatDateTime(dateString: string, timeString?: string): string {
  const date = formatDate(dateString);
  if (timeString) {
    return `${date} at ${formatTime(timeString)}`;
  }
  return date;
}

/**
 * Get the current date in YYYY-MM-DD format
 */
export function getTodayDateString(): string {
  const today = new Date();
  return today.toISOString().split('T')[0];
}

/**
 * Get the current time in HH:mm format
 */
export function getCurrentTimeString(): string {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

/**
 * Get a date string for a specific number of days from now
 */
export function getDateStringFromNow(daysFromNow: number): string {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return date.toISOString().split('T')[0];
}

/**
 * Check if a reminder datetime is valid (in the future)
 */
export function isValidReminderDateTime(dateString?: string, timeString?: string): boolean {
  if (!dateString || !timeString) return false;
  const reminderDate = parseDateTime(dateString, timeString);
  if (!reminderDate) return false;
  return reminderDate > new Date();
}

/**
 * Get time until a specific datetime in milliseconds
 */
export function getTimeUntil(dateString: string, timeString?: string): number {
  const targetDate = parseDateTime(dateString, timeString);
  if (!targetDate) return 0;
  return Math.max(0, targetDate.getTime() - new Date().getTime());
}
