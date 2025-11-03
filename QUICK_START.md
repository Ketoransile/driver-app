# Merkato Driver - Quick Start Guide 🚚

## What You Have Now

A complete full-stack last-mile delivery driver application for Ethiopia with:

✅ **Backend API** (Express.js + TypeScript)
- Running on http://localhost:3000
- Mock authentication with JWT
- Delivery management endpoints
- 5 Ethiopian cities with delivery data

✅ **Mobile App** (Expo React Native + TypeScript)
- 5 Beautiful screens with dark theme
- Ethiopian color accents (green, yellow, red)
- Map integration with routes
- Real-time delivery status updates

## Get Started in 3 Steps

### 1. Backend is Already Running! ✅
The backend API is running on port 3000. You can test it:
```bash
curl http://localhost:3000
```

### 2. Start the Mobile App

Open a new terminal and run:
```bash
cd driver-app
npm start
```

This will show you a QR code. You have two options:

**Option A: Use Your Phone (Recommended)**
1. Install "Expo Go" app from App Store or Google Play
2. Scan the QR code with your phone camera
3. The app opens in Expo Go

**Option B: Use an Emulator**
- Press 'a' for Android emulator
- Press 'i' for iOS simulator (Mac only)

### 3. Login and Explore!

Use these demo credentials:
- Username: `abebe` Password: `1234`
- Username: `mekdes` Password: `5678`

## What to Try

1. **Dashboard**: See your location in Addis Ababa and delivery markers
2. **Deliveries**: View deliveries to Nekemte, Shashemene, Jimma, Hawassa
3. **Delivery Detail**: 
   - See route on map from Addis Ababa to destination
   - Call recipient (opens phone dialer)
   - Update status: Pending → In Transit → Delivered
4. **Profile**: View driver stats and logout

## Important Notes

### Using a Physical Device?
If the app can't connect to the backend:
1. Find your computer's IP address:
   ```bash
   # On Mac/Linux:
   ifconfig | grep "inet " | grep -v 127.0.0.1
   
   # On Windows:
   ipconfig
   ```

2. Update the API URL in `driver-app/api/client.ts`:
   ```typescript
   const API_URL = 'http://192.168.1.100:3000/api'; // Use your actual IP
   ```

3. Restart the Expo server (Ctrl+C then `npm start`)

## Troubleshooting

**"Cannot connect to backend"**
→ Make sure backend is running: `curl http://localhost:3000`

**Changes not showing in app**
→ Press 'r' in the Expo terminal or shake your device and tap "Reload"

**Maps not loading**
→ Maps work without configuration in development. Give it a few seconds to load.

## Project Structure

```
merkato-driver/
├── backend/              ← Express.js API (Port 3000)
│   ├── src/
│   │   ├── server.ts    ← Main server
│   │   ├── routes/      ← API endpoints
│   │   └── data/        ← Mock data
│
├── driver-app/           ← Expo React Native App
│   ├── app/             ← All screens
│   │   ├── (tabs)/      ← Dashboard, Deliveries, Profile
│   │   ├── login.tsx
│   │   └── delivery-detail.tsx
│   ├── api/client.ts    ← API connection
│   └── utils/storage.ts ← Local storage
│
└── README.md            ← Full documentation
```

## Development Tips

- **Hot Reload**: Edit code and save - changes appear instantly
- **View Logs**: All console.log() output shows in the terminal
- **Debug Menu**: Shake device or Cmd+D (iOS) / Cmd+M (Android)
- **Backend Logs**: Check the "Backend API" workflow logs in Replit

## Next Steps

Once you're comfortable with the app:
1. Customize the Ethiopian color theme
2. Add more delivery cities
3. Modify the driver profile data
4. Add new features like delivery photos

## Need Help?

- **Expo Docs**: https://docs.expo.dev/
- **React Native Docs**: https://reactnative.dev/
- **Express Docs**: https://expressjs.com/

---

**Happy Delivery! 🚚🇪🇹**
