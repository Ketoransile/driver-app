export interface Delivery {
  id: string;
  driverId: string;
  recipient: string;
  city: string;
  address: string;
  phone: string;
  status: "Pending" | "In Transit" | "Delivered";
  distanceKm: number;
  coords: {
    latitude: number;
    longitude: number;
  };
}

export let deliveries: Delivery[] = [
  {
    id: "DEL-001",
    driverId: "1",
    recipient: "Sisay Tadesse",
    city: "Nekemte",
    address: "Gimbi Road, Nekemte",
    phone: "+251911223344",
    status: "Pending",
    distanceKm: 320,
    coords: { latitude: 9.0912, longitude: 36.5375 }
  },
  {
    id: "DEL-002",
    driverId: "1",
    recipient: "Mulu Gebremedhin",
    city: "Shashemene",
    address: "Abosto area, Shashemene",
    phone: "+251910112233",
    status: "In Transit",
    distanceKm: 250,
    coords: { latitude: 7.2, longitude: 38.6 }
  },
  {
    id: "DEL-003",
    driverId: "2",
    recipient: "Tigist Degu",
    city: "Jimma",
    address: "Aba Jifar Street, Jimma",
    phone: "+251911889900",
    status: "Pending",
    distanceKm: 350,
    coords: { latitude: 7.6667, longitude: 36.8333 }
  },
  {
    id: "DEL-004",
    driverId: "1",
    recipient: "Yohannes Mulugeta",
    city: "Hawassa",
    address: "Haile Resort Road, Hawassa",
    phone: "+251911445566",
    status: "Pending",
    distanceKm: 275,
    coords: { latitude: 7.0621, longitude: 38.4766 }
  },
  {
    id: "DEL-005",
    driverId: "2",
    recipient: "Hiwot Tesfaye",
    city: "Bahir Dar",
    address: "Blue Nile Street, Bahir Dar",
    phone: "+251911667788",
    status: "Delivered",
    distanceKm: 565,
    coords: { latitude: 11.5937, longitude: 37.3897 }
  }
];

export const updateDeliveryStatus = (id: string, status: Delivery['status']): Delivery | null => {
  const delivery = deliveries.find(d => d.id === id);
  if (delivery) {
    delivery.status = status;
    return delivery;
  }
  return null;
};
