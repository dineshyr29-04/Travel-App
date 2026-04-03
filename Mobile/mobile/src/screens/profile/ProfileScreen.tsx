/**
 * Profile Screen Placeholder
 * User profile management
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useAppDispatch, useUser, useAppSelector } from '../../hooks/useRedux';
import { clearUser } from '../../store/slices/authSlice';
import logger from '../../utils/logger';

const ProfileScreen = () => {
  const dispatch = useAppDispatch();
  const user = useUser();
  const { theme } = useAppSelector((state) => state.app);

  const isDark = theme === 'dark';
  const bgColor = isDark ? '#1a1a1a' : '#ffffff';
  const textColor = isDark ? '#ffffff' : '#000000';

  const handleLogout = () => {
    logger.info('Logging out');
    dispatch(clearUser());
    // TODO: Call Firebase logout
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: bgColor }]}
      contentContainerStyle={styles.content}
    >
      <View style={styles.header}>
        <View
          style={[
            styles.avatar,
            { backgroundColor: isDark ? '#333' : '#e0e0e0' },
          ]}
        >
          <Text style={[styles.avatarText, { color: textColor }]}>
            {user?.displayName?.charAt(0).toUpperCase() || 'U'}
          </Text>
        </View>
        <Text style={[styles.name, { color: textColor }]}>
          {user?.displayName || 'User'}
        </Text>
        <Text style={[styles.email, { color: textColor + '99' }]}>
          {user?.email}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: textColor }]}>Account</Text>

        <TouchableOpacity
          style={[
            styles.menuItem,
            { backgroundColor: isDark ? '#2a2a2a' : '#f5f5f5' },
          ]}
        >
          <Text style={[styles.menuText, { color: textColor }]}>
            Edit Profile
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.menuItem,
            { backgroundColor: isDark ? '#2a2a2a' : '#f5f5f5' },
          ]}
        >
          <Text style={[styles.menuText, { color: textColor }]}>
            Change Password
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.menuItem,
            { backgroundColor: isDark ? '#2a2a2a' : '#f5f5f5' },
          ]}
        >
          <Text style={[styles.menuText, { color: textColor }]}>
            Notifications
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: '700',
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  menuItem: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  menuText: {
    fontSize: 14,
    fontWeight: '500',
  },
  logoutButton: {
    backgroundColor: '#d32f2f',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ProfileScreen;
