/**
 * TaskFlow App - Settings Screen
 * User preferences, theme, and app information
 */

import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  Switch,
  Alert,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { ScreenContainer } from '@/components/screen-container';
import { useColors } from '@/hooks/use-colors';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useTaskStore } from '@/src/store/taskStore';

export default function SettingsScreen() {
  const colors = useColors();
  const colorScheme = useColorScheme();
  const store = useTaskStore();
  const settings = store.settings;

  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>(settings.theme);
  const [showCompleted, setShowCompleted] = useState(settings.showCompletedTasks);
  const [notificationsEnabled, setNotificationsEnabled] = useState(
    settings.notificationsEnabled
  );

  useFocusEffect(
    useCallback(() => {
      // Refresh settings when screen is focused
    }, [])
  );

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme);
    store.updateSettings({ theme: newTheme });
  };

  const handleShowCompletedChange = (value: boolean) => {
    setShowCompleted(value);
    store.updateSettings({ showCompletedTasks: value });
  };

  const handleNotificationsChange = (value: boolean) => {
    setNotificationsEnabled(value);
    store.updateSettings({ notificationsEnabled: value });
  };

  const handleClearAllData = () => {
    Alert.alert(
      'Clear All Data',
      'Are you sure you want to delete all tasks? This action cannot be undone.',
      [
        { text: 'Cancel', onPress: () => {} },
        {
          text: 'Delete',
          onPress: () => {
            // Clear all tasks
            store.tasks.forEach((task) => {
              store.deleteTask(task.id);
            });
            Alert.alert('Success', 'All tasks have been deleted');
          },
          style: 'destructive',
        },
      ]
    );
  };

  return (
    <ScreenContainer className="flex-1 bg-background">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={[styles.header, { borderBottomColor: colors.border }]}>
          <Text style={[styles.headerTitle, { color: colors.foreground }]}>
            Settings
          </Text>
        </View>

        {/* Appearance Section */}
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
                        theme === t ? colors.primary : colors.border,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.themeButtonText,
                      {
                        color: theme === t ? 'white' : colors.foreground,
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

        {/* Display Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
            Display
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
                  Display finished tasks in lists
                </Text>
              </View>
              <Switch
                value={showCompleted}
                onValueChange={handleShowCompletedChange}
                trackColor={{ false: colors.border, true: colors.primary }}
              />
            </View>
          </View>
        </View>

        {/* Notifications Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
            Notifications
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
                  Enable Notifications
                </Text>
                <Text style={[styles.settingDescription, { color: colors.muted }]}>
                  Get reminders for your tasks
                </Text>
              </View>
              <Switch
                value={notificationsEnabled}
                onValueChange={handleNotificationsChange}
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
            <View style={styles.aboutRow}>
              <Text style={[styles.settingLabel, { color: colors.foreground }]}>
                App Version
              </Text>
              <Text style={[styles.versionText, { color: colors.muted }]}>
                1.0.0
              </Text>
            </View>
          </View>

          <View
            style={[
              styles.settingItem,
              { backgroundColor: colors.surface, borderColor: colors.border },
            ]}
          >
            <View style={styles.aboutRow}>
              <Text style={[styles.settingLabel, { color: colors.foreground }]}>
                Total Tasks
              </Text>
              <Text style={[styles.versionText, { color: colors.muted }]}>
                {store.tasks.length}
              </Text>
            </View>
          </View>

          <View
            style={[
              styles.settingItem,
              { backgroundColor: colors.surface, borderColor: colors.border },
            ]}
          >
            <View style={styles.aboutRow}>
              <Text style={[styles.settingLabel, { color: colors.foreground }]}>
                Completed Tasks
              </Text>
              <Text style={[styles.versionText, { color: colors.muted }]}>
                {store.getTaskStats().completedTasks}
              </Text>
            </View>
          </View>
        </View>

        {/* Danger Zone */}
        <View style={styles.section}>
          <Pressable
            onPress={handleClearAllData}
            style={[
              styles.dangerButton,
              { backgroundColor: '#EF4444' },
            ]}
          >
            <Text style={[styles.dangerButtonText, { color: 'white' }]}>
              Clear All Data
            </Text>
          </Pressable>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: colors.muted }]}>
            TaskFlow v1.0.0
          </Text>
          <Text style={[styles.footerText, { color: colors.muted }]}>
            Stay organized and productive
          </Text>
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
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 12,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  settingItem: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  settingDescription: {
    fontSize: 12,
    marginTop: 4,
  },
  themeButtons: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
  },
  themeButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  themeButtonText: {
    fontSize: 12,
    fontWeight: '600',
  },
  aboutRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  versionText: {
    fontSize: 14,
    fontWeight: '500',
  },
  dangerButton: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  dangerButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  footer: {
    paddingHorizontal: 16,
    paddingVertical: 32,
    alignItems: 'center',
    gap: 8,
  },
  footerText: {
    fontSize: 12,
  },
});
