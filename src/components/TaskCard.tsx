/**
 * TaskFlow App - Task Card Component
 * Displays a task in list view with priority and status indicators
 */

import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Task } from '../types';
import { formatDateTime, formatDate, formatTime } from '../utils/dateUtils';
import { useColors } from '@/hooks/use-colors';

interface TaskCardProps {
  task: Task;
  onPress: () => void;
  onLongPress?: () => void;
  isCompleted?: boolean;
}

const PRIORITY_COLORS = {
  high: '#EF4444',
  medium: '#F59E0B',
  low: '#22C55E',
};

export function TaskCard({ task, onPress, onLongPress, isCompleted }: TaskCardProps) {
  const colors = useColors();

  const priorityColor = PRIORITY_COLORS[task.priority];
  const dueDateText = task.dueDate ? formatDate(task.dueDate) : null;
  const timeText = task.dueTime ? formatTime(task.dueTime) : null;

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={({ pressed }) => [
        styles.container,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          opacity: pressed ? 0.7 : 1,
        },
      ]}
    >
      <View style={styles.content}>
        {/* Priority indicator */}
        <View
          style={[
            styles.priorityIndicator,
            { backgroundColor: priorityColor },
          ]}
        />

        {/* Main content */}
        <View style={styles.textContainer}>
          <Text
            style={[
              styles.title,
              {
                color: colors.foreground,
                textDecorationLine: isCompleted ? 'line-through' : 'none',
                opacity: isCompleted ? 0.6 : 1,
              },
            ]}
            numberOfLines={1}
          >
            {task.title}
          </Text>

          {task.notes && (
            <Text
              style={[
                styles.notes,
                {
                  color: colors.muted,
                  opacity: isCompleted ? 0.5 : 0.7,
                },
              ]}
              numberOfLines={1}
            >
              {task.notes}
            </Text>
          )}

          {/* Meta information */}
          <View style={styles.metaContainer}>
            {dueDateText && (
              <Text style={[styles.meta, { color: colors.muted }]}>
                {dueDateText}
                {timeText && ` at ${timeText}`}
              </Text>
            )}
            {task.category && (
              <View
                style={[
                  styles.categoryBadge,
                  { backgroundColor: colors.primary + '20' },
                ]}
              >
                <Text style={[styles.categoryText, { color: colors.primary }]}>
                  {task.category}
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Completion indicator */}
        {isCompleted && (
          <View
            style={[
              styles.completedBadge,
              { backgroundColor: colors.success + '20' },
            ]}
          >
            <Text style={[styles.completedText, { color: colors.success }]}>
              ✓
            </Text>
          </View>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 6,
    marginHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    gap: 12,
  },
  priorityIndicator: {
    width: 4,
    height: '100%',
    borderRadius: 2,
    position: 'absolute',
    left: 0,
  },
  textContainer: {
    flex: 1,
    marginLeft: 8,
    gap: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  notes: {
    fontSize: 13,
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  meta: {
    fontSize: 12,
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: '500',
  },
  completedBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  completedText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
