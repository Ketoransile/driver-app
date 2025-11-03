import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import MapView, { Marker, PROVIDER_DEFAULT } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { storage } from '../../utils/storage';
import { deliveriesAPI } from '../../api/client';
import { Driver, Delivery } from '../../types';

const ADDIS_ABABA = {
  latitude: 9.03,
  longitude: 38.74,
  latitudeDelta: 0.5,
  longitudeDelta: 0.5
};

export default function Dashboard() {
  const [driver, setDriver] = useState<Driver | null>(null);
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [isOnline, setIsOnline] = useState(true);
  const router = useRouter();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const driverData = await storage.getDriver();
    setDriver(driverData);
    
    if (driverData) {
      const response = await deliveriesAPI.getByDriverId(driverData.id);
      setDeliveries(response.deliveries);
    }
  };

  const activeDeliveries = deliveries.filter(d => d.status !== 'Delivered').length;
  const completedDeliveries = deliveries.filter(d => d.status === 'Delivered').length;
  const cities = new Set(deliveries.map(d => d.city)).size;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello,</Text>
          <Text style={styles.driverName}>{driver?.name || 'Driver'}</Text>
        </View>
        <TouchableOpacity 
          style={[styles.statusBadge, isOnline ? styles.online : styles.offline]}
          onPress={() => setIsOnline(!isOnline)}
        >
          <View style={[styles.statusDot, isOnline && styles.statusDotActive]} />
          <Text style={styles.statusText}>{isOnline ? 'Online' : 'Offline'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Ionicons name="cube" size={24} color="#009639" />
          <Text style={styles.statValue}>{activeDeliveries}</Text>
          <Text style={styles.statLabel}>Active</Text>
        </View>
        <View style={styles.statCard}>
          <Ionicons name="checkmark-circle" size={24} color="#FEDD00" />
          <Text style={styles.statValue}>{completedDeliveries}</Text>
          <Text style={styles.statLabel}>Completed</Text>
        </View>
        <View style={styles.statCard}>
          <Ionicons name="location" size={24} color="#DA121A" />
          <Text style={styles.statValue}>{cities}</Text>
          <Text style={styles.statLabel}>Cities</Text>
        </View>
      </View>

      <View style={styles.mapContainer}>
        <Text style={styles.sectionTitle}>Your Location</Text>
        <MapView
          style={styles.map}
          provider={PROVIDER_DEFAULT}
          initialRegion={ADDIS_ABABA}
        >
          <Marker
            coordinate={ADDIS_ABABA}
            title="Your Location"
            description="Addis Ababa, Ethiopia"
            pinColor="#009639"
          />
          {deliveries.filter(d => d.status !== 'Delivered').map(delivery => (
            <Marker
              key={delivery.id}
              coordinate={delivery.coords}
              title={delivery.city}
              description={delivery.recipient}
              pinColor={delivery.status === 'In Transit' ? '#FEDD00' : '#DA121A'}
            />
          ))}
        </MapView>
      </View>

      <TouchableOpacity 
        style={styles.deliveriesButton}
        onPress={() => router.push('/(tabs)/deliveries')}
      >
        <Text style={styles.deliveriesButtonText}>View All Deliveries</Text>
        <Ionicons name="arrow-forward" size={20} color="#fff" />
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 12
  },
  greeting: {
    fontSize: 16,
    color: '#999'
  },
  driverName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff'
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#2a2a2a'
  },
  online: {
    borderWidth: 1,
    borderColor: '#009639'
  },
  offline: {
    borderWidth: 1,
    borderColor: '#666'
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#666',
    marginRight: 6
  },
  statusDotActive: {
    backgroundColor: '#009639'
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600'
  },
  statsContainer: {
    flexDirection: 'row',
    padding: 20,
    paddingTop: 0,
    gap: 12
  },
  statCard: {
    flex: 1,
    backgroundColor: '#2a2a2a',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#3a3a3a'
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 8
  },
  statLabel: {
    fontSize: 12,
    color: '#999',
    marginTop: 4
  },
  mapContainer: {
    padding: 20,
    paddingTop: 0
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12
  },
  map: {
    width: '100%',
    height: 300,
    borderRadius: 16,
    overflow: 'hidden'
  },
  deliveriesButton: {
    flexDirection: 'row',
    backgroundColor: '#009639',
    margin: 20,
    marginTop: 0,
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8
  },
  deliveriesButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  }
});
