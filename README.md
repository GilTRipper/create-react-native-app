# create-react-native-app

<p align="center">
  <h3 align="center">⚡ Create TR React Native App</h3>
  <p align="center">The fastest way to create a production-ready React Native app</p>
</p>

<p align="center">
  <img src="https://img.shields.io/npm/v/create-react-native-app?style=flat-square" alt="npm version" />
  <img src="https://img.shields.io/npm/dm/create-react-native-app?style=flat-square" alt="npm downloads" />
  <img src="https://img.shields.io/github/license/yourusername/create-react-native-app?style=flat-square" alt="license" />
</p>

---

🚀 CLI tool to create a new React Native app with pre-configured setup including Firebase, Google Maps, Navigation, and more.

**Stop wasting time on boilerplate.** Get a production-ready React Native app in seconds with all the tools you need already configured.

## Features

✨ **Pre-configured Stack:**
- 🔥 Firebase (Analytics, Messaging, Remote Config)
- 🗺️ Google Maps
- 🧭 React Navigation (Stack + Drawer)
- 🎨 React Native Reanimated
- 📦 MMKV Storage
- 🔔 Notifee Push Notifications
- 📷 Image Picker
- 🎭 Bottom Sheet
- 📱 TypeScript
- 🎯 And much more...

## Usage

### Create a new project

```bash
npx create-react-native-app MyAwesomeApp
```

### Interactive mode

```bash
npx create-react-native-app
```

### With options

```bash
npx create-react-native-app MyApp --package-manager pnpm --skip-install
```

## Options

- `[project-name]` - Name of your project (optional, will prompt if not provided)
- `--skip-install` - Skip dependency installation
- `--skip-git` - Skip git initialization
- `-p, --package-manager <manager>` - Package manager to use: npm, yarn, or pnpm (default: pnpm)

## After Creation

### 1. Setup Firebase

Add Firebase configuration files:
- **Android**: Place `google-services.json` in `android/app/`
- **iOS**: Place `GoogleService-Info.plist` in `ios/`

### 2. Setup Google Maps

Add Google Maps API keys:
- **Android**: Add `GOOGLE_MAPS_API_KEY=your_key` to `android/local.properties`
- **iOS**: Add your API key to `ios/YourApp/Info.plist`

### 3. Run the app

```bash
# iOS
npm run ios
# or
yarn ios
# or
pnpm ios

# Android
npm run android
# or
yarn android
# or
pnpm android
```

## What's Included

### Navigation
- React Navigation v7 with Stack and Drawer
- Pre-configured navigation structure

### State Management
- Zustand for global state
- TanStack Query for server state
- MMKV for persistent storage

### UI Components
- Bottom Sheet
- Toast Messages
- Blur View
- Fast Image
- Custom fonts (Golos Text, Tajawal, Urbanist)

### Native Features
- Push Notifications (Notifee)
- Geolocation
- Network Info
- Device Info
- Haptic Feedback
- Permissions

### Development Tools
- TypeScript
- ESLint with custom rules
- Prettier
- Custom scripts for icons and modules
- Reactotron for debugging

### Performance
- Hermes Engine
- React Native Reanimated
- Optimized images (AVIF, WebP, SVG support)

## Requirements

- Node.js >= 20
- React Native development environment setup
- For iOS: Xcode, CocoaPods
- For Android: Android Studio, JDK

## Local Development

To test the CLI locally:

```bash
# Clone the repository
git clone <your-repo>
cd create-react-native-app

# Install dependencies
npm install

# Link locally
npm link

# Now you can use it anywhere
create-react-native-app TestApp
```

## Publishing

```bash
npm login
npm publish
```

## License

MIT

## Support

If you encounter any issues, please file them in the issues section of the repository.

