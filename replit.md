# Merkato Driver - Last-Mile Delivery App for Ethiopia

## Overview
A full-stack mobile delivery driver application built with Expo React Native and Express.js. Features a modern dark theme with Ethiopian color accents (green, yellow, red) and integrated maps showing delivery routes from Addis Ababa to various Ethiopian cities.

## Project Structure
- **Backend**: Express.js TypeScript server with mock data and RESTful API
- **Frontend**: Expo React Native mobile app with TypeScript and Expo Router
- **Data**: Constant arrays (no database) for demo purposes

## Tech Stack
### Backend
- Express.js (TypeScript)
- Mock authentication with JWT
- CORS enabled
- Nodemon for development

### Frontend
- Expo SDK 51
- React Native with TypeScript
- Expo Router for navigation
- react-native-maps for mapping features
- AsyncStorage for local data persistence
- NativeWind for Tailwind-style styling
- React Native Paper for UI components

## Key Features
1. **Authentication**: Mock login system with demo credentials
2. **Dashboard**: Driver stats, map view centered on Addis Ababa
3. **Deliveries**: List view with Ethiopian-styled cards
4. **Delivery Details**: Route visualization from Addis Ababa to destination
5. **Status Management**: Update deliveries (Pending → In Transit → Delivered)
6. **Profile**: Driver info, ratings, and logout functionality
7. **Call Integration**: Direct phone dialing to recipients

## Demo Credentials
- Username: `abebe` / Password: `1234`
- Username: `mekdes` / Password: `5678`

## Development
- Backend runs on port 5000
- Expo dev server runs on port 8081
- Use `npm run dev` to start both servers concurrently

## Ethiopian Cities Featured
- Nekemte (320 km)
- Shashemene (250 km)
- Jimma (350 km)
- Hawassa (275 km)
- Bahir Dar (565 km)

## Color Scheme
- Ethiopian Green: #009639
- Ethiopian Yellow: #FEDD00
- Ethiopian Red: #DA121A
- Dark Background: #1a1a1a
- Dark Cards: #2a2a2a

## Recent Changes
- Initial project setup completed
- Full backend API with mock data
- Complete mobile app with all screens
- Map integration with route visualization
- Dark theme with Ethiopian color accents

## Architecture Decisions
- Monorepo structure with separate backend and driver-app folders
- Mock data approach for demo/MVP purposes
- Expo Router for file-based navigation
- TypeScript throughout for type safety
- Concurrent development setup for streamlined workflow
