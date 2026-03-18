/**
 * TaskFlow App - Input Component
 * Reusable text input field with validation
 */

import React from 'react';
import { TextInput, View, Text, StyleSheet, TextInputProps } from 'react-native';
import { useColors } from '@/hooks/use-colors';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  multiline?: boolean;
  numberOfLines?: number;
}

export function Input({
  label,
  error,
  multiline = false,
  numberOfLines,
  ...props
}: InputProps) {
  const colors = useColors();

  return (
    <View style={styles.container}>
      {label && (
        <Text style={[styles.label, { color: colors.foreground }]}>
          {label}
        </Text>
      )}
      <TextInput
        {...props}
        multiline={multiline}
        numberOfLines={numberOfLines}
        style={[
          styles.input,
          {
            color: colors.foreground,
            backgroundColor: colors.surface,
            borderColor: error ? colors.error : colors.border,
          },
          multiline && styles.multilineInput,
        ]}
        placeholderTextColor={colors.muted}
      />
      {error && (
        <Text style={[styles.error, { color: colors.error }]}>
          {error}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
  },
  input: {
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    minHeight: 44,
  },
  multilineInput: {
    minHeight: 100,
    paddingTop: 10,
    textAlignVertical: 'top',
  },
  error: {
    fontSize: 12,
    fontWeight: '500',
  },
});
