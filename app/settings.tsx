/**
 * TaskFlow App - Settings Screen
 * User preferences and app information
 */

import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Pressable,
  Switch,
} from 'react-native';
import { ScreenContainer } from '@/components/screen-container';
import { useColors } from '@/hooks/use-colors';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useTaskStore } from '@/src/store/taskStore';

export default function SettingsScreen() {
  const colors = useColors();
  const colorScheme = useColorScheme();
  const store = useTaskStore();
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>(
    store.settings.theme
  );

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme);
    store.updateSettings({ theme: newTheme });
  };

  return (
    <ScreenContainer className="flex-1 bg-background">
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <Text style={[styles.title, { color: colors.foreground }]}>
          Settings
        </Text>

        {/* Theme Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
            Appearance
          </Text>

          <View
            style={[
              styles.settingItem,
              { backgroundColor: colors.surface, borderColor: colors.border },
            ]}
          >
            <Text style={[styles.settingLabel, { color: colors.foreground }]}>
              Theme
            </Text>
            <View style={styles.themeButtons}>
              {(['light', 'dark', 'system'] as const).map((t) => (
                <Pressable
                  key={t}
                  onPress={() => handleThemeChange(t)}
                  style={[
                    styles.themeButton,
                    {
                      backgroundColor:
                        theme === t ? colors.primary : colors.background,
                      borderColor: colors.border,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.themeButtonText,
                      {
                        color: theme === t ? colors.background : colors.foreground,
                      },
                    ]}
                  >
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        </View>

        {/* Preferences Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
            Preferences
          </Text>

          <View
            style={[
              styles.settingItem,
              { backgroundColor: colors.surface, borderColor: colors.border },
            ]}
          >
            <View style={styles.settingRow}>
              <View>
                <Text style={[styles.settingLabel, { color: colors.foreground }]}>
                  Show Completed Tasks
                </Text>
                <Text style={[styles.settingDescription, { color: colors.muted }]}>
                  Display completed tasks in lists
                </Text>
              </View>
              <Switch
                value={store.settings.showCompletedTasks}
                onValueChange={(value) =>
                  store.updateSettings({ showCompletedTasks: value })
                }
                trackColor={{ false: colors.border, true: colors.primary }}
              />
            </View>
          </View>

          <View
            style={[
              styles.settingItem,
              { backgroundColor: colors.surface, borderColor: colors.border },
            ]}
          >
            <View style={styles.settingRow}>
              <View>
                <Text style={[styles.settingLabel, { color: colors.foreground }]}>
                  Notifications
                </Text>
                <Text style={[styles.settingDescription, { color: colors.muted }]}>
                  Enable task reminders
                </Text>
              </View>
              <Switch
                value={store.settings.notificationsEnabled}
                onValueChange={(value) =>
                  store.updateSettings({ notificationsEnabled: value })
                }
                trackColor={{ false: colors.border, true: colors.primary }}
              />
            </View>
          </View>
        </View>

        {/* About Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
            About
          </Text>

          <View
            style={[
              styles.settingItem,
              { backgroundColor: colors.surface, borderColor: colors.border },
            ]}
          >
            <Text style={[styles.settingLabel, { color: colors.foreground }]}>
              App Version
            </Text>
            <Text style={[styles.settingValue, { color: colors.muted }]}>
              1.0.0
            </Text>
          </View>

          <View
            style={[
              styles.settingItem,
              { backgroundColor: colors.surface, borderColor: colors.border },
            ]}
          >
            <Text style={[styles.settingLabel, { color: colors.foreground }]}>
              Developer
            </Text>
            <Text style={[styles.settingValue, { color: colors.muted }]}>
              TaskFlow Team
            </Text>
          </View>

          <View
            style={[
              styles.infoBox,
              { backgroundColor: colors.primary + '10', borderColor: colors.primary },
            ]}
          >
            <Text style={[styles.infoText, { color: colors.foreground }]}>
              TaskFlow App is an offline-first task manager designed for productivity and simplicity. All your data is stored locally on your device.
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    gap: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  },
  section: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  settingItem: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    gap: 12,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingLabel: {
    fontSize: 15,
    fontWeight: '600',
  },
  settingDescription: {
    fontSize: 13,
    marginTop: 4,
  },
  settingValue: {
    fontSize: 14,
    marginTop: 4,
  },
  themeButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  themeButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
  },
  themeButtonText: {
    fontSize: 12,
    fontWeight: '600',
  },
  infoBox: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
  },
  infoText: {
    fontSize: 13,
    lineHeight: 20,
  },
});
