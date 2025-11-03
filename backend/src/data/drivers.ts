export interface Driver {
  id: string;
  username: string;
  password: string;
  name: string;
  phone: string;
  rating: number;
  totalDeliveries: number;
}

export const drivers: Driver[] = [
  {
    id: "1",
    username: "abebe",
    password: "1234",
    name: "Abebe Bekele",
    phone: "+251912345678",
    rating: 4.8,
    totalDeliveries: 156
  },
  {
    id: "2",
    username: "mekdes",
    password: "5678",
    name: "Mekdes Alemu",
    phone: "+251922334455",
    rating: 4.9,
    totalDeliveries: 203
  }
];
