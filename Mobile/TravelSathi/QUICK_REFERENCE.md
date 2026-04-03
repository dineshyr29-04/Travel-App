# TravelSathi Mobile App - Quick Reference

## 🚀 Quick Start Commands

### 1. Install Dependencies
```bash
cd Mobile/TravelSathi
npm install
```

### 2. Environment Setup
```bash
cp .env.example .env
# Edit .env with your Firebase credentials and API endpoints
```

### 3. Start Development Server
```bash
npm start
```

### 4. Run on Device/Emulator
```bash
# iOS Simulator (Mac only)
npm run ios

# Android Emulator
npm run android

# Web Browser
npm run web
```

---

## 📁 Complete Folder Tree

```
Mobile/TravelSathi/
│
├── src/
│   ├── assets/
│   │   ├── images/          # App images and icons
│   │   └── fonts/           # Custom fonts
│   │
│   ├── components/
│   │   └── common/
│   │       ├── Button.tsx
│   │       ├── LoadingSpinner.tsx
│   │       └── index.ts
│   │
│   ├── screens/
│   │   ├── auth/
│   │   │   ├── LoginScreen.tsx
│   │   │   ├── SignupScreen.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── home/
│   │   │   ├── HomeScreen.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── trips/
│   │   │   ├── TripsScreen.tsx
│   │   │   ├── CreateTripScreen.tsx
│   │   │   ├── TripDetailsScreen.tsx
│   │   │   └── index.ts
│   │   │
│   │   └── profile/
│   │       ├── ProfileScreen.tsx
│   │       └── index.ts
│   │
│   ├── navigation/
│   │   ├── index.tsx        # RootNavigator
│   │   └── types.ts         # Navigation types
│   │
│   ├── services/
│   │   ├── api/
│   │   │   ├── client.ts    # Axios instance
│   │   │   └── endpoints.ts # API endpoints
│   │   │
│   │   └── auth/
│   │       └── firebase.ts  # Firebase auth service
│   │
│   ├── store/
│   │   ├── index.ts         # Redux store config
│   │   └── slices/
│   │       ├── authSlice.ts
│   │       ├── appSlice.ts
│   │       └── tripSlice.ts
│   │
│   ├── hooks/
│   │   └── useRedux.ts      # Custom Redux hooks
│   │
│   ├── utils/
│   │   ├── logger.ts        # Logging utility
│   │   └── validation.ts    # Input validation
│   │
│   ├── constants/
│   │   └── index.ts         # Global constants
│   │
│   ├── types/
│   │   └── index.ts         # TypeScript types
│   │
│   └── config/
│       └── env.ts           # Environment config
│
├── App.tsx                  # Main app component
├── app.json                 # Expo configuration
├── package.json             # Dependencies
├── tsconfig.json            # TypeScript config
├── .eslintrc.json          # ESLint config
├── .prettierrc              # Prettier config
├── .gitignore              # Git ignore rules
├── .env.example            # Environment template
├── README.md               # Setup guide
├── BEST_PRACTICES.md       # Code guidelines
└── QUICK_REFERENCE.md      # This file
```

---

## 📦 Installed Dependencies

### Core
- `react` - UI library
- `react-native` - Mobile framework
- `expo` - Development and deployment platform

### Navigation
- `@react-navigation/native` - Navigation library
- `@react-navigation/bottom-tabs` - Tab navigation
- `@react-navigation/native-stack` - Stack navigation

### State Management
- `@reduxjs/toolkit` - Redux state management
- `react-redux` - Redux React bindings

### API & Data
- `axios` - HTTP client
- `@tanstack/react-query` - Data fetching (optional)

### Development
- `typescript` - Type safety
- `prettier` - Code formatting
- `eslint` - Code linting
- `jest` - Testing framework

---

## 🎯 Common Tasks

### Add a New Screen
1. Create file: `src/screens/[feature]/[ScreenName].tsx`
2. Add route to navigation: `src/navigation/index.tsx`
3. Create Redux slice if needed: `src/store/slices/[feature]Slice.ts`

