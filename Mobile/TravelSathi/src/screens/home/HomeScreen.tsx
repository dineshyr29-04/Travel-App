/**
 * Home Screen
 * Main screen showing user's trips overview
 */

import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import logger from '../../utils/logger';

const HomeScreen = () => {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const { trips, isLoading } = useAppSelector((state) => state.trips);
  const { theme } = useAppSelector((state) => state.app);

  useEffect(() => {
    // Initialize screen
    logger.info('HomeScreen mounted');

    // TODO: Fetch trips on mount
    // if (isAuthenticated) {
    //   dispatch(fetchTrips());
    // }
  }, [isAuthenticated, dispatch]);

  const isDark = theme === 'dark';
  const bgColor = isDark ? '#1a1a1a' : '#ffffff';
  const textColor = isDark ? '#ffffff' : '#000000';

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: bgColor }]}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: textColor }]}>
          Welcome, {user?.displayName || 'Traveler'}!
        </Text>
        <Text style={[styles.subtitle, { color: textColor + 'cc' }]}>
          Plan and manage your amazing trips
        </Text>
      </View>

      {/* Quick Stats */}
      <View style={styles.statsContainer}>
        <View style={[styles.statCard, { borderColor: isDark ? '#333' : '#eee' }]}>
          <Text style={[styles.statNumber, { color: textColor }]}>
            {trips.length}
          </Text>
          <Text style={[styles.statLabel, { color: textColor + '99' }]}>
            Total Trips
          </Text>
        </View>
        <View style={[styles.statCard, { borderColor: isDark ? '#333' : '#eee' }]}>
          <Text style={[styles.statNumber, { color: textColor }]}>0</Text>
          <Text style={[styles.statLabel, { color: textColor + '99' }]}>
            Active
          </Text>
        </View>
      </View>

      {/* Loading State */}
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#1e90ff" />
          <Text style={[styles.loadingText, { color: textColor }]}>
            Loading trips...
          </Text>
        </View>
      )}

      {/* Empty State */}
      {!isLoading && trips.length === 0 && (
        <View style={styles.emptyState}>
          <Text style={[styles.emptyTitle, { color: textColor }]}>
            No trips yet
          </Text>
          <Text style={[styles.emptySubtitle, { color: textColor + '99' }]}>
            Start planning your first adventure
          </Text>
          <TouchableOpacity
            style={styles.createButton}
            onPress={() => {
              logger.info('Create trip button pressed');
              // TODO: Navigate to create trip screen
            }}
          >
            <Text style={styles.createButtonText}>Create Trip</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Trips List */}
      {!isLoading && trips.length > 0 && (
        <View style={styles.tripsContainer}>
          <Text style={[styles.sectionTitle, { color: textColor }]}>
            Your Trips
          </Text>
          {trips.map((trip) => (
            <TouchableOpacity
              key={trip.id}
              style={[
                styles.tripCard,
                { backgroundColor: isDark ? '#2a2a2a' : '#f5f5f5' },
              ]}
              onPress={() => {
                logger.info('Trip selected', { tripId: trip.id });
                // TODO: Navigate to trip details
              }}
            >
              <Text style={[styles.tripTitle, { color: textColor }]}>
                {trip.title}
              </Text>
              <Text style={[styles.tripDestination, { color: textColor + '99' }]}>
                📍 {trip.destination}
              </Text>
              <Text style={[styles.tripDate, { color: textColor + '99' }]}>
                {trip.startDate} to {trip.endDate}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '400',
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  loadingContainer: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
  },
  emptyState: {
    paddingVertical: 60,
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    marginBottom: 24,
  },
  createButton: {
    backgroundColor: '#1e90ff',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
  },
  createButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  tripsContainer: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  tripCard: {
    padding: 16,
    borderRadius: 12,
  },
  tripTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  tripDestination: {
    fontSize: 14,
    marginBottom: 8,
  },
  tripDate: {
    fontSize: 12,
  },
});

export default HomeScreen;
