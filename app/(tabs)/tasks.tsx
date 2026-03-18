/**
 * TaskFlow App - Tasks List Screen
 * Browse and manage all tasks with advanced filtering
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
  RefreshControl,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { ScreenContainer } from '@/components/screen-container';
import { useColors } from '@/hooks/use-colors';
import { TaskCard } from '@/src/components/TaskCard';
import { EmptyState } from '@/src/components/EmptyState';
import { useTaskStore } from '@/src/store/taskStore';
import { Task } from '@/src/types';

export default function TasksListScreen() {
  const colors = useColors();
  const store = useTaskStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      setRefreshing(true);
      setTimeout(() => setRefreshing(false), 500);
    }, [])
  );

  // Get all tasks or filtered by search/category
  const allTasks = store.getFilteredAndSortedTasks();
  const filteredTasks = searchQuery
    ? store.searchTasks(searchQuery)
    : selectedCategory
    ? allTasks.filter((t) => t.category === selectedCategory)
    : allTasks;

  const categories = store.getCategories();
  const stats = store.getTaskStats();

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 500);
  }, []);

  const handleTaskPress = (task: Task) => {
    // Navigate to edit screen
  };

  return (
    <ScreenContainer className="flex-1 bg-background">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Header */}
        <View style={[styles.header, { borderBottomColor: colors.border }]}>
          <Text style={[styles.headerTitle, { color: colors.foreground }]}>
            All Tasks
          </Text>
          <Text style={[styles.headerSubtitle, { color: colors.muted }]}>
            {filteredTasks.length} task{filteredTasks.length !== 1 ? 's' : ''}
          </Text>
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

        {/* Category Filter */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
          contentContainerStyle={styles.categoriesContent}
        >
          <Pressable
            onPress={() => setSelectedCategory(null)}
            style={[
              styles.categoryChip,
              {
                backgroundColor:
                  selectedCategory === null ? colors.primary : colors.surface,
                borderColor: colors.border,
              },
            ]}
          >
            <Text
              style={[
                styles.categoryChipText,
                {
                  color:
                    selectedCategory === null ? colors.background : colors.foreground,
                },
              ]}
            >
              All
            </Text>
          </Pressable>

          {categories.map((cat) => (
            <Pressable
              key={cat.id}
              onPress={() => setSelectedCategory(cat.name)}
              style={[
                styles.categoryChip,
                {
                  backgroundColor:
                    selectedCategory === cat.name ? colors.primary : colors.surface,
                  borderColor: colors.border,
                },
              ]}
            >
              <Text
                style={[
                  styles.categoryChipText,
                  {
                    color:
                      selectedCategory === cat.name
                        ? colors.background
                        : colors.foreground,
                  },
                ]}
              >
                {cat.name}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* Tasks List */}
        <View style={styles.listContainer}>
          {filteredTasks.length === 0 ? (
            <EmptyState
              title="No tasks found"
              description={
                searchQuery
                  ? 'Try a different search term'
                  : 'Create a new task to get started'
              }
              icon="📋"
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
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
  },
  searchContainer: {
    marginHorizontal: 16,
    marginTop: 16,
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
  categoriesContainer: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  categoriesContent: {
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
  },
  categoryChipText: {
    fontSize: 12,
    fontWeight: '600',
  },
  listContainer: {
    flex: 1,
    paddingBottom: 20,
  },
});