### Add a New Component
1. Create file: `src/components/[FeatureName].tsx`
2. Define interface for props
3. Export from component directory index

### Add an API Endpoint
1. Add endpoint to: `src/services/api/endpoints.ts`
2. Use in Redux thunk or component
3. Add type definition to: `src/types/index.ts`

### Connect to Redux
```typescript
import { useAppDispatch, useAppSelector } from '@hooks/useRedux';

const MyComponent = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector(state => state.slice.data);
  
  return <>...</>;
};
```

---

## 🔧 Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start Expo development server |
| `npm run ios` | Run on iOS simulator (Mac) |
| `npm run android` | Run on Android emulator |
| `npm run web` | Run on web browser |
| `npm run lint` | Check code with ESLint |
| `npm run format` | Format code with Prettier |
| `npm run type-check` | Check TypeScript |
| `npm test` | Run tests with Jest |
| `npm run build:ios` | Build for iOS (requires EAS) |
| `npm run build:android` | Build for Android (requires EAS) |

---

## 🌍 Environment Variables

| Variable | Purpose | Example |
|----------|---------|---------|
| `REACT_APP_API_BASE_URL` | Backend API URL | `http://localhost:3000/api` |
| `REACT_APP_API_TIMEOUT` | Request timeout (ms) | `30000` |
| `REACT_APP_ENV` | Environment | `development` |
| `REACT_APP_LOG_LEVEL` | Logging level | `info` |
| `REACT_APP_FIREBASE_*` | Firebase config | From Firebase Console |

---

## 🐛 Debugging Tips

### React Native Debugger
```bash
# Install: https://github.com/jhen0409/react-native-debugger
# Launch and press Cmd+T (Mac) or Ctrl+T (Windows) in running app
```

### View Logs
```typescript
import logger from '@utils/logger';

logger.debug('Debug message', data);
logger.info('Info message');
logger.warn('Warning!');
logger.error('Error:', error);
```

### Redux DevTools
Install Chrome extension: Redux DevTools

---

## 📋 Type Path Aliases

Use these aliases in imports:

```
@/*                 → src/*
@components/*       → src/components/*
@screens/*          → src/screens/*
@navigation/*       → src/navigation/*
@services/*         → src/services/*
@store/*            → src/store/*
@hooks/*            → src/hooks/*
@utils/*            → src/utils/*
@constants/*        → src/constants/*
@types/*            → src/types/*
@config/*           → src/config/*
@assets/*           → src/assets/*
```

---

## ✅ Pre-commit Checklist

Before pushing code:
- [ ] Run `npm run lint`
- [ ] Run `npm run format`
- [ ] Run `npm run type-check`
- [ ] Run `npm test`
- [ ] No console.logs left
- [ ] Meaningful commit message

---

## 🚢 Deployment Steps

### 1. Prepare
```bash
npm run type-check
npm run lint
npm test
```

### 2. Update Version
Edit `app.json`:
```json
{
  "expo": {
    "version": "0.2.0"
  }
}
```

### 3. Build
```bash
npm run build:ios
# or
npm run build:android
```

### 4. Submit to Store
- iOS: Use Xcode or Expo CLI
- Android: Use Google Play Console

---

## 🤝 Team Guidelines

1. **Branch naming**: `feature/`, `bugfix/`, `hotfix/`, `release/`
2. **Commit messages**: Follow conventional commits
3. **Code review**: 2 approvals before merge
4. **Testing**: Cover new features with tests
5. **Documentation**: Update docs for new features

---

## 📞 Support Resources

- Expo Docs: https://docs.expo.dev/
- React Native: https://reactnative.dev/
- Redux: https://redux.js.org/
- React Navigation: https://reactnavigation.org/
- TypeScript: https://www.typescriptlang.org/

---

**Last Updated**: April 3, 2026  
**Version**: 0.1.0
