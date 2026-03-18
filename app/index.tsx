/**
 * TaskFlow App - Splash & Onboarding Screen
 * Premium welcome experience with feature highlights
 */

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenContainer } from '@/components/screen-container';
import { useColors } from '@/hooks/use-colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

const ONBOARDING_SLIDES = [
  {
    id: '1',
    title: 'Welcome to TaskFlow',
    description: 'Stay organized and productive with intelligent task management',
    icon: '✓',
    color: '#0a7ea4',
  },
  {
    id: '2',
    title: 'Smart Reminders',
    description: 'Never miss a deadline with intelligent notification scheduling',
    icon: '🔔',
    color: '#0a7ea4',
  },
  {
    id: '3',
    title: 'Organize Everything',
    description: 'Categorize tasks and set priorities to stay focused',
    icon: '📋',
    color: '#0a7ea4',
  },
  {
    id: '4',
    title: 'Track Progress',
    description: 'Visualize your productivity and celebrate your wins',
    icon: '📊',
    color: '#0a7ea4',
  },
];

export default function SplashScreen() {
  const colors = useColors();
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user has seen onboarding
    const checkOnboarding = async () => {
      try {
        const hasSeenOnboarding = await AsyncStorage.getItem('hasSeenOnboarding');
        if (hasSeenOnboarding === 'true') {
          router.replace('/(tabs)');
        }
      } catch (error) {
        console.error('Error checking onboarding:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const timer = setTimeout(checkOnboarding, 1500);
    return () => clearTimeout(timer);
  }, [router]);

  const handleNext = () => {
    if (currentSlide < ONBOARDING_SLIDES.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      completeOnboarding();
    }
  };

  const handleSkip = () => {
    completeOnboarding();
  };

  const completeOnboarding = async () => {
    try {
      await AsyncStorage.setItem('hasSeenOnboarding', 'true');
      router.replace('/(tabs)');
    } catch (error) {
      console.error('Error completing onboarding:', error);
    }
  };

  const slide = ONBOARDING_SLIDES[currentSlide];
  const progress = ((currentSlide + 1) / ONBOARDING_SLIDES.length) * 100;

  if (isLoading) {
    return (
      <ScreenContainer className="flex-1 justify-center items-center bg-background">
        <View style={styles.splashContent}>
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: colors.primary },
            ]}
          >
            <Text style={styles.splashIcon}>✓</Text>
          </View>
          <Text style={[styles.splashTitle, { color: colors.foreground }]}>
            TaskFlow
          </Text>
          <Text style={[styles.splashSubtitle, { color: colors.muted }]}>
            Stay Organized & Productive
          </Text>
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer className="flex-1 bg-background">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
      >
        {/* Slide Content */}
        <View style={styles.slideContainer}>
          <View
            style={[
              styles.slideIconContainer,
              { backgroundColor: `${slide.color}15` },
            ]}
          >
            <Text style={styles.slideIcon}>{slide.icon}</Text>
          </View>

          <Text style={[styles.slideTitle, { color: colors.foreground }]}>
            {slide.title}
          </Text>

          <Text style={[styles.slideDescription, { color: colors.muted }]}>
            {slide.description}
          </Text>
        </View>

        {/* Progress Indicator */}
        <View style={styles.progressContainer}>
          <View
            style={[
              styles.progressBar,
              {
                backgroundColor: colors.border,
              },
            ]}
          >
            <View
              style={[
                styles.progressFill,
                {
                  backgroundColor: colors.primary,
                  width: `${progress}%`,
                },
              ]}
            />
          </View>
          <Text style={[styles.progressText, { color: colors.muted }]}>
            {currentSlide + 1} / {ONBOARDING_SLIDES.length}
          </Text>
        </View>

        {/* Dots Indicator */}
        <View style={styles.dotsContainer}>
          {ONBOARDING_SLIDES.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                {
                  backgroundColor:
                    index === currentSlide ? colors.primary : colors.border,
                  width: index === currentSlide ? 32 : 8,
                },
              ]}
            />
          ))}
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          {currentSlide > 0 && (
            <Pressable
              onPress={() => setCurrentSlide(currentSlide - 1)}
              style={[
                styles.button,
                styles.secondaryButton,
                { borderColor: colors.border },
              ]}
            >
              <Text style={[styles.buttonText, { color: colors.foreground }]}>
                Back
              </Text>
            </Pressable>
          )}

          <Pressable
            onPress={handleNext}
            style={[
              styles.button,
              styles.primaryButton,
              { backgroundColor: colors.primary },
              currentSlide === 0 && { flex: 1 },
            ]}
          >
            <Text style={[styles.buttonText, { color: 'white' }]}>
              {currentSlide === ONBOARDING_SLIDES.length - 1
                ? 'Get Started'
                : 'Next'}
            </Text>
          </Pressable>
        </View>

        {/* Skip Button */}
        {currentSlide < ONBOARDING_SLIDES.length - 1 && (
          <Pressable onPress={handleSkip} style={styles.skipButton}>
            <Text style={[styles.skipText, { color: colors.muted }]}>
              Skip
            </Text>
          </Pressable>
        )}
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  splashContent: {
    alignItems: 'center',
    gap: 16,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  splashIcon: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  splashTitle: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 8,
  },
  splashSubtitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  slideContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    gap: 24,
  },
  slideIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slideIcon: {
    fontSize: 64,
  },
  slideTitle: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
  },
  slideDescription: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  progressContainer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    gap: 8,
  },
  progressBar: {
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 16,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingBottom: 24,
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
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
    fontSize: 16,
    fontWeight: '600',
  },
  skipButton: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  skipText: {
    fontSize: 14,
    fontWeight: '500',
  },
});
