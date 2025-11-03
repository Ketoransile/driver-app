# Merkato Driver 🚚

A modern last-mile delivery driver app for Ethiopia, built with Expo React Native and Express.js.

## Features

- 📱 **Mobile-First Design** - Built with Expo React Native and TypeScript
- 🗺️ **Integrated Maps** - Delivery routes from Addis Ababa to Ethiopian cities
- 🎨 **Modern Dark Theme** - Ethiopian color accents (green, yellow, red)
- 🔐 **Mock Authentication** - Simulated JWT-based login
- 📦 **Delivery Management** - Track and update delivery statuses
- 🚀 **One Command Setup** - Run both frontend and backend simultaneously

## Tech Stack

**Frontend:**
- Expo + React Native (TypeScript)
- Expo Router for navigation
- react-native-maps for mapping
- NativeWind for styling
- AsyncStorage for local data

**Backend:**
- Express.js (TypeScript)
- Mock data with constant arrays
- RESTful API endpoints

## Quick Start

### Prerequisites
- Node.js 18+ installed
- Expo Go app on your mobile device (optional)

### Installation

1. Install all dependencies:
```bash
npm run install:all
```

2. Run both backend and frontend:
```bash
npm run dev
```

This will start:
- Backend server on http://localhost:5000
- Expo dev server on port 8081

### Test Credentials

Login with:
- Username: `abebe` / Password: `1234`
- Username: `mekdes` / Password: `5678`

## Project Structure

```
merkato-driver/
├── backend/              # Express.js API server
│   ├── src/
│   │   ├── server.ts     # Main server file
│   │   ├── routes/       # API routes
│   │   └── data/         # Mock data
├── driver-app/           # Expo React Native app
│   ├── app/              # Expo Router screens
│   │   ├── (tabs)/       # Tab navigation
│   │   ├── login.tsx     # Login screen
│   │   └── delivery-detail.tsx
│   ├── api/              # API client
│   ├── types/            # TypeScript types
│   └── utils/            # Utility functions
└── package.json          # Root package config
```

## API Endpoints

- `POST /api/auth/login` - Authenticate driver
- `GET /api/deliveries/:driverId` - Get driver's deliveries
- `PATCH /api/deliveries/:id/status` - Update delivery status

## Delivery Cities

The app includes mock deliveries to:
- Nekemte (320 km from Addis Ababa)
- Shashemene (250 km)
- Jimma (350 km)
- And more Ethiopian cities

## Development

### Backend Only
```bash
cd backend
npm run dev
```

### Frontend Only
```bash
cd driver-app
npm start
```

## License

ISC
