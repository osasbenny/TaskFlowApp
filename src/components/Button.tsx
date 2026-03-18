/**
 * TaskFlow App - Button Component
 * Reusable button with multiple variants
 */

import React from 'react';
import { Pressable, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { useColors } from '@/hooks/use-colors';

interface ButtonProps {
  onPress: () => void;
  title: string;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function Button({
  onPress,
  title,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  style,
  textStyle,
}: ButtonProps) {
  const colors = useColors();

  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: colors.primary,
          borderColor: colors.primary,
        };
      case 'secondary':
        return {
          backgroundColor: 'transparent',
          borderColor: colors.border,
          borderWidth: 1,
        };
      case 'danger':
        return {
          backgroundColor: colors.error,
          borderColor: colors.error,
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
          borderColor: 'transparent',
        };
      default:
        return {};
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          paddingVertical: 8,
          paddingHorizontal: 12,
          minHeight: 32,
        };
      case 'large':
        return {
          paddingVertical: 16,
          paddingHorizontal: 24,
          minHeight: 56,
        };
      case 'medium':
      default:
        return {
          paddingVertical: 12,
          paddingHorizontal: 16,
          minHeight: 44,
        };
    }
  };

  const getTextColor = () => {
    if (variant === 'primary' || variant === 'danger') {
      return colors.background;
    }
    if (variant === 'secondary') {
      return colors.foreground;
    }
    return colors.primary;
  };

  const getTextSize = () => {
    switch (size) {
      case 'small':
        return 12;
      case 'large':
        return 18;
      case 'medium':
      default:
        return 16;
    }
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        getVariantStyles(),
        getSizeStyles(),
        {
          opacity: disabled ? 0.5 : pressed ? 0.8 : 1,
        },
        style,
      ]}
    >
      <Text
        style={[
          styles.text,
          {
            color: getTextColor(),
            fontSize: getTextSize(),
          },
          textStyle,
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: '600',
  },
});
