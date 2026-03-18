/**
 * TaskFlow App - Home Screen
 * Main dashboard with task summary and quick access
 */

import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  Pressable,
  StyleSheet,
  TextInput,
} from 'react-native';
import { ScreenContainer } from '@/components/screen-container';
import { useColors } from '@/hooks/use-colors';
import { TaskCard } from '@/src/components/TaskCard';
import { EmptyState } from '@/src/components/EmptyState';
import { useTaskStore } from '@/src/store/taskStore';
import { Task } from '@/src/types';

const FILTER_CHIPS = ['Today', 'Upcoming', 'All', 'Completed'];

export default function HomeScreen() {
  const colors = useColors();
  const store = useTaskStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('Today');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  // Get tasks based on active filter
  const getFilteredTasks = useCallback(() => {
    if (activeFilter === 'Today') {
      return store.getTodayTasks();
    } else if (activeFilter === 'Upcoming') {
      return store.getUpcomingTasks();
    } else if (activeFilter === 'Completed') {
      return store.getCompletedTasks();
    } else {
      return store.getFilteredAndSortedTasks();
    }
  }, [activeFilter, store]);

  // Apply search filter
  const filteredTasks = searchQuery
    ? store.searchTasks(searchQuery)
    : getFilteredTasks();

  const stats = store.getTaskStats();

  const handleAddTask = () => {
    // Navigate to add task screen
    console.log('Add task');
  };

  const handleTaskPress = (task: Task) => {
    setSelectedTask(task);
  };

  return (
    <ScreenContainer className="flex-1 bg-background">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={[styles.header, { borderBottomColor: colors.border }]}>
          <Text style={[styles.greeting, { color: colors.foreground }]}>
            TaskFlow App
          </Text>
          <Text style={[styles.subtitle, { color: colors.muted }]}>
            Stay organized and productive
          </Text>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <StatCard
            label="Today"
            value={stats.tasksToday}
            color={colors.primary}
          />
          <StatCard
            label="Upcoming"
            value={stats.upcomingTasks}
            color={colors.warning}
          />
          <StatCard
            label="Completed"
            value={stats.completedTasks}
            color={colors.success}
          />
        </View>

        {/* Search Bar */}
        <View style={[styles.searchContainer, { backgroundColor: colors.surface }]}>
          <TextInput
            style={[
              styles.searchInput,
              {
                color: colors.foreground,
                borderColor: colors.border,
              },
            ]}
            placeholder="Search tasks..."
            placeholderTextColor={colors.muted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Filter Chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filtersContainer}
          contentContainerStyle={styles.filtersContent}
        >
          {FILTER_CHIPS.map((chip) => (
            <Pressable
              key={chip}
              onPress={() => {
                setActiveFilter(chip);
                setSearchQuery('');
              }}
              style={[
                styles.filterChip,
                {
                  backgroundColor:
                    activeFilter === chip ? colors.primary : colors.surface,
                  borderColor: colors.border,
                },
              ]}
            >
              <Text
                style={[
                  styles.filterText,
                  {
                    color:
                      activeFilter === chip ? colors.background : colors.foreground,
                  },
                ]}
              >
                {chip}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* Task List */}
        <View style={styles.listContainer}>
          {filteredTasks.length === 0 ? (
            <EmptyState
              title="No tasks"
              description={
                activeFilter === 'Today'
                  ? 'No tasks for today. Great job!'
                  : 'No tasks to show. Create one to get started.'
              }
              actionLabel="Add Task"
              onAction={handleAddTask}
              icon={activeFilter === 'Completed' ? '✓' : '📝'}
            />
          ) : (
            <FlatList
              scrollEnabled={false}
              data={filteredTasks}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TaskCard
                  task={item}
                  onPress={() => handleTaskPress(item)}
                  isCompleted={item.completed}
                />
              )}
            />
          )}
        </View>
      </ScrollView>

      {/* FAB - Add Task Button */}
      <Pressable
        onPress={handleAddTask}
        style={[
          styles.fab,
          {
            backgroundColor: colors.primary,
          },
        ]}
      >
        <Text style={styles.fabText}>+</Text>
      </Pressable>
    </ScreenContainer>
  );
}

interface StatCardProps {
  label: string;
  value: number;
  color: string;
}

function StatCard({ label, value, color }: StatCardProps) {
  const colors = useColors();

  return (
    <View
      style={[
        styles.statCard,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
        },
      ]}
    >
      <Text style={[styles.statValue, { color }]}>
        {value}
      </Text>
      <Text style={[styles.statLabel, { color: colors.muted }]}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomWidth: 1,
  },
  greeting: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    borderRadius: 12,
    borderWidth: 1,
    padding: 12,
    alignItems: 'center',
    gap: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  searchContainer: {
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 8,
    overflow: 'hidden',
  },
  searchInput: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    borderWidth: 1,
  },
  filtersContainer: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  filtersContent: {
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
  },
  filterText: {
    fontSize: 12,
    fontWeight: '600',
  },
  listContainer: {
    flex: 1,
    paddingBottom: 80,
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 5,
  },
  fabText: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
  },
});
