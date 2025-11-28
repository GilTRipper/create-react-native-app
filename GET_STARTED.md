# 🚀 Get Started with create-react-native-app

## ⚡ Quick Test (1 minute)

```bash
# 1. Go to CLI directory
cd /path/to/create-react-native-app

# 2. Install dependencies
npm install

# 3. Link globally
npm link

# 4. Test it!
cd ~/Desktop
create-react-native-app MyTestApp
```

That's it! You'll see an interactive prompt. Answer the questions and your app will be created! 🎉

## 📺 What You'll See

```
🚀 Create TR React Native App

? What is your project name? MyTestApp
? What is your bundle identifier? com.mytestapp
? What is your app display name? My Test App
? Which package manager would you like to use? pnpm
? Install dependencies now? Yes

✔ Template files copied
✔ Placeholders replaced
✔ Dependencies installed
✔ iOS pods installed
✔ Git repository initialized

✅ Project created successfully!

Next steps:

  cd MyTestApp

📱 Setup Firebase:
  1. Add google-services.json to android/app/
  2. Add GoogleService-Info.plist to ios/

🗺️  Setup Google Maps:
  1. Add GOOGLE_MAPS_API_KEY to android/local.properties
  2. Add Google Maps API key to ios/

🏃 Run the app:

  pnpm run ios
  pnpm run android
```

## 🎯 Usage Examples

### Create with custom name
```bash
create-react-native-app MyAwesomeApp
```

### Use specific package manager
```bash
create-react-native-app MyApp --package-manager yarn
create-react-native-app MyApp -p npm
```

### Skip dependency installation (faster for testing)
```bash
create-react-native-app TestApp --skip-install
```

### Skip everything (just copy template)
```bash
create-react-native-app QuickTest --skip-install --skip-git
```

## 🧪 Run Automated Tests

```bash
cd /path/to/create-react-native-app
./test-cli.sh
```

This will:
- Create test apps with different configs
- Verify placeholders are replaced
- Check directory structure
- Report success/failure

## 📱 Test the Generated App

After creating an app:

```bash
cd MyTestApp

# View the structure
ls -la

# Install if you skipped it
pnpm install
cd ios && pod install && cd ..

# Run on iOS
pnpm run ios

# Run on Android
pnpm run android
```

## 🐛 Common Issues & Solutions

### "command not found: create-react-native-app"
**Solution:**
```bash
# Make sure you ran npm link
cd /path/to/create-react-native-app
npm link

# Restart your terminal
```

### Placeholders not replaced
**Solution:**
Check `src/template.js` - make sure file paths in `filesToReplace` array match your actual file structure.

### Template files not copying
**Solution:**
```bash
# Check template directory exists
ls -la template/

# Verify package.json includes template in files array
cat package.json | grep -A 5 '"files"'
```

### iOS build fails
**Solution:**
```bash
cd MyTestApp/ios
pod install
pod update
```

### Android build fails
**Solution:**
```bash
cd MyTestApp/android
./gradlew clean
cd ..
pnpm run android
```

## 📦 Publishing Process

When ready to publish:

```bash
# 1. Test locally first
./test-cli.sh

# 2. Update version
npm version 1.0.0

# 3. Login to npm (first time only)
npm login

# 4. Publish
npm publish

# 5. Test the published version
cd ~/Desktop
npx create-react-native-app PublishedTest
```

## 🎨 Customize Your Template

Want to change what's in the generated apps?

```bash
# Edit files in template/
cd template/

# Make your changes
vim package.json
vim src/App.tsx
# etc...

# Test the changes
cd ..
npm link
create-react-native-app TestCustomized
```

## 📚 Documentation Files

- **README.md** - Main documentation
- **SUMMARY.md** - Project overview (READ THIS FIRST!)
- **QUICKSTART.md** - Quick start guide
- **DEVELOPMENT.md** - Detailed development guide
- **GET_STARTED.md** - This file
- **test-cli.sh** - Automated test script

## 💡 Tips

1. **Use `--skip-install`** when testing to speed things up
2. **Test with all 3 package managers** before publishing
3. **Keep template clean** - remove any personal API keys
4. **Update CHANGELOG.md** when making changes
5. **Version bump** before each publish

## 🎊 Next Actions

- [ ] Run `npm install` to get dependencies
- [ ] Run `npm link` to make CLI available
- [ ] Create a test app: `create-react-native-app TestApp`
- [ ] Run the test app: `cd TestApp && pnpm run ios`
- [ ] Run automated tests: `./test-cli.sh`
- [ ] Make any adjustments to template
- [ ] Publish to npm: `npm publish`
- [ ] Share with your team!

## 📞 Need Help?

Check these files in order:
1. **SUMMARY.md** - Overview of everything
2. **QUICKSTART.md** - Quick reference
3. **DEVELOPMENT.md** - Detailed development guide
4. **template/SETUP.md** - For app users

---

Ready? Let's go! 🚀

```bash
cd /path/to/create-react-native-app
npm install
npm link
create-react-native-app MyFirstApp
```

