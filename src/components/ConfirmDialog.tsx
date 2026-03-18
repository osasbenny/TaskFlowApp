/**
 * TaskFlow App - Confirm Dialog Component
 * Modal dialog for confirming destructive actions
 */

import React from 'react';
import { View, Text, StyleSheet, Modal, Pressable } from 'react-native';
import { useColors } from '@/hooks/use-colors';
import { Button } from './Button';

interface ConfirmDialogProps {
  visible: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isDangerous?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  visible,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  isDangerous = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const colors = useColors();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <Pressable
        style={[styles.backdrop, { backgroundColor: 'rgba(0, 0, 0, 0.5)' }]}
        onPress={onCancel}
      >
        <Pressable
          style={[
            styles.dialog,
            { backgroundColor: colors.surface },
          ]}
          onPress={(e) => e.stopPropagation()}
        >
          <Text style={[styles.title, { color: colors.foreground }]}>
            {title}
          </Text>
          <Text style={[styles.message, { color: colors.muted }]}>
            {message}
          </Text>

          <View style={styles.buttonContainer}>
            <Button
              title={cancelLabel}
              onPress={onCancel}
              variant="secondary"
              style={styles.button}
            />
            <Button
              title={confirmLabel}
              onPress={onConfirm}
              variant={isDangerous ? 'danger' : 'primary'}
              style={styles.button}
            />
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialog: {
    marginHorizontal: 32,
    borderRadius: 16,
    padding: 24,
    gap: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  message: {
    fontSize: 14,
    lineHeight: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  button: {
    flex: 1,
  },
});
