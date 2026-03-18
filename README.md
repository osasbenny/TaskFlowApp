# TaskFlow App

**TaskFlow** is a modern, offline-first task management application built with React Native and Expo. It provides a clean, intuitive interface for managing daily tasks, setting priorities, and organizing work across multiple categories.

## Features

### Core Functionality

**Task Management** — Create, edit, and delete tasks with full control over task properties. Each task supports title, detailed notes, priority levels (high, medium, low), and category assignment.

**Smart Filtering** — View tasks by filter including Today's tasks, upcoming deadlines, completed items, and all tasks. The app intelligently groups and displays tasks based on your selected view.

**Priority System** — Assign priority levels to tasks with visual indicators. High-priority tasks are highlighted in red, medium in orange, and low-priority tasks in green for quick visual scanning.

**Category Organization** — Organize tasks into categories including Personal, Work, Shopping, Health, and Study. Custom categories can be created to match your workflow.

**Due Dates & Times** — Set specific due dates and times for tasks. The app displays due dates prominently and helps you stay on track with your schedule.

**Reminders** — Enable optional reminders for tasks. When enabled, you'll receive local notifications at the scheduled time to ensure you don't miss important deadlines.

**Offline-First Design** — All data is stored locally on your device using AsyncStorage. No internet connection is required, and your data remains private and under your control.

**Dark Mode Support** — The app automatically adapts to your device's theme preference, supporting both light and dark modes for comfortable use in any lighting condition.

### User Experience

**Intuitive Interface** — The design follows Apple's Human Interface Guidelines, providing a familiar experience for iOS users. The interface is clean, minimal, and focused on productivity.

**Quick Actions** — Access the floating action button to quickly add new tasks from any screen. Search functionality allows you to find tasks by title or notes.

**Task Statistics** — View at-a-glance statistics showing today's task count, upcoming tasks, and completed items on the home screen.

**Persistent State** — All changes are automatically saved to local storage, ensuring your data is never lost even if the app is closed unexpectedly.

## Installation

### Prerequisites

- Node.js 18+ and npm or pnpm
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (macOS) or Android Emulator, or a physical device with Expo Go app

### Setup

1. Clone the repository:
```bash
git clone https://github.com/osasbenny/TaskFlowApp.git
cd TaskFlowApp
```

2. Install dependencies:
```bash
pnpm install
```

3. Start the development server:
```bash
pnpm dev
```

4. Open the app:
   - **iOS Simulator**: Press `i` in the terminal
   - **Android Emulator**: Press `a` in the terminal
   - **Physical Device**: Scan the QR code with Expo Go app

## Project Structure

```
TaskFlowApp/
├── app/                          # Expo Router app directory
│   ├── (tabs)/                   # Tab-based navigation
│   │   ├── _layout.tsx          # Tab layout configuration
│   │   └── index.tsx            # Home screen
│   ├── add-task.tsx             # Add/edit task screen
│   ├── settings.tsx             # Settings screen
│   └── _layout.tsx              # Root layout with providers
├── src/
│   ├── components/              # Reusable UI components
│   │   ├── TaskCard.tsx         # Task list item component
│   │   ├── Button.tsx           # Reusable button component
│   │   ├── Input.tsx            # Text input component
│   │   ├── EmptyState.tsx       # Empty state placeholder
│   │   └── ConfirmDialog.tsx    # Confirmation modal
│   ├── hooks/                   # Custom React hooks
│   │   └── useTaskManager.ts    # Task management hook with persistence
│   ├── services/                # Business logic services
│   │   ├── storageService.ts    # AsyncStorage persistence
│   │   └── notificationService.ts # Local notifications
│   ├── store/                   # State management
│   │   └── taskStore.ts         # Zustand task store
│   ├── types/                   # TypeScript type definitions
│   │   └── index.ts             # Task, Category, Settings types
│   └── utils/                   # Utility functions
│       └── dateUtils.ts         # Date/time helpers
├── components/                  # Shared components
│   ├── screen-container.tsx     # SafeArea wrapper
│   └── ui/
│       └── icon-symbol.tsx      # Icon mapping
├── assets/
│   └── images/                  # App icons and splash screen
├── app.config.ts                # Expo configuration
├── tailwind.config.js           # Tailwind CSS configuration
├── theme.config.js              # Theme color definitions
└── package.json                 # Project dependencies
```

