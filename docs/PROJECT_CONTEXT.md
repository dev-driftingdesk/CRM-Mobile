# PROJECT_CONTEXT.md

> Last Updated: 2025-11-19 (Schedule components review)
> Purpose: Comprehensive reference for understanding this codebase

---

## Project Overview

**CRMBuild** is a React Native mobile CRM application for sales teams to manage leads, track deals, schedule activities, and monitor performance. The app connects to a backend API hosted on Azure Container Apps.

**Current Status**: Active mid-development with core lead management features functional

**Platforms**: iOS and Android

---

## Tech Stack

### Core Framework
- **React Native**: 0.82.1
- **React**: 19.1.1
- **TypeScript**: 5.8.3 (configured but most files are JavaScript)
- **Node.js**: >=20 required

### State Management
- **Redux Toolkit**: 2.9.2
- **React Redux**: 9.2.0

### Navigation
- **@react-navigation/native**: 7.1.18
- **@react-navigation/native-stack**: 7.5.0
- **@react-navigation/bottom-tabs**: 7.5.0

### API & Storage
- **Axios**: 1.13.1
- **AsyncStorage**: 2.2.0

### UI Libraries
- **react-native-reanimated**: 4.1.3
- **react-native-modal**: 14.0.0-rc.1
- **expo-linear-gradient**: 15.0.7
- **react-native-svg**: 15.14.0
- **react-native-vector-icons**: 10.3.0

---

## Directory Structure

```
CRMBuild/
├── android/                    # Android native code
├── ios/                        # iOS native code
├── src/
│   ├── assets/
│   │   ├── fonts/              # Inter font family
│   │   ├── icons/              # 53 PNG icon files + CustomIcon.jsx
│   │   └── images/             # App images
│   ├── axios/
│   │   └── api.js              # Axios instance with interceptors
│   ├── components/
│   │   ├── buttons/            # MainButton, UnderlineTextButton
│   │   ├── input/              # Input components
│   │   ├── leadcard/           # LeadCard component
│   │   ├── logo/               # Logo component
│   │   ├── modal/              # Modal components
│   │   ├── schedule/           # CalendarGrid, ScheduleItemCard
│   │   ├── switch/             # Switch components
│   │   └── widgets/            # ActionItemWidget, etc.
│   ├── context/
│   │   └── ThemeContext.js     # Theme provider with light/dark modes
│   ├── data/
│   │   └── scheduleData.js     # Sample schedule data
│   ├── navigation/
│   │   ├── RootNavigator.js    # Auth state switching
│   │   ├── AppStack.js         # Main app wrapper
│   │   ├── AuthStack.js        # Auth flow screens
│   │   ├── TabNavigator.js     # Bottom tab navigation
│   │   ├── CustomTabBar.js     # Custom tab bar component
│   │   └── stacks/             # Stack navigators for each tab
│   │       ├── HomeStack.js
│   │       ├── LeadsStack.js
│   │       ├── ScheduleStack.js
│   │       ├── ClientReachStack.js
│   │       └── LeaderboardStack.js
│   ├── screens/
│   │   ├── auth/               # Login, Signup, Onboarding, etc.
│   │   ├── search/             # SearchScreen
│   │   └── tabs/
│   │       ├── home/           # HomeScreen, ActionItems, etc.
│   │       ├── leads/          # LeadsHomepage, CreateLead wizard
│   │       ├── schedule/       # ScheduleHomepage
│   │       ├── client-react/   # ClientReachHomepage (stub)
│   │       └── leaderboard/    # LeaderboardHomepage (stub)
│   ├── services/
│   │   ├── auth-service/       # Authentication API calls
│   │   ├── lead-service/       # Leads API calls
│   │   ├── deal-service/       # Deals API calls
│   │   ├── product-service/    # Products API calls
│   │   └── user-service/       # Users API calls
│   ├── store/
│   │   ├── index.js            # Redux store configuration
│   │   └── slices/
│   │       ├── auth/           # authSlice, thunk
│   │       ├── leads/          # leadsSlice, leadsThunks
│   │       ├── deals/          # dealsSlice, dealsThunks
│   │       ├── products/       # productsSlice, productsThunks
│   │       └── users/          # usersSlice, usersThunks
│   ├── theme/
│   │   ├── theme.js            # Light/dark theme definitions
│   │   └── typography.js       # Text style definitions
│   └── utils/
│       └── debugAuth.js        # Auth debugging utility
├── App.js                      # App entry point
├── package.json
├── CLAUDE.md                   # Claude Code instructions (partially outdated)
└── PROJECT_CONTEXT.md          # This file
```

---

## Architecture

### Navigation Flow

```
RootNavigator (Redux auth state)
├── AuthStack (when !isAuthenticated)
│   ├── Onboarding
│   ├── Login
│   ├── Signup
│   └── ForgotPassword
└── AppStack (when isAuthenticated)
    └── TabNavigator
        ├── HomeTab → HomeStack (8 screens)
        ├── LeadsTab → LeadsStack (6 screens)
        ├── ScheduleTab → ScheduleStack (1 screen)
        └── ClientReachTab → ClientReachStack (1 screen)
```

### State Management (Redux)

5 slices configured in `src/store/index.js`:
- **auth**: Authentication state, user info
- **leads**: Leads list, loading/error states
- **deals**: Deals management
- **products**: Products catalog
- **users**: User management

### API Configuration

**Base URL**: `https://ceedpodservice.wittycliff-5b88c7b4.westus2.azurecontainerapps.io/api/v1`

**Authentication**: Bearer token stored in AsyncStorage (key: `accessToken`)

