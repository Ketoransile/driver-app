export interface Driver {
  id: string;
  username: string;
  name: string;
  phone: string;
  rating: number;
  totalDeliveries: number;
}

export interface Delivery {
  id: string;
  driverId: string;
  recipient: string;
  city: string;
  address: string;
  phone: string;
  status: 'Pending' | 'In Transit' | 'Delivered';
  distanceKm: number;
  coords: {
    latitude: number;
    longitude: number;
  };
}

export interface LoginResponse {
  token: string;
  driver: Driver;
}

export interface DeliveriesResponse {
  deliveries: Delivery[];
  total: number;
}
