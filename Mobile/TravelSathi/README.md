# TravelSathi Mobile App - Setup & Development Guide

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm 9+
- Expo CLI: `npm install -g expo-cli`
- iOS: Xcode (for iOS development)
- Android: Android Studio (for Android development)

### Initial Setup

```bash
# 1. Navigate to mobile folder
cd Mobile/TravelSathi

# 2. Install dependencies
npm install
# or
yarn install

# 3. Create .env file from template
cp .env.example .env

# 4. Configure environment variables
# Add your Firebase credentials and API endpoints to .env

# 5. Start the development server
npm start

# 6. Run on device/emulator
# Press 'i' for iOS simulator
# Press 'a' for Android emulator
# Press 'w' for web
```

---

## 📁 Folder Structure Overview

```
TravelSathi/
├── src/
│   ├── components/          # Reusable UI components
│   │   └── common/          # Common components (Button, Spinner, etc.)
│   ├── screens/             # App screens organized by feature
│   │   ├── auth/            # Authentication screens
│   │   ├── home/            # Home screen
│   │   ├── trips/           # Trips related screens
│   │   └── profile/         # User profile screens
│   ├── navigation/          # React Navigation setup
│   ├── services/            # External services & APIs
│   │   ├── api/             # API client and endpoints
│   │   └── auth/            # Firebase auth service
│   ├── store/               # Redux store
│   │   └── slices/          # Redux slices (auth, app, trips)
│   ├── hooks/               # Custom React and Redux hooks
│   ├── utils/               # Utility functions (logger, validation)
│   ├── constants/           # Global constants
│   ├── types/               # TypeScript type definitions
│   ├── config/              # Configuration files
│   └── assets/              # Images, fonts, etc.
├── App.tsx                  # Main app component
├── app.json                 # Expo configuration
├── package.json             # Dependencies
├── tsconfig.json            # TypeScript configuration
├── .env.example             # Environment variables template
└── README.md                # This file
```

---

## 🛠️ Installation & Setup Commands

### Step 1: Initialize Expo App (Already Done)
```bash
npx create-expo-app@latest TravelSathi --template
```

### Step 2: Install Core Dependencies

```bash
# Navigation
npm install @react-navigation/native @react-navigation/bottom-tabs @react-navigation/native-stack
npm install react-native-screens react-native-safe-area-context

# State Management
npm install @reduxjs/toolkit react-redux

# API Handling
npm install axios @tanstack/react-query

# Environment variables
npm install react-native-dotenv

# Async Storage (for persistence)
npm install @react-native-async-storage/async-storage

# Optional: Redux Persist
npm install redux-persist
```

### Step 3: Install Development Dependencies

```bash
npm install --save-dev @types/react @types/react-native typescript
npm install --save-dev prettier eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser
npm install --save-dev jest @testing-library/react-native
```

### Step 4: Environment Setup

```bash
# Copy environment template
cp .env.example .env

# Edit .env with your values
```

---

## 📋 Naming Conventions & Best Practices

### File Naming
- **Components**: PascalCase (e.g., `Button.tsx`, `HomeScreen.tsx`)
- **Utils/Hooks**: camelCase (e.g., `useRedux.ts`, `logger.ts`)
- **Slices**: camelCase with "Slice" suffix (e.g., `authSlice.ts`)
- **Types**: Single file `types/index.ts` or `types/[feature].ts`

### Component Structure
```typescript
// Always start with imports
import React from 'react';
import { View, Text } from 'react-native';

// Then interface definitions
interface ComponentProps {
  // Props
}

// Then component definition
const Component: React.FC<ComponentProps> = (props) => {
  // Logic
  return <View></View>;
};

// Then styles
const styles = StyleSheet.create({
  // Styles
});

// Finally, export
export default Component;
```

### Redux Usage
```typescript
// Use typed hooks
import { useAppDispatch, useAppSelector } from '@hooks/useRedux';

const MyComponent = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector(state => state.someSlice.data);

  return <>...</>;
};
```

### API Calls
```typescript
// Use API client wrapper
import apiClient from '@services/api/client';
import { tripsAPI } from '@services/api/endpoints';

// In component or Redux thunk
const trips = await tripsAPI.getAllTrips();
```

---

## 🔐 Environment Variables

Create a `.env` file at the root of the mobile app with:

```env
# API Configuration
REACT_APP_API_BASE_URL=http://localhost:3000/api
REACT_APP_API_TIMEOUT=30000
REACT_APP_ENV=development

# Firebase
REACT_APP_FIREBASE_API_KEY=your_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

**Never commit `.env` to version control!**

---

## 🎯 Redux Setup

### Creating a New Slice
```typescript
// src/store/slices/newSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  loading: false,
};

const newSlice = createSlice({
  name: 'newFeature',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setData: (state, action: PayloadAction<any[]>) => {
      state.data = action.payload;
    },
  },
});

