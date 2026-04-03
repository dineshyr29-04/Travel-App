# BEST PRACTICES & PROJECT GUIDELINES

## 📝 Code Organization

### 1. Component Naming
- ✅ Use PascalCase for components
- ✅ Use descriptive names (e.g., `TripCard` not `Card`)
- ✅ Group related components in folders
- ❌ Avoid generic names like `Container`, `Wrapper`

### 2. File Organization
```
Feature Folder/
├── components/
│   ├── SubComponent.tsx
│   └── index.ts (barrel export)
├── screens/
│   ├── FeatureScreen.tsx
│   └── DetailScreen.tsx
├── hooks/
│   ├── useFeature.ts
│   └── index.ts
└── types.ts (feature-specific types)
```

### 3. Import Organization
Always organize imports by:
1. React and React Native
2. Third-party libraries
3. Relative imports from src
4. Type imports at the end

```typescript
// ✅ Correct order
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAppDispatch } from '@hooks/useRedux';
import { authAPI } from '@services/api/endpoints';
import { setUser } from '@store/slices/authSlice';
import { AuthUser } from '@types/index';
```

---

## 🎨 Component Best Practices

### 1. Always Define Props Interface
```typescript
interface ComponentProps {
  title: string;
  onPress: (id: string) => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

const Component: React.FC<ComponentProps> = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
}) => {
  // Implementation
};
```

### 2. Use Composition Over Large Props
```typescript
// ❌ Avoid
const Component: React.FC<{
  title: string;
  buttons: { label: string; onPress: () => void }[];
  footer: string;
  header: string;
  // ... many more props
}> = () => {};

// ✅ Prefer
const Component: React.FC<ComponentProps> = ({ children }) => {
  return (
    <View>
      <Header />
      <View>{children}</View>
      <Footer />
    </View>
  );
};
```

### 3. Memoize When Necessary
```typescript
import React, { memo } from 'react';

const TripsListItem = memo(({ trip, onPress }: Props) => {
  return <TouchableOpacity onPress={onPress}>{/* ... */}</TouchableOpacity>;
});

export default TripsListItem;
```

---

## 🔄 Redux/State Management

### 1. Slice Naming Convention
- Slice name: Feature name (lowercase)
- Action names: Verb + Noun (e.g., `setTrips`, `addTrip`)
- Selectors: Use in hooks for convenience

### 2. Async Operations with Redux Thunk
```typescript
// ❌ Avoid directly in reducer
// ✅ Use Redux Thunk for async

import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTrips = createAsyncThunk(
  'trips/fetchTrips',
  async (_, { rejectWithValue }) => {
    try {
      const response = await tripsAPI.getAllTrips();
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const tripsSlice = createSlice({
  // ...
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrips.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTrips.fulfilled, (state, action) => {
        state.trips = action.payload;
        state.isLoading = false;
      });
  },
});
```

### 3. Normalize Redux State
```typescript
// ❌ Avoid nested structures
const state = {
  trips: [
    { id: '1', title: 'Trip 1', user: { id: 'u1', name: 'John' } }
  ]
};

// ✅ Use normalized form
const state = {
  trips: { byId: { '1': { id: '1', title: 'Trip 1', userId: 'u1' } } },
  users: { byId: { 'u1': { id: 'u1', name: 'John' } } }
};
```

---

## 🌐 API & Network

### 1. Error Handling
```typescript
import { tripsAPI } from '@services/api/endpoints';

try {
  const trips = await tripsAPI.getAllTrips();
  // Success
} catch (error) {
  if (error.code === 'NETWORK_ERROR') {
    // Handle network error
  } else if (error.status === 401) {
    // Handle unauthorized
  } else {
    // Handle other error
  }
}
```

### 2. Request/Response Interceptors
- Already configured in `src/services/api/client.ts`
- Handles auth token injection
- Implements retry logic for failed requests

### 3. Loading States
```typescript
// ✅ Always show loading state
const { isLoading, error, data } = useQuery({
  queryKey: ['trips'],
  queryFn: tripsAPI.getAllTrips,
});

if (isLoading) return <LoadingSpinner />;
if (error) return <ErrorMessage error={error} />;
return <TripsView trips={data} />;
```

---

## 🎯 Performance Optimization

### 1. Lazy Load Screens
```typescript
// Use dynamic imports for screen components
import { lazy, Suspense } from 'react';

const TripsScreen = lazy(() => import('../screens/trips/TripsScreen'));

// In navigation
<Suspense fallback={<LoadingScreen />}>
  <TripsScreen />
</Suspense>
```

