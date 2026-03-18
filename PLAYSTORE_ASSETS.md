# Google Play Store Assets for TaskFlow App

This directory contains all the necessary assets for publishing TaskFlow App on the Google Play Store.

## Asset Files

### App Icons

| File | Dimensions | Purpose | Location |
|------|-----------|---------|----------|
| `icon-512x512.png` | 512×512 px | Google Play Store app listing icon | `playstore-assets/` |
| `icon.png` | 256×256 px | App launcher icon (included in app) | `assets/images/` |

### Feature Graphics

| File | Dimensions | Purpose | Location |
|------|-----------|---------|----------|
| `feature-graphic-1024x500.png` | 1024×500 px | Google Play Store feature graphic (banner) | CDN (see below) |

### Screenshots

All screenshots are in 9:16 aspect ratio (standard for mobile phones):

| File | Dimensions | Description |
|------|-----------|-------------|
| `screenshot-1-home.png` | 1024×1536 px | Home screen showing task summary and empty state |
| `screenshot-2-add-task.png` | 1024×1536 px | Add Task form with all fields and options |
| `screenshot-3-tasks-list.png` | 1024×1536 px | Task list with multiple tasks and filtering |
| `screenshot-4-settings.png` | 1024×1536 px | Settings screen with theme and preferences |

## Google Play Store Submission Checklist

### Before Upload

- [ ] Verify all assets are in correct dimensions
- [ ] Check that screenshots accurately represent the app's current UI
- [ ] Ensure app icon is clear and recognizable at small sizes
- [ ] Review feature graphic for text clarity and branding consistency

### Asset Upload Instructions

1. **App Icon (512×512)**
   - Upload to: Google Play Console → Your app → Store listing → App icon
   - File: `icon-512x512.png`

2. **Feature Graphic (1024×500)**
   - Upload to: Google Play Console → Your app → Store listing → Feature graphic
   - File: `feature-graphic-1024x500.png`

3. **Screenshots**
   - Upload to: Google Play Console → Your app → Store listing → Phone screenshots
   - Upload all four screenshots in order:
     1. `screenshot-1-home.png` - Home screen
     2. `screenshot-2-add-task.png` - Add task form
     3. `screenshot-3-tasks-list.png` - Task list
     4. `screenshot-4-settings.png` - Settings

### Screenshot Captions (Optional but Recommended)

Add these captions to your screenshots for better user understanding:

**Screenshot 1 (Home):**
"Stay organized with TaskFlow - View your tasks at a glance with summary statistics"

**Screenshot 2 (Add Task):**
"Create tasks with full details - Set priorities, due dates, categories, and reminders"

**Screenshot 3 (Task List):**
"Manage all your tasks - Filter by category, search, and track progress"

**Screenshot 4 (Settings):**
"Customize your experience - Choose your theme and manage preferences"

## Asset Specifications

### Color Scheme

- **Primary Color**: #0a7ea4 (Teal/Blue)
- **Secondary Color**: #17a2b8 (Cyan)
- **Accent Colors**: Green (#22C55E), Orange (#F59E0B), Red (#EF4444)
- **Background**: White (#FFFFFF) / Dark (#151718)

### Typography

- **Font**: Modern, clean sans-serif (system fonts)
- **Hierarchy**: Clear distinction between headings and body text
- **Contrast**: High contrast for readability on all devices

### Design Principles

- Clean, minimalist design
- iOS-like aesthetic with proper spacing
- Professional appearance suitable for productivity apps
- Consistent branding across all assets

## File Locations

Assets are stored in the project at:

```
TaskFlowApp/
├── playstore-assets/
│   ├── icon-512x512.png
│   ├── screenshot-1-home.png
│   ├── screenshot-2-add-task.png
│   ├── screenshot-3-tasks-list.png
│   └── screenshot-4-settings.png
├── assets/images/
│   ├── icon.png
│   ├── splash-icon.png
│   └── favicon.png
```

### CDN URLs

Large media files are hosted on CDN for optimal performance:

- **Feature Graphic**: https://d2xsxph8kpxj0f.cloudfront.net/310519663099771312/CrrYrVDt9ySmPx8J89oifB/feature-graphic-1024x500-PqSeKxzEmF5dBs2b4kWod5.webp

## Notes

- All screenshots were generated to accurately represent the app's UI and user experience
- Assets follow Google Play Store guidelines and requirements
- Images are optimized for web display while maintaining high quality
- Feature graphic includes key app features and branding elements
- Large media files (>1MB) are hosted on CDN for optimal deployment performance

## Support

For questions about Google Play Store submission, refer to:
- [Google Play Console Help](https://support.google.com/googleplay/android-developer)
- [App Store Listing Guidelines](https://support.google.com/googleplay/android-developer/answer/113469)
