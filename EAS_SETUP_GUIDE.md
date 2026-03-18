# EAS Setup Guide for TaskFlow App

## What is EAS?

**EAS (Expo Application Services)** is a cloud-based build service that:
- Builds your app in the cloud (no local setup needed)
- Generates production-ready AAB/APK files
- Handles code signing automatically
- Supports iOS and Android
- Integrates with Google Play and App Store

---

## Quick Start (5 Minutes)

### 1. Create Free Expo Account
```bash
# Go to https://expo.dev and sign up
# Verify your email
```

### 2. Install EAS CLI
```bash
npm install -g eas-cli
```

### 3. Login to Expo
```bash
eas login
# Enter your Expo credentials
```

### 4. Initialize EAS in Project
```bash
cd /home/ubuntu/TaskFlowApp
eas init
# Follow prompts to create EAS project
```

### 5. Build AAB
```bash
eas build --platform android --non-interactive
```

### 6. Download Build
- Go to https://expo.dev/dashboard
- Find your build in "Builds" section
- Download the AAB file

---

## Detailed Setup

### Step 1: Create Expo Account

**Option A: Web Signup**
1. Visit https://expo.dev
2. Click "Sign up"
3. Enter email and password
4. Verify email
5. Create organization (optional)

**Option B: CLI Signup**
```bash
eas register
# Follow prompts to create account
```

### Step 2: Install EAS CLI

```bash
# Install globally
npm install -g eas-cli

# Verify installation
eas --version
```

### Step 3: Authenticate

```bash
# Login with your Expo account
eas login

# Verify login
eas whoami
```

### Step 4: Initialize EAS Project

```bash
cd /home/ubuntu/TaskFlowApp

# Initialize EAS
eas init

# You'll be asked:
# - Project name (use: TaskFlowApp)
# - Platform (select: Android)
# - Accept defaults for other prompts
```

This creates `eas.json` in your project root.

### Step 5: Configure Build Settings

Edit `eas.json`:

```json
{
  "cli": {
    "version": ">= 5.0.0"
  },
  "build": {
    "production": {
      "android": {
        "buildType": "app-bundle",
        "gradleCommand": ":app:bundleRelease",
        "withoutCredentials": true
      }
    },
    "preview": {
      "android": {
        "buildType": "apk"
      }
    }
  },
  "submit": {
    "production": {
      "android": {
        "serviceAccountKeyPath": "./google-play-key.json",
        "track": "internal"
      }
    }
  }
}
```

---

## Building with EAS

### Build AAB (For Google Play)

```bash
# Build for production
eas build --platform android --profile production

# Or use default settings
eas build --platform android
```

### Build APK (For Direct Installation)

```bash
# Build APK for testing
eas build --platform android --profile preview
```

### Monitor Build

```bash
# List all builds
eas build:list

# View specific build
eas build:view <build-id>

# Watch build logs
eas build:view <build-id> --logs
```

### Download Build

1. Go to https://expo.dev/dashboard
2. Select your project
3. Click "Builds" tab
4. Find your build
5. Click download icon
6. Save AAB file

---

## Submitting to Google Play

### Prerequisites

1. **Google Play Developer Account** ($25 one-time fee)
   - Go to https://play.google.com/console
   - Sign in with Google account
   - Pay registration fee

2. **Service Account Key**
   - Go to Google Cloud Console
   - Create service account
   - Generate JSON key
   - Save as `google-play-key.json`

### Submission Steps

```bash
# Submit build to Google Play
eas submit --platform android --latest

# Or submit specific build
eas submit --platform android --build-id <build-id>
```

### Manual Submission

1. Download AAB from EAS
2. Go to Google Play Console
3. Create new app
4. Upload AAB in "Production" release
5. Fill in store listing
6. Submit for review

---

## Environment Variables

### Set Build-Time Variables

```bash
# In eas.json
{
  "build": {
    "production": {
      "android": {
        "env": {
          "API_URL": "https://api.taskflowapp.com",
          "SENTRY_DSN": "https://..."
        }
      }
    }
  }
}
```

### Access in Code

```javascript
// In your app
const apiUrl = process.env.EXPO_PUBLIC_API_URL;
```

---

## Troubleshooting

### Build Fails

```bash
# Clear cache
eas build --platform android --clear-cache

# Rebuild
eas build --platform android
```

### Login Issues

```bash
# Logout
eas logout

# Login again
eas login

# Check status
eas whoami
```

### Build Stuck

```bash
# Cancel build
eas build:cancel <build-id>

# Retry
eas build --platform android
```

### View Detailed Logs

```bash
# Get full build logs
eas build:view <build-id> --logs

# Export logs
eas build:view <build-id> --logs > build.log
```

---

## Pricing

### Free Tier
- ✅ 30 builds/month
- ✅ Android builds
- ✅ Basic support

### Paid Plans
- **Pro**: $99/month - 1000 builds/month
- **Enterprise**: Custom pricing

---

## Best Practices

1. **Version Management**
   ```json
   {
     "version": "1.0.0",
     "buildNumber": 1
   }
   ```

2. **Test Before Building**
   ```bash
   pnpm test
   npm run lint
   ```

3. **Use Preview Builds First**
   ```bash
   eas build --platform android --profile preview
   ```

4. **Keep Credentials Secure**
   - Don't commit `google-play-key.json`
   - Use `.gitignore`
   - Rotate keys regularly

5. **Monitor Build Status**
   - Check email for notifications
   - Review build logs
   - Test downloaded APK/AAB

---

## Useful Commands

```bash
# List all commands
eas --help

# Build help
eas build --help

# Submit help
eas submit --help

# View account info
eas whoami

# Update EAS CLI
npm install -g eas-cli@latest

# Check project config
eas config
```

---

## Resources

- **Expo Docs**: https://docs.expo.dev
- **EAS Build**: https://docs.expo.dev/build/introduction/
- **EAS Submit**: https://docs.expo.dev/submit/introduction/
- **Google Play**: https://play.google.com/console
- **Community**: https://forums.expo.dev

---

## Support

- **Expo Support**: https://expo.dev/support
- **GitHub Issues**: https://github.com/expo/expo/issues
- **Discord**: https://chat.expo.dev

---

**Last Updated**: March 18, 2026
**EAS CLI Version**: 5.0.0+
**Expo SDK**: 54.0.0
