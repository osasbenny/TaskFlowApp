/**
 * TaskFlow App - Empty State Component
 * Displays when there are no tasks to show
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useColors } from '@/hooks/use-colors';
import { Button } from './Button';

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: string;
}

export function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
  icon = '📝',
}: EmptyStateProps) {
  const colors = useColors();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={[styles.title, { color: colors.foreground }]}>
        {title}
      </Text>
      <Text style={[styles.description, { color: colors.muted }]}>
        {description}
      </Text>
      {actionLabel && onAction && (
        <Button
          title={actionLabel}
          onPress={onAction}
          style={styles.button}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    gap: 16,
  },
  icon: {
    fontSize: 64,
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  button: {
    marginTop: 16,
    minWidth: 200,
  },
});
