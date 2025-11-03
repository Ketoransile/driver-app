import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { storage } from '../../utils/storage';
import { deliveriesAPI } from '../../api/client';
import { Delivery } from '../../types';

export default function Deliveries() {
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    loadDeliveries();
  }, []);

  const loadDeliveries = async () => {
    const driver = await storage.getDriver();
    if (driver) {
      const response = await deliveriesAPI.getByDriverId(driver.id);
      setDeliveries(response.deliveries);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadDeliveries();
    setRefreshing(false);
  };

  const getStatusColor = (status: Delivery['status']) => {
    switch (status) {
      case 'Pending': return '#DA121A';
      case 'In Transit': return '#FEDD00';
      case 'Delivered': return '#009639';
    }
  };

  const getStatusIcon = (status: Delivery['status']) => {
    switch (status) {
      case 'Pending': return 'time-outline';
      case 'In Transit': return 'car-outline';
      case 'Delivered': return 'checkmark-circle';
    }
  };

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#009639" />
      }
    >
      <View style={styles.header}>
        <Text style={styles.title}>My Deliveries</Text>
        <Text style={styles.subtitle}>{deliveries.length} total deliveries</Text>
      </View>

      <View style={styles.deliveriesList}>
        {deliveries.map((delivery) => (
          <TouchableOpacity
            key={delivery.id}
            style={styles.deliveryCard}
            onPress={() => router.push(`/delivery-detail?id=${delivery.id}`)}
          >
            <View style={styles.cardHeader}>
              <View>
                <Text style={styles.deliveryId}>{delivery.id}</Text>
                <Text style={styles.recipient}>{delivery.recipient}</Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(delivery.status) + '20' }]}>
                <Ionicons name={getStatusIcon(delivery.status) as any} size={16} color={getStatusColor(delivery.status)} />
                <Text style={[styles.statusText, { color: getStatusColor(delivery.status) }]}>
                  {delivery.status}
                </Text>
              </View>
            </View>

            <View style={styles.cardDivider} />

            <View style={styles.cardDetails}>
              <View style={styles.detailRow}>
                <Ionicons name="location" size={18} color="#009639" />
                <Text style={styles.detailText}>{delivery.city}</Text>
              </View>
              <View style={styles.detailRow}>
                <Ionicons name="home" size={18} color="#FEDD00" />
                <Text style={styles.detailText} numberOfLines={1}>{delivery.address}</Text>
              </View>
              <View style={styles.detailRow}>
                <Ionicons name="call" size={18} color="#DA121A" />
                <Text style={styles.detailText}>{delivery.phone}</Text>
              </View>
              <View style={styles.detailRow}>
                <Ionicons name="navigate" size={18} color="#999" />
                <Text style={styles.detailText}>{delivery.distanceKm} km from Addis Ababa</Text>
              </View>
            </View>

            <View style={styles.cardFooter}>
              <Text style={styles.viewDetails}>Tap to view details</Text>
              <Ionicons name="chevron-forward" size={20} color="#666" />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a'
  },
  header: {
    padding: 20,
    paddingTop: 12
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff'
  },
  subtitle: {
    fontSize: 14,
    color: '#999',
    marginTop: 4
  },
  deliveriesList: {
    padding: 20,
    paddingTop: 0,
    gap: 16
  },
  deliveryCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#3a3a3a'
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12
  },
  deliveryId: {
    fontSize: 12,
    color: '#999',
    fontWeight: '600'
  },
  recipient: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 4
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 4
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700'
  },
  cardDivider: {
    height: 1,
    backgroundColor: '#3a3a3a',
    marginVertical: 12
  },
  cardDetails: {
    gap: 10
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  detailText: {
    fontSize: 14,
    color: '#ccc',
    flex: 1
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#3a3a3a'
  },
  viewDetails: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600'
  }
});