export const { setLoading, setData } = newSlice.actions;
export default newSlice.reducer;
```

### Adding to Store
```typescript
// src/store/index.ts
import newReducer from './slices/newSlice';

export const store = configureStore({
  reducer: {
    newFeature: newReducer,
  },
});
```

### Using in Components
```typescript
const MyComponent = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector(state => state.newFeature.data);

  return <>...</>;
};
```

---

## 🌐 API Service Structure

### Adding New Endpoints
```typescript
// src/services/api/endpoints.ts
export const newAPI = {
  getAll: () => apiClient.get('/new'),
  getById: (id: string) => apiClient.get(`/new/${id}`),
  create: (data: any) => apiClient.post('/new', data),
  update: (id: string, data: any) => apiClient.put(`/new/${id}`, data),
  delete: (id: string) => apiClient.delete(`/new/${id}`),
};
```

### Using API Service
```typescript
import { newAPI } from '@services/api/endpoints';

// In component
const [data, setData] = React.useState([]);

React.useEffect(() => {
  newAPI.getAll()
    .then(response => setData(response))
    .catch(error => console.error(error));
}, []);
```

---

## 🧪 Testing

### Run Tests
```bash
npm test
```

### Run Tests in Watch Mode
```bash
npm test:watch
```

---

## 📱 Running on Devices

### iOS
```bash
npm run ios
# or
expo start --ios
```

### Android
```bash
npm run android
# or
expo start --android
```

### Web
```bash
npm run web
# or
expo start --web
```

---

## 🚢 Building for Production

### iOS Build
```bash
npm run build:ios
# or
eas build --platform ios
```

### Android Build
```bash
npm run build:android
# or
eas build --platform android
```

---

## 📊 Type Safety Best Practices

1. **Define all component props as interfaces**
   ```typescript
   interface Props {
     title: string;
     onPress: () => void;
   }
   ```

2. **Use strict TypeScript compiler options** ✅ Already configured in `tsconfig.json`

3. **Avoid `any` types** - Use proper typing

4. **Use discriminated unions** for complex state
   ```typescript
   type AsyncState = 
     | { status: 'idle' }
     | { status: 'loading' }
     | { status: 'success'; data: any }
     | { status: 'error'; error: string };
   ```

---

## 🔗 Path Aliases

Use path aliases for cleaner imports:

```typescript
// Instead of this
import { Button } from '../../../../components/common/Button';

// Write this
import { Button } from '@components/common/Button';
```

Available aliases:
- `@/*` - src root
- `@components/*` - components
- `@screens/*` - screens
- `@services/*` - services
- `@store/*` - store
- `@hooks/*` - hooks
- `@utils/*` - utils
- `@constants/*` - constants
- `@types/*` - types
- `@config/*` - config

---

## 🐛 Debugging

### React Native Debugger
```bash
# Install standalone app
# Connect debugger: Cmd+T (Mac) or Ctrl+T (Windows)
```

### Logging
```typescript
import logger from '@utils/logger';

logger.debug('Debug message', data);
logger.info('Info message', data);
logger.warn('Warning message', data);
logger.error('Error message', error);
```

---

## 📚 Architecture Decisions

1. **State Management**: Redux Toolkit for global state, React hooks for local state
2. **API Handling**: Axios with interceptors for centralized request/response handling
3. **Navigation**: React Navigation (Tab + Stack navigators)
4. **Code Structure**: Feature-based folder organization for scalability
5. **Type Safety**: Strict TypeScript configuration for runtime safety

---

## 🚀 Next Steps

1. ✅ Set up Firebase Authentication
2. ✅ Configure environment variables
3. ✅ Implement auth screens (LoginScreen, SignupScreen)
4. ✅ Create trips CRUD screens
5. ✅ Add React Query for advanced caching
6. ✅ Set up push notifications
7. ✅ Add data persistence (Redux Persist)
8. ✅ Set up CI/CD with EAS

---

## 📖 Resources

- [React Native Docs](https://reactnative.dev/)
- [Expo Docs](https://docs.expo.dev/)
- [Redux Toolkit Docs](https://redux-toolkit.js.org/)
- [React Navigation Docs](https://reactnavigation.org/)
- [TypeScript Docs](https://www.typescriptlang.org/)

---

## 💡 Tips for Scalability

1. **Keep Redux slices focused** - One concern per slice
2. **Use custom hooks** - Extract complex logic into hooks
3. **Lazy load screens** - Use dynamic imports for code splitting
4. **Modularize services** - Separate API calls by feature
5. **Consistent naming** - Follow conventions across the codebase
6. **Component composition** - Build with smaller, reusable units
7. **Documentation** - Comment complex logic and business rules

---

## 🤝 Contributing

- Follow ESLint rules: `npm run lint`
- Format code: `npm run format`
- Check types: `npm run type-check`
- Write tests for new features

---

**Happy coding! 🎉**
