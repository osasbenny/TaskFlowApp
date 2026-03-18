/**
 * TaskFlow App - Add/Edit Task Screen
 * Premium form for creating and editing tasks
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  TextInput,
  Switch,
  Alert,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ScreenContainer } from '@/components/screen-container';
import { useColors } from '@/hooks/use-colors';
import { useTaskStore } from '@/src/store/taskStore';
import { Priority } from '@/src/types';

const PRIORITIES: Priority[] = ['low', 'medium', 'high'];

export default function AddTaskScreen() {
  const colors = useColors();
  const router = useRouter();
  const params = useLocalSearchParams();
  const store = useTaskStore();

  const taskId = params.taskId as string | undefined;
  const existingTask = taskId ? store.getTaskById(taskId) : null;

  const [title, setTitle] = useState(existingTask?.title || '');
  const [priority, setPriority] = useState<Priority>(
    (existingTask?.priority as Priority) || 'medium'
  );
  const [category, setCategory] = useState(existingTask?.category || 'Personal');
  const [dueDate, setDueDate] = useState(existingTask?.dueDate || '');
  const [dueTime, setDueTime] = useState(existingTask?.dueTime || '09:00');
  const [notes, setNotes] = useState(existingTask?.notes || '');
  const [hasReminder, setHasReminder] = useState(existingTask?.reminderEnabled || false);

  const categories = store.getCategories();

  const handleSave = () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Please enter a task title');
      return;
    }

    if (existingTask) {
      // Update existing task
      store.updateTask(existingTask.id, {
        title,
        notes,
        priority,
        category,
        dueDate,
        dueTime,
        reminderEnabled: hasReminder,
      });
    } else {
      // Create new task
      store.addTask({
        title,
        notes,
        priority,
        category,
        dueDate,
        dueTime,
        reminderEnabled: hasReminder,
        completed: false,
      });
    }

    router.back();
  };

  const handleDelete = () => {
    if (existingTask) {
      Alert.alert(
        'Delete Task',
        'Are you sure you want to delete this task?',
        [
          { text: 'Cancel', onPress: () => {} },
          {
            text: 'Delete',
            onPress: () => {
              store.deleteTask(existingTask.id);
              router.back();
            },
            style: 'destructive',
          },
        ]
      );
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <ScreenContainer className="flex-1 bg-background">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={[styles.header, { borderBottomColor: colors.border }]}>
          <Text style={[styles.headerTitle, { color: colors.foreground }]}>
            {existingTask ? 'Edit Task' : 'Create Task'}
          </Text>
        </View>

        {/* Form Content */}
        <View style={styles.formContainer}>
          {/* Title Field */}
          <View style={styles.formGroup}>
            <Text style={[styles.label, { color: colors.foreground }]}>
              Task Title *
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  color: colors.foreground,
                  borderColor: colors.border,
                  backgroundColor: colors.surface,
                },
              ]}
              placeholder="Enter task title"
              placeholderTextColor={colors.muted}
              value={title}
              onChangeText={setTitle}
            />
          </View>

          {/* Notes Field */}
          <View style={styles.formGroup}>
            <Text style={[styles.label, { color: colors.foreground }]}>
              Notes
            </Text>
            <TextInput
              style={[
                styles.input,
                styles.textArea,
                {
                  color: colors.foreground,
                  borderColor: colors.border,
                  backgroundColor: colors.surface,
                },
              ]}
              placeholder="Add task details..."
              placeholderTextColor={colors.muted}
              value={notes}
              onChangeText={setNotes}
              multiline
              numberOfLines={4}
            />
          </View>

          {/* Priority Selection */}
          <View style={styles.formGroup}>
            <Text style={[styles.label, { color: colors.foreground }]}>
              Priority
            </Text>
            <View style={styles.priorityContainer}>
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
                      styles.priorityText,
                      {
                        color: priority === p ? 'white' : colors.foreground,
                      },
                    ]}
                  >
                    {p.charAt(0).toUpperCase() + p.slice(1)}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Category Selection */}
          <View style={styles.formGroup}>
            <Text style={[styles.label, { color: colors.foreground }]}>
              Category
            </Text>
            <View style={styles.categoryContainer}>
              {categories.map((cat) => (
                <Pressable
                  key={cat.id}
                  onPress={() => setCategory(cat.name)}
                  style={[
                    styles.categoryButton,
                    {
                      backgroundColor:
                        category === cat.name ? colors.primary : colors.surface,
                      borderColor: colors.border,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.categoryText,
                      {
                        color: category === cat.name ? 'white' : colors.foreground,
                      },
                    ]}
                  >
                    {cat.name}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Due Date Field */}
          <View style={styles.formGroup}>
            <Text style={[styles.label, { color: colors.foreground }]}>
              Due Date
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  color: colors.foreground,
                  borderColor: colors.border,
                  backgroundColor: colors.surface,
                },
              ]}
              placeholder="YYYY-MM-DD"
              placeholderTextColor={colors.muted}
              value={dueDate}
              onChangeText={setDueDate}
            />
          </View>

          {/* Reminder Toggle */}
          <View style={styles.formGroup}>
            <View style={styles.reminderHeader}>
              <Text style={[styles.label, { color: colors.foreground }]}>
                Set Reminder
              </Text>
              <Switch
                value={hasReminder}
                onValueChange={setHasReminder}
                trackColor={{ false: colors.border, true: colors.primary }}
              />
            </View>

            {hasReminder && (
              <TextInput
                style={[
                  styles.input,
                  {
                    color: colors.foreground,
                    borderColor: colors.border,
                    backgroundColor: colors.surface,
                  },
                ]}
                placeholder="HH:MM"
                placeholderTextColor={colors.muted}
                value={dueTime}
                onChangeText={setDueTime}
              />
            )}
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <Pressable
            onPress={handleCancel}
            style={[
              styles.button,
              styles.secondaryButton,
              { borderColor: colors.border },
            ]}
          >
            <Text style={[styles.buttonText, { color: colors.foreground }]}>
              Cancel
            </Text>
          </Pressable>

          <Pressable
            onPress={handleSave}
            style={[
              styles.button,
              styles.primaryButton,
              { backgroundColor: colors.primary },
            ]}
          >
            <Text style={[styles.buttonText, { color: 'white' }]}>
              {existingTask ? 'Update' : 'Create'} Task
            </Text>
          </Pressable>
        </View>

        {/* Delete Button (for existing tasks) */}
        {existingTask && (
          <Pressable
            onPress={handleDelete}
            style={[styles.deleteButton, { backgroundColor: '#EF4444' }]}
          >
            <Text style={[styles.deleteButtonText, { color: 'white' }]}>
              Delete Task
            </Text>
          </Pressable>
        )}
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 20,
    gap: 20,
  },
  formGroup: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
  },
  textArea: {
    textAlignVertical: 'top',
    minHeight: 100,
  },
  priorityContainer: {
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
  priorityText: {
    fontSize: 13,
    fontWeight: '600',
  },
  categoryContainer: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  categoryButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
  },
  reminderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryButton: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  secondaryButton: {
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  deleteButton: {
    marginHorizontal: 16,
    marginBottom: 16,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  deleteButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
