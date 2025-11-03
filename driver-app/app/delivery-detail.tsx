import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Linking } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import MapView, { Marker, Polyline, PROVIDER_DEFAULT } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { deliveriesAPI } from '../api/client';
import { storage } from '../utils/storage';
import { Delivery } from '../types';

const ADDIS_ABABA = {
  latitude: 9.03,
  longitude: 38.74
};

export default function DeliveryDetail() {
  const { id } = useLocalSearchParams();
  const [delivery, setDelivery] = useState<Delivery | null>(null);
  const [updating, setUpdating] = useState(false);
  const router = useRouter();

  useEffect(() => {
    loadDelivery();
  }, [id]);

  const loadDelivery = async () => {
    const driver = await storage.getDriver();
    if (driver) {
      const response = await deliveriesAPI.getByDriverId(driver.id);
      const found = response.deliveries.find(d => d.id === id);
      setDelivery(found || null);
    }
  };

  const updateStatus = async (newStatus: Delivery['status']) => {
    if (!delivery) return;

    setUpdating(true);
    try {
      await deliveriesAPI.updateStatus(delivery.id, newStatus);
      setDelivery({ ...delivery, status: newStatus });
      Alert.alert('Success', `Delivery status updated to ${newStatus}`);
    } catch (error) {
      Alert.alert('Error', 'Failed to update delivery status');
    } finally {
      setUpdating(false);
    }
  };

  const handleCall = () => {
    if (delivery) {
      Linking.openURL(`tel:${delivery.phone}`);
    }
  };

  if (!delivery) {
    return (
      <View style={styles.loading}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  const routeCoordinates = [
    ADDIS_ABABA,
    delivery.coords
  ];

  const mapRegion = {
    latitude: (ADDIS_ABABA.latitude + delivery.coords.latitude) / 2,
    longitude: (ADDIS_ABABA.longitude + delivery.coords.longitude) / 2,
    latitudeDelta: Math.abs(ADDIS_ABABA.latitude - delivery.coords.latitude) * 2.5,
    longitudeDelta: Math.abs(ADDIS_ABABA.longitude - delivery.coords.longitude) * 2.5
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          provider={PROVIDER_DEFAULT}
          initialRegion={mapRegion}
        >
          <Marker
            coordinate={ADDIS_ABABA}
            title="Start"
            description="Addis Ababa"
            pinColor="#009639"
          />
          <Marker
            coordinate={delivery.coords}
            title={delivery.city}
            description={delivery.recipient}
            pinColor="#DA121A"
          />
          <Polyline
            coordinates={routeCoordinates}
            strokeColor="#FEDD00"
            strokeWidth={3}
          />
        </MapView>
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          <View>
            <Text style={styles.deliveryId}>{delivery.id}</Text>
            <Text style={styles.recipient}>{delivery.recipient}</Text>
          </View>
          <View style={[styles.statusBadge, getStatusStyle(delivery.status)]}>
            <Text style={styles.statusText}>{delivery.status}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivery Information</Text>
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Ionicons name="location" size={20} color="#009639" />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>City</Text>
                <Text style={styles.infoValue}>{delivery.city}</Text>
              </View>
            </View>
            <View style={styles.infoDivider} />
            <View style={styles.infoRow}>
              <Ionicons name="home" size={20} color="#FEDD00" />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Address</Text>
                <Text style={styles.infoValue}>{delivery.address}</Text>
              </View>
            </View>
            <View style={styles.infoDivider} />
            <View style={styles.infoRow}>
              <Ionicons name="navigate" size={20} color="#DA121A" />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Distance</Text>
                <Text style={styles.infoValue}>{delivery.distanceKm} km from Addis Ababa</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact</Text>
          <TouchableOpacity style={styles.callButton} onPress={handleCall}>
            <Ionicons name="call" size={24} color="#fff" />
            <View style={styles.callContent}>
              <Text style={styles.callLabel}>Call Recipient</Text>
              <Text style={styles.callPhone}>{delivery.phone}</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {delivery.status !== 'Delivered' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Actions</Text>
            <View style={styles.actions}>
              {delivery.status === 'Pending' && (
                <TouchableOpacity
                  style={[styles.actionButton, styles.startButton]}
                  onPress={() => updateStatus('In Transit')}
                  disabled={updating}
                >
                  <Ionicons name="car" size={24} color="#fff" />
                  <Text style={styles.actionButtonText}>
                    {updating ? 'Updating...' : 'Start Delivery'}
                  </Text>
                </TouchableOpacity>
              )}
              {delivery.status === 'In Transit' && (
                <TouchableOpacity
                  style={[styles.actionButton, styles.completeButton]}
                  onPress={() => updateStatus('Delivered')}
                  disabled={updating}
                >
                  <Ionicons name="checkmark-circle" size={24} color="#fff" />
                  <Text style={styles.actionButtonText}>
                    {updating ? 'Updating...' : 'Mark as Delivered'}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}

        {delivery.status === 'Delivered' && (
          <View style={styles.completedBanner}>
            <Ionicons name="checkmark-circle" size={32} color="#009639" />
            <Text style={styles.completedText}>Delivery Completed</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const getStatusStyle = (status: Delivery['status']) => {
  switch (status) {
    case 'Pending':
      return { backgroundColor: '#DA121A' };
    case 'In Transit':
      return { backgroundColor: '#FEDD00' };
    case 'Delivered':
      return { backgroundColor: '#009639' };
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a'
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a1a'
  },
  loadingText: {
    color: '#fff',
    fontSize: 16
  },
  mapContainer: {
    height: 300
  },
  map: {
    flex: 1
  },
  content: {
    padding: 20
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24
  },
  deliveryId: {
    fontSize: 14,
    color: '#999',
    fontWeight: '600'
  },
  recipient: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 4
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12
  },
  statusText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold'
  },
  section: {
    marginBottom: 24
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12
  },
  infoCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#3a3a3a'
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  infoContent: {
    flex: 1
  },
  infoLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4
  },
  infoValue: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500'
  },
  infoDivider: {
    height: 1,
    backgroundColor: '#3a3a3a',
    marginVertical: 12
  },
  callButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#009639',
    padding: 16,
    borderRadius: 12,
    gap: 12
  },
  callContent: {
    flex: 1
  },
  callLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff'
  },
  callPhone: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.8,
    marginTop: 2
  },
  actions: {
    gap: 12
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8
  },
  startButton: {
    backgroundColor: '#FEDD00'
  },
  completeButton: {
    backgroundColor: '#009639'
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff'
  },
  completedBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2a2a2a',
    padding: 20,
    borderRadius: 16,
    gap: 12,
    borderWidth: 2,
    borderColor: '#009639'
  },
  completedText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#009639'
  }
});
