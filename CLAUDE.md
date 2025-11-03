# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

CRMBuild is a React Native mobile application for CRM (Customer Relationship Management) functionality. The app supports both iOS and Android platforms and uses TypeScript alongside JavaScript.

## Development Commands

### Starting the Development Server
```bash
npm start              # Start Metro bundler
```

### Running on Devices/Emulators
```bash
npm run android        # Run on Android emulator or connected device
npm run ios            # Run on iOS simulator or connected device
```

### iOS-Specific Setup
Before running on iOS for the first time or after updating native dependencies:
```bash
cd ios
bundle install         # Install CocoaPods (first time only)
bundle exec pod install # Install native dependencies
cd ..
```

### Code Quality
```bash
npm run lint           # Run ESLint
npm test               # Run Jest tests
```

### Running Single Test File
```bash
npx jest path/to/test/file.test.js
```

## Architecture

### Navigation Structure

The app uses a multi-layered navigation architecture with React Navigation:

1. **RootNavigator** (`src/navigation/RootNavigator.js`)
   - Root-level navigator that handles authentication state
   - Switches between `AuthStack` (login/signup flows) and `AppStack` (main app)
   - Uses AsyncStorage to persist authentication token (`userToken`)
   - **Note**: Lines 33-34 show inverted logic (returns AuthStack when authenticated) - this appears to be for development/testing

2. **AppStack** (`src/navigation/AppStack.js`)
   - Contains the main authenticated app navigation
   - Wraps TabNavigator for bottom tab navigation

3. **TabNavigator** (`src/navigation/TabNavigator.js`)
   - Bottom tab navigation with custom tab bar (`CustomTabBar`)
   - Four main tabs:
     - **HomeTab**: HomeStack (dashboard/main screen)
     - **LeadsTab**: LeadsStack (leads management)
     - **ScheduleTab**: ScheduleStack (scheduling features)
     - **ClientReachTab**: ClientReachStack (client communication)

4. **Stack Navigators**
   - Each tab has its own stack navigator in `src/navigation/stacks/`
   - Allows nested navigation within each tab (e.g., HomeScreen → HomeDetails)

5. **AuthStack** (`src/navigation/AuthStack.js`)
   - Handles authentication flow screens (Onboarding, Login, Signup, ForgotPassword)

### Theme System

The app implements a centralized theming system supporting light/dark modes:

- **ThemeContext** (`src/context/ThemeContext.js`)
  - Provides `AppThemeProvider` wrapper component
  - Exposes `useAppTheme()` hook for accessing current theme
  - Automatically detects system appearance and switches themes
  - Listens to system theme changes

- **Theme Configuration** (`src/theme/theme.js`)
  - `lightTheme` and `darkTheme` objects contain:
    - `colors`: Color palette (night, white, midnightgreen, etc.)
    - `fonts`: Font family definitions (Inter font family)
    - `radius`: Border radius tokens (radius1-radius10)
    - `spacings`: Spacing scale (spacing1-spacing15)
    - `typography`: Text style definitions (imported from typography.js)

- **Usage Pattern**:
  ```javascript
  import { useAppTheme } from '../context/ThemeContext';

  const Component = () => {
    const { theme } = useAppTheme();
    return <View style={{ backgroundColor: theme.colors.white }} />;
  };
  ```

### Icon System

Custom icon implementation using PNG assets:

- **IconComponent** (`src/assets/icons/CustomIcon.jsx`)
  - Centralized icon component using local PNG files
  - Takes `name`, `width`, `height`, `style`, and `tintColour` props
  - Icon files located in `src/assets/icons/`
  - Available icons: home-1, user, calendar, mail-1, activity, settings, search, etc.
  - Uses React Native's `Image` component with tintColor for theming

### Screen Organization

Screens are organized by feature area:

- **Auth Screens** (`src/screens/auth/`)
  - OnboardingScreen, LoginScreen, SignupScreen, ForgotPassword, SplashScreen

- **Tab Screens** (`src/screens/tabs/`)
  - Each tab has its own directory with homepage and detail screens
  - `home/`: HomeScreen, HomeDetails, HomeHeader component, ActionItemWidget components
  - `leads/`: LeadsHomepage, LeadDetails
  - `schedule/`: ScheduleHomepage
  - `client-react/`: ClientReachHomepage
  - `leaderboard/`: LeaderboardHomepage

### Component Structure

Reusable components located in `src/components/`:
- `buttons/`: MainButton, UnderlineTextButton
- `logo/`: Logo component

## Key Technologies

- **React Native 0.82.1**: Core framework
- **React 19.1.1**: Latest React version
- **React Navigation**: Navigation library (native-stack, bottom-tabs)
- **AsyncStorage**: Local storage for persistence
- **Axios**: HTTP client for API calls
- **react-native-vector-icons**: Icon library (though custom IconComponent is primary)
- **react-native-iconify**: Alternative icon system
- **expo-linear-gradient**: Gradient backgrounds
- **react-native-svg**: SVG support
- **react-native-reanimated**: Animations

## Important Notes

- The app uses a mix of `.js` and `.jsx` file extensions
- TypeScript configuration is present but many files are still JavaScript
- Node.js version >=20 required
- Custom fonts: Inter family (Medium, Bold)
- Authentication flow reversed in development (see RootNavigator.js:34)
