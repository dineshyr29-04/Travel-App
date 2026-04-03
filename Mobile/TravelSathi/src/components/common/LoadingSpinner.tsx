/**
 * Loading Spinner Component
 * Reusable loading indicator with multiple variants
 */

import React from 'react';
import {
  View,
  ActivityIndicator,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';

interface LoadingSpinnerProps {
  visible: boolean;
  size?: 'small' | 'large';
  color?: string;
  message?: string;
  style?: StyleProp<ViewStyle>;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  visible,
  size = 'large',
  color = '#1e90ff',
  message,
  style,
}) => {
  if (!visible) return null;

  return (
    <View style={[styles.container, style]}>
      <View style={styles.content}>
        <ActivityIndicator size={size} color={color} />
        {message && <Text style={styles.message}>{message}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
  },
  message: {
    marginTop: 12,
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
});

export default LoadingSpinner;