**Interceptors**:
- Request: Attaches auth token to all requests
- Response: Clears tokens on 401 errors

### Theme System

Access via `useAppTheme()` hook from `src/context/ThemeContext.js`:
```javascript
const { theme } = useAppTheme();
// Use: theme.colors.primary, theme.spacings.spacing4, etc.
```

---

## Implementation Status

### Complete Features
- Login/Authentication with JWT tokens
- Home dashboard with action items
- Leads management (list, search, filter, create)
- Multi-step lead creation wizard (3 steps)
- Deal details with tabs and bottom sheets
- **Schedule system** - Componentized with:
  - CalendarGrid (month navigation, event indicators, date selection)
  - ScheduleItemCard (time, type badge, deal/contact sections)
  - View modes (Month/Week/Overview)
  - Helper functions for date formatting and event mapping
- Search with recent searches/visited

### Stub/Placeholder Screens
- `HomeDetails.js` - Just displays text
- `ClientReachHomepage.js` - Only logout button
- `LeaderboardHomepage.js` - Emoji placeholder
- `LeadDetails.js` - Minimal implementation

### Commented Out Features
- LeaderboardTab in TabNavigator (line 90)

---

## Known Issues & Technical Debt

### Critical (Must Fix Before Production)

1. **Hardcoded Test Credentials** - `src/screens/auth/LoginScreen.js:39-43`
   ```javascript
   setForm({
     email: 'admin@ceedpods2.com',
     password: 'AdminPass123',
   });
   ```

2. **AsyncStorage Key Mismatch**
   - `src/axios/api.js:21` uses `accessToken`
   - `src/navigation/RootNavigator.js:16` uses `ACCESS_TOKEN`
   - Must standardize to `accessToken`

3. **API Error Handler Bug** - `src/axios/api.js:57`
   - Currently: `return error;`
   - Should be: `return Promise.reject(error);`

### Medium Priority

4. **MainButton Theme Bug** - `src/components/buttons/mainbutton/MainButton.jsx:9`
   - Uses `theme.theme.colors` instead of `theme.colors`

5. **Missing Error Handling** - `src/store/slices/leads/leadsThunks.js`
   - `fetchLeads` has no try-catch block

6. **Theme Not Applied** - `src/screens/tabs/client-react/ClientReachHomepage.js`
   - Uses hardcoded colors instead of theme

---

## Key Files Reference

### Entry Points
- `App.js` - Application entry
- `src/navigation/RootNavigator.js` - Navigation root with auth switching

### Configuration
- `package.json` - Dependencies and scripts
- `src/store/index.js` - Redux store setup
- `src/axios/api.js` - API configuration
- `src/theme/theme.js` - Theme definitions

### Core Screens
- `src/screens/auth/LoginScreen.js` - Authentication (225 lines)
- `src/screens/tabs/home/HomeScreen.js` - Dashboard (93 lines)
- `src/screens/tabs/leads/LeadsHomepage.js` - Leads list (358 lines)
- `src/screens/tabs/schedule/ScheduleHomepage.js` - Calendar (299 lines)

### Schedule Components
- `src/components/schedule/CalendarGrid.jsx` - Monthly calendar with navigation (276 lines)
- `src/components/schedule/ScheduleItemCard.jsx` - Schedule item display card (221 lines)
- `src/data/scheduleData.js` - Sample data and helper functions (303 lines)

### State Management
- `src/store/slices/auth/authSlice.js` - Auth reducer
- `src/store/slices/auth/thunk.js` - Login thunk
- `src/store/slices/leads/leadsSlice.js` - Leads reducer
- `src/store/slices/leads/leadsThunks.js` - Leads async actions

### Services
- `src/services/auth-service/index.js` - Auth API calls
- `src/services/lead-service/leadsService.js` - Leads API calls

---

## Development Commands

```bash
# Start Metro bundler
npm start

# Run on platforms
npm run android
npm run ios

# iOS setup (first time)
cd ios && bundle install && bundle exec pod install && cd ..

# Code quality
npm run lint
npm test
```

---

## Authentication Flow

```
1. User enters credentials in LoginScreen
2. dispatch(loginUser(credentials)) → src/store/slices/auth/thunk.js
3. POST /auth/login via loginUserApi()
4. Response: { accessToken, refreshToken, email }
5. AsyncStorage.setItem('accessToken', token)
6. Redux: state.auth.isAuthenticated = true
7. RootNavigator renders AppStack instead of AuthStack
8. User sees TabNavigator with HomeScreen
```

---

## Data Flow (Leads Example)

```
1. HomeScreen/LeadsHomepage mounts
2. dispatch(fetchLeads()) → src/store/slices/leads/leadsThunks.js
3. leadsService.getAllLeads() → src/services/lead-service/leadsService.js
4. api.get('/leads') with Bearer token
5. Redux: state.leads.leads = response.data.data
6. Component: useSelector(state => state.leads)
7. Render LeadCard components
```

---

## Recent Development Focus

Based on git history:
- User management features (latest)
- Search page implementation
- Products management
- Deals management
- Schedule homepage
- Android release preparation

---

## Notes for Future Development

1. **CLAUDE.md is partially outdated** - Auth logic description is wrong (line 35 is correct, not inverted)

2. **TypeScript migration** - tsconfig exists but most files are JavaScript

3. **Test coverage** - Only basic App.test.tsx exists

4. **Environment variables** - No .env setup; API URLs and test credentials are hardcoded

5. **Logout flow** - ClientReachHomepage has logout but doesn't clear Redux state properly

---

## Contact & Resources

- **Backend API**: Azure Container Apps (West US 2)
- **Design References**: `src/ref_images/` contains 27 reference images
