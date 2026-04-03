/**
 * Navigation Stack
 * App navigation structure with React Navigation
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from '@react-navigation/bottom-tabs';
import { useAppSelector } from '../hooks/useRedux';

// Screens - to be imported
// import LoginScreen from '../screens/auth/LoginScreen';
// import SignupScreen from '../screens/auth/SignupScreen';
// import HomeScreen from '../screens/home/HomeScreen';
// import TripsScreen from '../screens/trips/TripsScreen';
// import ProfileScreen from '../screens/profile/ProfileScreen';

import HomeScreen from '../screens/home/HomeScreen';
import { RootStackParamList } from '../types';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

/**
 * Auth Stack Navigator
 * Screens shown when user is not authenticated
 */
const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Auth"
        component={HomeScreen}
        // TODO: Replace with LoginScreen
      />
    </Stack.Navigator>
  );
};

/**
 * Main Tab Navigator
 * Screens shown when user is authenticated
 */
const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: '#1e90ff',
        tabBarInactiveTintColor: '#999',
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarLabel: 'Home',
        }}
      />
      {/* TODO: Add more tabs
      <Tab.Screen
        name="Trips"
        component={TripsScreen}
        options={{
          title: 'My Trips',
          tabBarLabel: 'Trips',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          tabBarLabel: 'Profile',
        }}
      />
      */}
    </Tab.Navigator>
  );
};

/**
 * Root Navigator
 * Main navigation based on authentication state
 */
const RootNavigator = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  return (
    <NavigationContainer>
      {isAuthenticated ? <MainTabNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default RootNavigator;
export type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;
export type TabNavigationProp = BottomTabNavigationProp<RootStackParamList>;