### 2. Optimize List Rendering
```typescript
import { FlatList } from 'react-native';

<FlatList
  data={trips}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => <TripsCard trip={item} />}
  onEndReached={() => loadMore()}
  onEndReachedThreshold={0.8}
  removeClippedSubviews={true}
  maxToRenderPerBatch={10}
  updateCellsBatchingPeriod={50}
/>
```

### 3. Use useCallback for Event Handlers
```typescript
const MyComponent = () => {
  const handlePress = useCallback((id: string) => {
    // Handle press
  }, [dependency]);

  return <Button onPress={handlePress} />;
};
```

---

## 🔐 Security Best Practices

### 1. Never Store Sensitive Data in Redux
```typescript
// ❌ Avoid
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    password: '', // ❌ NEVER
    creditCard: '', // ❌ NEVER
  },
});

// ✅ Only store necessary data
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: { id: '', email: '' },
    token: '', // Store token securely (use secure storage)
    isAuthenticated: false,
  },
});
```

### 2. Use Secure Storage for Tokens
```typescript
// Use expo-secure-store or similar
import * as SecureStore from 'expo-secure-store';

// Save token securely
await SecureStore.setItemAsync('authToken', token);

// Retrieve safely
const token = await SecureStore.getItemAsync('authToken');

// Use in API client
apiClient.setAuthToken(token);
```

### 3. Validate Input
```typescript
import { validateEmail, validatePassword } from '@utils/validation';

// Always validate on frontend
if (!validateEmail(email)) {
  setError('Invalid email');
  return;
}

// Always validate on backend too!
```

### 4. Sanitize User Input
```typescript
import { sanitizeInput } from '@utils/validation';

const cleanInput = sanitizeInput(userInput);
```

---

## 🧪 Testing

### 1. Component Testing
```typescript
import { render, screen } from '@testing-library/react-native';
import Component from './Component';

describe('Component', () => {
  it('should render correctly', () => {
    render(<Component title="Test" />);
    expect(screen.getByText('Test')).toBeTruthy();
  });
});
```

### 2. Redux Testing
```typescript
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';

describe('authSlice', () => {
  it('should handle setUser', () => {
    const store = configureStore({
      reducer: { auth: authReducer },
    });

    store.dispatch(setUser(mockUser));
    expect(store.getState().auth.user).toEqual(mockUser);
  });
});
```

---

## 📋 Logging

### Use Structured Logging
```typescript
import logger from '@utils/logger';

// ✅ Good
logger.info('User logged in', { userId: user.id, timestamp: new Date() });

// ❌ Avoid
console.log('User logged in:', user);
```

### Log Levels
- **debug**: Development information
- **info**: General information
- **warn**: Warning messages
- **error**: Error messages

---

## 🚀 Deployment Checklist

Before deploying to production:

- [ ] Remove console.log statements
- [ ] Set `LOG_LEVEL` to `warn` or `error`
- [ ] Update `.env` with production values
- [ ] Ensure all types are correct (`tsc --noEmit`)
- [ ] Run linter (`npm run lint`)
- [ ] Run tests (`npm test`)
- [ ] Update version number
- [ ] Build for target platform
- [ ] Test on physical device
- [ ] Check app permissions

---

## 🐛 Common Mistakes

### 1. Not Handling Loading States
```typescript
// ❌ Bad
const MyComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData().then(setData);
  }, []);

  return <ListView data={data} />;
};

// ✅ Good
const MyComponent = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchData()
      .then(setData)
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <LoadingSpinner />;
  return <ListView data={data} />;
};
```

### 2. Not Cleaning Up Effects
```typescript
// ❌ Bad
useEffect(() => {
  const subscription = addEventListener(...);
}, []);

// ✅ Good
useEffect(() => {
  const subscription = addEventListener(...);
  return () => subscription.remove();
}, []);
```

### 3. Direct State Mutation in Redux
```typescript
// ❌ Bad
state.user.name = 'New Name';

// ✅ Good
return {
  ...state,
  user: { ...state.user, name: 'New Name' }
};
```

---

## 📚 Recommended Resources

- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [Redux Style Guide](https://redux.js.org/style-guide/style-guide)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Navigation Docs](https://reactnavigation.org/docs/getting-started)
- [Expo Documentation](https://docs.expo.dev/)

---

**Keep following these guidelines for a maintainable, scalable, and high-quality codebase!** 🎉
