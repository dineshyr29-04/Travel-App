/**
 * Trips Screen Placeholder
 * Shows list of user's trips
 */

import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { setLoading } from '../../store/slices/tripSlice';
import logger from '../../utils/logger';

const TripsScreen = () => {
  const dispatch = useAppDispatch();
  const { trips } = useAppSelector((state) => state.trips);
  const { theme } = useAppSelector((state) => state.app);

  const isDark = theme === 'dark';
  const bgColor = isDark ? '#1a1a1a' : '#ffffff';
  const textColor = isDark ? '#ffffff' : '#000000';

  useEffect(() => {
    loadTrips();
  }, []);

  const loadTrips = async () => {
    try {
      dispatch(setLoading(true));
      // TODO: Implement actual API call
      // const response = await tripsAPI.getAllTrips();
      // dispatch(setTrips(response.data));
      logger.info('Loading trips...');
    } catch (error) {
      logger.error('Failed to load trips', error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={[styles.emptyText, { color: textColor }]}>
        No trips yet. Create one to get started!
      </Text>
    </View>
  );

  const renderTripItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={[
        styles.tripItem,
        { backgroundColor: isDark ? '#2a2a2a' : '#f5f5f5' },
      ]}
    >
      <Text style={[styles.tripTitle, { color: textColor }]}>{item.title}</Text>
      <Text style={[styles.tripInfo, { color: textColor + '99' }]}>
        {item.destination}
      </Text>
      <Text style={[styles.tripDate, { color: textColor + '99' }]}>
        {item.startDate} - {item.endDate}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <FlatList
        data={trips}
        keyExtractor={(item) => item.id}
        renderItem={renderTripItem}
        ListEmptyComponent={renderEmptyState}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
  },
  tripItem: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  tripTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  tripInfo: {
    fontSize: 14,
    marginBottom: 4,
  },
  tripDate: {
    fontSize: 12,
  },
});

export default TripsScreen;
