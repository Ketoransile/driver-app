# Merkato Driver - Expo Mobile App Guide

## Getting Started with the Mobile App

### Prerequisites
- Node.js 18+ installed ✅
- Backend API running on port 3000 ✅

### Running the Expo App

#### Option 1: Using Expo Go (Recommended for Development)

1. **Install Expo Go** on your mobile device:
   - iOS: Download from App Store
   - Android: Download from Google Play Store

2. **Start the Expo dev server:**
   ```bash
   cd driver-app
   npm start
   ```

3. **Scan the QR code** that appears in the terminal:
   - iOS: Use your Camera app to scan
   - Android: Use the Expo Go app to scan

4. The app will open in Expo Go on your device

#### Option 2: Using Emulators

**iOS Simulator** (macOS only):
```bash
cd driver-app
npm run ios
```

**Android Emulator**:
```bash
cd driver-app
npm run android
```

### Important Notes

1. **Backend Connection**:
   - The app is configured to connect to `http://localhost:3000`
   - If testing on a physical device, you need to update the API URL in `driver-app/api/client.ts` to use your computer's local network IP address
   - Example: Change `http://localhost:3000/api` to `http://192.168.1.100:3000/api` (use your actual IP)

2. **Finding Your IP Address**:
   ```bash
   # macOS/Linux:
   ifconfig | grep "inet " | grep -v 127.0.0.1
   
   # Windows:
   ipconfig
   ```

3. **Maps Configuration**:
   - The app uses react-native-maps which requires Google Maps API keys for production
   - For development with Expo Go, basic maps work without configuration
   - For production builds, add your API keys in `driver-app/app.json`

### Demo Flow

1. **Login Screen**:
   - Use `abebe` / `1234` or `mekdes` / `5678`
   - Credentials are validated against the backend API

2. **Dashboard**:
   - View driver stats (active deliveries, completed, cities)
   - See Addis Ababa on the map with delivery markers
   - Toggle online/offline status
   - Navigate to deliveries

3. **Deliveries Screen**:
   - View all assigned deliveries in modern cards
   - Pull to refresh
   - Tap any delivery to view details

4. **Delivery Detail Screen**:
   - See route from Addis Ababa to destination
   - View recipient information
   - Call recipient (opens phone dialer)
   - Update status:
     - "Start Delivery" (Pending → In Transit)
     - "Mark as Delivered" (In Transit → Delivered)

5. **Profile Screen**:
   - View driver information and rating
   - See total deliveries
   - Logout (clears local storage)

### Troubleshooting

**App won't connect to backend:**
- Ensure backend is running: `curl http://localhost:3000`
- If on physical device, update API URL to use network IP
- Check that both devices are on the same WiFi network

**Maps not showing:**
- Maps should work in Expo Go without configuration
- If blank, try restarting the Expo dev server
- Ensure location permissions are granted (if requested)

**Changes not appearing:**
- Shake device and tap "Reload"
- Or press 'r' in the terminal where Expo is running

### Development Tips

- **Hot Reload**: Edit any file and save - changes appear instantly
- **Debug Menu**: Shake device or press Cmd+D (iOS) / Cmd+M (Android)
- **Logs**: View console logs in the terminal or in the Debug Menu
- **Restart**: Press 'r' in terminal to reload app

### Project Structure

```
driver-app/
├── app/                    # Expo Router screens
│   ├── (tabs)/            # Tab navigation screens
│   │   ├── dashboard.tsx  # Main dashboard with map
│   │   ├── deliveries.tsx # Deliveries list
│   │   └── profile.tsx    # Driver profile
│   ├── _layout.tsx        # Root layout
│   ├── index.tsx          # Entry point / splash
│   ├── login.tsx          # Login screen
│   └── delivery-detail.tsx # Delivery detail modal
├── api/
│   └── client.ts          # API client (axios)
├── types/
│   └── index.ts           # TypeScript types
├── utils/
│   └── storage.ts         # AsyncStorage helpers
├── app.json               # Expo configuration
├── package.json           # Dependencies
└── tsconfig.json          # TypeScript config
```

### Next Steps

1. **Test the full flow** end-to-end
2. **Customize** the theme colors or add features
3. **Build** for production when ready:
   ```bash
   npx expo build:android
   npx expo build:ios
   ```

For more Expo documentation, visit: https://docs.expo.dev/
