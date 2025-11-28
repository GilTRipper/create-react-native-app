# Quick Start Guide

## For Users

### Install and Create App

```bash
# Using npx (once published)
npx create-react-native-app MyAwesomeApp

# Or interactive mode
npx create-react-native-app
```

## For Development (Local Testing)

### 1. Setup the CLI locally

```bash
cd /path/to/create-react-native-app

# Install dependencies
npm install

# Link the CLI globally
npm link
```

### 2. Test by creating a new app

```bash
# Go to a test directory
cd ~/Desktop

# Create a test app
create-react-native-app MyTestApp

# Follow the prompts:
# - Project name: MyTestApp
# - Bundle identifier: com.mytestapp
# - Display name: My Test App
# - Package manager: pnpm (or npm/yarn)
# - Install dependencies: Yes
```

### 3. Run the created app

```bash
cd MyTestApp

# For iOS (macOS only)
pnpm run ios

# For Android
pnpm run android
```

## Publishing to npm

### First time setup

```bash
# Login to npm
npm login
```

### Publish

```bash
cd /path/to/create-react-native-app

# Update version (optional)
npm version patch

# Publish
npm publish
```

### After publishing, test it

```bash
# Go somewhere else
cd ~/Desktop/test

# Try the published version
npx create-react-native-app PublishedTest
```

## What Gets Created

When you run `create-react-native-app MyApp`, it will:

1. ✅ Create a new directory `MyApp`
2. ✅ Copy the template with all files
3. ✅ Replace all placeholders:
   - `HelloWorld` → `MyApp`
   - `helloworld` → `myapp`
   - `com.helloworld` → `com.myapp`
4. ✅ Rename directories:
   - `ios/HelloWorld/` → `ios/MyApp/`
   - `ios/HelloWorld.xcodeproj` → `ios/MyApp.xcodeproj`
   - `android/.../com/helloworld/` → `android/.../com/myapp/`
5. ✅ Install dependencies (if not skipped)
6. ✅ Install iOS pods (if on macOS and not skipped)
7. ✅ Initialize git repository (if not skipped)

## CLI Options

```bash
# Basic usage
create-react-native-app MyApp

# With specific package manager
create-react-native-app MyApp --package-manager pnpm
create-react-native-app MyApp -p npm

# Skip dependency installation
create-react-native-app MyApp --skip-install

# Skip git initialization
create-react-native-app MyApp --skip-git

# Combine options
create-react-native-app MyApp -p yarn --skip-git

# Interactive mode (will prompt for everything)
create-react-native-app
```

## Troubleshooting

### "command not found: create-react-native-app"

After `npm link`:
- Restart your terminal
- Check npm global bin: `npm bin -g`
- Make sure it's in your PATH

### Template not copying correctly

- Check `package.json` has `"template"` in `files` array
- Verify template directory exists and has files

### Placeholders not replaced

- Check `src/template.js` replacement logic
- Verify file paths in `filesToReplace` array

### Pods install fails

- Make sure you're on macOS
- Install CocoaPods: `sudo gem install cocoapods`
- Or run manually: `cd ios && pod install`

## Next Steps

1. ✅ Created the CLI tool
2. ⏭️ Test locally with `npm link`
3. ⏭️ Create a few test apps
4. ⏭️ Fix any issues
5. ⏭️ Publish to npm
6. ⏭️ Test the published version
7. ⏭️ Share with others!

## Examples

### Creating a production app

```bash
create-react-native-app MyProductionApp
cd MyProductionApp

# Add Firebase config files
# - android/app/google-services.json
# - ios/MyProductionApp/GoogleService-Info.plist

# Setup Google Maps in android/local.properties
echo "GOOGLE_MAPS_API_KEY=your_key_here" >> android/local.properties

# Run the app
pnpm run ios
pnpm run android
```

### Creating for a specific client

```bash
create-react-native-app ClientApp --package-manager yarn
cd ClientApp

# Update app name in app.json if needed
# Add branding, icons, etc.
# Setup Firebase
# Run and test
```

## Getting Help

If something doesn't work:
1. Check DEVELOPMENT.md for detailed development guide
2. Read template/SETUP.md for app setup instructions
3. Check the README.md for feature documentation

