/**
 * Main App Component
 * Entry point for the TravelSathi application
 */

import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';
import store from './src/store';
import RootNavigator from './src/navigation';
import logger from './src/utils/logger';

/**
 * App wrapper with Redux provider
 */
export default function App() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    // App initialization
    logger.info('App started', { colorScheme });

    // TODO: Initialize Firebase
    // TODO: Check authentication state
    // TODO: Set up push notifications
  }, []);

  return (
    <Provider store={store}>
      <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />
      <RootNavigator />
    </Provider>
  );
}
