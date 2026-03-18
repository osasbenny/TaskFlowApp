# TaskFlow App - Build Instructions

## Option A: Test with Expo Go (Immediate - No Build Required)

### Step 1: Install Expo Go
- **iOS**: Download from [Apple App Store](https://apps.apple.com/app/expo-go/id982107779)
- **Android**: Download from [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

### Step 2: Scan QR Code
1. Open Expo Go app on your phone
2. Tap the **QR Code** icon at the bottom
3. Scan this QR code:
   ```
   exps://8081-i4sjekqsttiip1wqyxeqv-02754a72.us1.manus.computer
   ```
   Or scan the image: `expo-qr-code.png`

### Step 3: Test the App
The app will load in Expo Go. You can now:
- Create and manage tasks
- Set priorities and categories
- Configure reminders
- Test all features

**Note**: Expo Go is for development/testing only. For production, use Option B or C.

---

## Option B: Build AAB Locally (Production-Ready, API Level 35)

### Prerequisites
```bash
# Install Node.js 18+ and npm/pnpm
node --version  # Should be v18+
pnpm --version  # Should be v9+

# Install EAS CLI globally
npm install -g eas-cli
```

### Step 1: Clone the Repository
```bash
git clone https://github.com/osasbenny/TaskFlowApp.git
cd TaskFlowApp
```

### Step 2: Install Dependencies
```bash
pnpm install
```

### Step 3: Build AAB with API Level 35
```bash
# Build for Android (AAB format - for Google Play)
eas build --platform android --non-interactive

# Or build APK (for direct installation)
eas build --platform android --non-interactive --local
```

### Step 4: Download Build
- Check build status: `eas build:list`
- Download the AAB from the Expo dashboard
- Upload to Google Play Console

### Build Configuration
The app is configured with:
- **Target SDK**: 35 (Google Play 2026 requirement)
- **Min SDK**: 24 (Android 7.0+)
- **Compile SDK**: 35
- **Architecture**: arm64-v8a, armeabi-v7a

---

## Option C: Build with EAS (Recommended for Production)

### Step 1: Create Expo Account
1. Go to [expo.dev](https://expo.dev)
2. Sign up for a free account
3. Verify your email

### Step 2: Setup EAS Locally
```bash
# Install EAS CLI
npm install -g eas-cli

# Login to your Expo account
eas login

# Initialize EAS in your project
eas init --id <your-project-id>
```

### Step 3: Configure EAS Build
Create `eas.json` in project root:
```json
{
  "build": {
    "production": {
      "android": {
        "buildType": "app-bundle",
        "env": {
          "EXPO_PUBLIC_API_URL": "https://api.taskflowapp.com"
        }
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

### Step 4: Build and Submit
```bash
# Build AAB with API 35
eas build --platform android --profile production

# Submit to Google Play (requires credentials)
eas submit --platform android --latest
```

### Step 5: Monitor Build
- Check status: `eas build:list`
- View logs: `eas build:view <build-id>`
- Download artifact when complete

---

## Google Play Store Submission

### Required Files
- ✅ AAB (Android App Bundle) - Built with API 35
- ✅ App icon (512x512)
- ✅ Feature graphic (1024x500)
- ✅ Screenshots (4x 1024x1536)
- ✅ Privacy Policy
- ✅ Data Safety info

### Submission Steps
1. Go to [Google Play Console](https://play.google.com/console)
2. Create new app
3. Fill in app details
4. Upload AAB
5. Add store listing content
6. Submit for review

### Compliance Checklist
- ✅ API Level 35 (2026 requirement)
- ✅ Privacy Policy linked
- ✅ Data safety disclosed
- ✅ Permissions justified
- ✅ Content rating completed

---

## Troubleshooting

### Build Fails
```bash
# Clear cache and rebuild
eas build --platform android --clear-cache

# Check logs
eas build:view <build-id> --logs
```

### API Level Issues
```bash
# Verify configuration
cat app.config.ts | grep -A 5 "targetSdkVersion"
```

### EAS Login Issues
```bash
# Logout and login again
eas logout
eas login
```

### APK Installation
```bash
# Install APK on connected device
adb install build.apk

# Or use Expo Go for testing
```

---

## Build Times
- **Option A (Expo Go)**: Instant ✨
- **Option B (Local Build)**: 5-10 minutes
- **Option C (EAS Cloud)**: 10-15 minutes

---

## Support
- Expo Docs: https://docs.expo.dev
- EAS Build: https://docs.expo.dev/build/introduction/
- Google Play: https://play.google.com/console/about/

---

**Last Updated**: March 18, 2026
**API Level**: 35 (Google Play 2026 Compliant)
**Expo SDK**: 54.0.0
