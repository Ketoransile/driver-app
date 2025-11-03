import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { storage } from '../../utils/storage';
import { Driver } from '../../types';

export default function Profile() {
  const [driver, setDriver] = useState<Driver | null>(null);
  const router = useRouter();

  useEffect(() => {
    loadDriver();
  }, []);

  const loadDriver = async () => {
    const driverData = await storage.getDriver();
    setDriver(driverData);
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await storage.clearAll();
            router.replace('/login');
          }
        }
      ]
    );
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Ionicons
          key={i}
          name={i <= Math.floor(rating) ? 'star' : i - 0.5 <= rating ? 'star-half' : 'star-outline'}
          size={24}
          color="#FEDD00"
        />
      );
    }
    return stars;
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{driver?.name.charAt(0) || 'D'}</Text>
        </View>
        <Text style={styles.name}>{driver?.name || 'Driver'}</Text>
        <Text style={styles.phone}>{driver?.phone}</Text>
        
        <View style={styles.ratingContainer}>
          <View style={styles.stars}>
            {renderStars(driver?.rating || 0)}
          </View>
          <Text style={styles.ratingText}>{driver?.rating?.toFixed(1) || '0.0'} Rating</Text>
        </View>
      </View>

      <View style={styles.statsSection}>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{driver?.totalDeliveries || 0}</Text>
          <Text style={styles.statLabel}>Total Deliveries</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>98%</Text>
          <Text style={styles.statLabel}>Success Rate</Text>
        </View>
      </View>

      <View style={styles.menuSection}>
        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuItemLeft}>
            <Ionicons name="person-outline" size={24} color="#009639" />
            <Text style={styles.menuItemText}>Edit Profile</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#666" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuItemLeft}>
            <Ionicons name="car-outline" size={24} color="#FEDD00" />
            <Text style={styles.menuItemText}>Vehicle Information</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#666" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuItemLeft}>
            <Ionicons name="wallet-outline" size={24} color="#DA121A" />
            <Text style={styles.menuItemText}>Earnings</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#666" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuItemLeft}>
            <Ionicons name="time-outline" size={24} color="#999" />
            <Text style={styles.menuItemText}>Delivery History</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#666" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuItemLeft}>
            <Ionicons name="settings-outline" size={24} color="#999" />
            <Text style={styles.menuItemText}>Settings</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#666" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuItemLeft}>
            <Ionicons name="help-circle-outline" size={24} color="#999" />
            <Text style={styles.menuItemText}>Help & Support</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#666" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={24} color="#fff" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Merkato Driver v1.0.0</Text>
        <View style={styles.colorBar}>
          <View style={[styles.colorStripe, { backgroundColor: '#009639' }]} />
          <View style={[styles.colorStripe, { backgroundColor: '#FEDD00' }]} />
          <View style={[styles.colorStripe, { backgroundColor: '#DA121A' }]} />
        </View>
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
    alignItems: 'center',
    padding: 24,
    paddingTop: 12
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#009639',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16
  },
  avatarText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff'
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4
  },
  phone: {
    fontSize: 16,
    color: '#999',
    marginBottom: 16
  },
  ratingContainer: {
    alignItems: 'center'
  },
  stars: {
    flexDirection: 'row',
    gap: 4,
    marginBottom: 8
  },
  ratingText: {
    fontSize: 14,
    color: '#999',
    fontWeight: '600'
  },
  statsSection: {
    flexDirection: 'row',
    padding: 20,
    paddingTop: 0,
    gap: 12
  },
  statBox: {
    flex: 1,
    backgroundColor: '#2a2a2a',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#3a3a3a'
  },
  statValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4
  },
  statLabel: {
    fontSize: 12,
    color: '#999'
  },
  menuSection: {
    padding: 20,
    paddingTop: 0,
    gap: 1
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#2a2a2a',
    padding: 16,
    borderWidth: 1,
    borderColor: '#3a3a3a'
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  menuItemText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500'
  },
  logoutButton: {
    flexDirection: 'row',
    backgroundColor: '#DA121A',
    margin: 20,
    marginTop: 0,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  footer: {
    alignItems: 'center',
    padding: 20,
    gap: 12
  },
  footerText: {
    fontSize: 12,
    color: '#666'
  },
  colorBar: {
    flexDirection: 'row',
    width: 100,
    height: 4,
    borderRadius: 2,
    overflow: 'hidden'
  },
  colorStripe: {
    flex: 1
  }
});