## Technology Stack

| Technology | Purpose |
|-----------|---------|
| **React Native** | Cross-platform mobile development |
| **Expo SDK 54** | Managed React Native framework |
| **TypeScript** | Type-safe JavaScript |
| **Zustand** | Lightweight state management |
| **AsyncStorage** | Local data persistence |
| **NativeWind** | Tailwind CSS for React Native |
| **Expo Router** | File-based routing |
| **Expo Notifications** | Local push notifications |

## Development

### Available Scripts

```bash
# Start development server
pnpm dev

# Run on iOS simulator
pnpm ios

# Run on Android emulator
pnpm android

# Type checking
pnpm check

# Linting
pnpm lint

# Format code
pnpm format

# Run tests
pnpm test
```

### Code Style

The project uses Prettier for code formatting and ESLint for linting. Code is automatically formatted on save in most editors.

### TypeScript

All code is written in TypeScript for type safety. Type definitions are located in `src/types/index.ts`.

## Data Storage

TaskFlow uses AsyncStorage for local data persistence. All data is stored on the device and never transmitted to external servers. The app stores:

- **Tasks**: Complete task objects with all properties
- **Categories**: User-defined and default categories
- **Settings**: User preferences including theme and notification settings

Data is automatically saved whenever changes are made and loaded when the app starts.

## Notifications

Local notifications are handled through Expo Notifications. When a task reminder is enabled, the app schedules a local notification for the specified date and time. Notifications are delivered even if the app is closed.

### Permission Requirements

The app requests notification permissions on first launch. Users can grant or deny permissions, and can modify settings later in the device's notification settings.

## Customization

### Theme Colors

Edit `theme.config.js` to customize the app's color palette:

```javascript
const themeColors = {
  primary: { light: '#0a7ea4', dark: '#0a7ea4' },
  background: { light: '#ffffff', dark: '#151718' },
  // ... other colors
};
```

### Categories

Default categories are defined in `src/store/taskStore.ts`. Users can create additional categories through the app interface.

### Priority Colors

Priority colors are defined in `src/components/TaskCard.tsx`:

```typescript
const PRIORITY_COLORS = {
  high: '#EF4444',    // Red
  medium: '#F59E0B',  // Orange
  low: '#22C55E',     // Green
};
```

## Performance Considerations

- **FlatList Usage**: Task lists use FlatList for optimal scrolling performance
- **Memoization**: Components are optimized to prevent unnecessary re-renders
- **Async Operations**: Heavy operations like data loading are handled asynchronously
- **Storage Optimization**: Data is efficiently stored and retrieved from AsyncStorage

## Known Limitations

- **Offline Only**: The app is designed as offline-first and does not sync data across devices
- **Local Notifications**: Reminders require the app or system to be running; they won't trigger if the device is powered off
- **Storage Limits**: AsyncStorage has device-specific limits (typically 10MB per app)

## Future Enhancements

Potential features for future releases include:

- Cloud synchronization across devices
- Recurring tasks and subtasks
- Task attachments and file uploads
- Collaborative task sharing
- Advanced filtering and search
- Data export functionality
- Widget support for home screen quick access

## Privacy & Data Safety

TaskFlow respects your privacy:

- **No Data Collection**: The app does not collect or transmit any personal data
- **Local Storage Only**: All data is stored exclusively on your device
- **No Analytics**: The app does not track usage or behavior
- **Open Source**: The codebase is transparent and auditable

For detailed information, see [PRIVACY.md](./PRIVACY.md) and [DATA_SAFETY.md](./DATA_SAFETY.md).

## Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For issues, feature requests, or questions, please open an issue on the GitHub repository.

## Acknowledgments

- Built with [Expo](https://expo.dev/)
- Styled with [NativeWind](https://www.nativewind.dev/)
- State management with [Zustand](https://github.com/pmndrs/zustand)
- Icons from [Material Icons](https://fonts.google.com/icons)

---

**Version**: 1.0.0  
**Last Updated**: March 2026  
**Maintainer**: TaskFlow Team
