/**
 * TaskFlow App - Add/Edit Task Screen
 * Form for creating and editing tasks
 */

import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Switch,
  Pressable,
  Text,
  Platform,
} from 'react-native';
import { ScreenContainer } from '@/components/screen-container';
import { useColors } from '@/hooks/use-colors';
import { Input } from '@/src/components/Input';
import { Button } from '@/src/components/Button';
import { useTaskStore } from '@/src/store/taskStore';
import { Priority } from '@/src/types';
import {
  getTodayDateString,
  getCurrentTimeString,
  isValidReminderDateTime,
} from '@/src/utils/dateUtils';

const PRIORITIES: Priority[] = ['low', 'medium', 'high'];

export default function AddTaskScreen() {
  const colors = useColors();
  const store = useTaskStore();

  // Form state
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [category, setCategory] = useState('Personal');
  const [priority, setPriority] = useState<Priority>('medium');
  const [dueDate, setDueDate] = useState(getTodayDateString());
  const [dueTime, setDueTime] = useState(getCurrentTimeString());
  const [reminderEnabled, setReminderEnabled] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (reminderEnabled && !isValidReminderDateTime(dueDate, dueTime)) {
      newErrors.reminder = 'Reminder must be set to a future date and time';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    const taskData = {
      title: title.trim(),
      notes: notes.trim() || undefined,
      category,
      priority,
      dueDate,
      dueTime,
      reminderEnabled,
      completed: false,
    };

    await store.addTask(taskData as any);
    console.log('Task saved, navigate back');
  };

  return (
    <ScreenContainer className="flex-1 bg-background">
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={[styles.title, { color: colors.foreground }]}>
          Add Task
        </Text>

        {/* Title Input */}
        <Input
          label="Title *"
          placeholder="What needs to be done?"
          value={title}
          onChangeText={setTitle}
          error={errors.title}
        />

        {/* Notes Input */}
        <Input
          label="Notes"
          placeholder="Add details..."
          value={notes}
          onChangeText={setNotes}
          multiline
          numberOfLines={4}
        />

        {/* Category Selector */}
        <View style={styles.section}>
          <Text style={[styles.label, { color: colors.foreground }]}>
            Category
          </Text>
          <View style={styles.categoryButtons}>
            {['Personal', 'Work', 'Shopping', 'Health', 'Study'].map((cat) => (
              <Pressable
                key={cat}
                onPress={() => setCategory(cat)}
                style={[
                  styles.categoryButton,
                  {
                    backgroundColor:
                      category === cat ? colors.primary : colors.surface,
                    borderColor: colors.border,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.categoryButtonText,
                    {
                      color:
                        category === cat ? colors.background : colors.foreground,
                    },
                  ]}
                >
                  {cat}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Priority Selector */}
        <View style={styles.section}>
          <Text style={[styles.label, { color: colors.foreground }]}>
            Priority
          </Text>
          <View style={styles.priorityButtons}>
            {PRIORITIES.map((p) => (
              <Pressable
                key={p}
                onPress={() => setPriority(p)}
                style={[
                  styles.priorityButton,
                  {
                    backgroundColor:
                      priority === p ? colors.primary : colors.surface,
                    borderColor: colors.border,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.priorityButtonText,
                    {
                      color:
                        priority === p ? colors.background : colors.foreground,
                    },
                  ]}
                >
                  {p.charAt(0).toUpperCase() + p.slice(1)}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Reminder Toggle */}
        <View
          style={[
            styles.reminderSection,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
          <View>
            <Text style={[styles.reminderLabel, { color: colors.foreground }]}>
              Enable Reminder
            </Text>
            <Text style={[styles.reminderDescription, { color: colors.muted }]}>
              Get notified at the scheduled time
            </Text>
          </View>
          <Switch
            value={reminderEnabled}
            onValueChange={setReminderEnabled}
            trackColor={{ false: colors.border, true: colors.primary }}
          />
        </View>

        {errors.reminder && (
          <Text style={[styles.error, { color: colors.error }]}>
            {errors.reminder}
          </Text>
        )}

        {/* Save Button */}
        <Button
          title="Create Task"
          onPress={handleSave}
          style={styles.saveButton}
        />
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  section: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
  },
  categoryButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  categoryButtonText: {
    fontSize: 13,
    fontWeight: '500',
  },
  priorityButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  priorityButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
  },
  priorityButtonText: {
    fontSize: 13,
    fontWeight: '600',
  },
  reminderSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    gap: 12,
  },
  reminderLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  reminderDescription: {
    fontSize: 12,
    marginTop: 2,
  },
  error: {
    fontSize: 12,
    fontWeight: '500',
  },
  saveButton: {
    marginTop: 8,
    marginBottom: 32,
  },
});
