import AsyncStorage from '@react-native-async-storage/async-storage';
import { Driver } from '../types';

const TOKEN_KEY = '@merkato_token';
const DRIVER_KEY = '@merkato_driver';

export const storage = {
  async saveToken(token: string): Promise<void> {
    await AsyncStorage.setItem(TOKEN_KEY, token);
  },

  async getToken(): Promise<string | null> {
    return await AsyncStorage.getItem(TOKEN_KEY);
  },

  async saveDriver(driver: Driver): Promise<void> {
    await AsyncStorage.setItem(DRIVER_KEY, JSON.stringify(driver));
  },

  async getDriver(): Promise<Driver | null> {
    const data = await AsyncStorage.getItem(DRIVER_KEY);
    return data ? JSON.parse(data) : null;
  },

  async clearAll(): Promise<void> {
    await AsyncStorage.multiRemove([TOKEN_KEY, DRIVER_KEY]);
  }
};
