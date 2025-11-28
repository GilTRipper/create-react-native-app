# Development Guide

Guide for developing and testing the `create-react-native-app` CLI tool.

## Local Development

### 1. Install dependencies

```bash
cd create-react-native-app
npm install
```

### 2. Link the CLI locally

```bash
npm link
```

This makes the `create-react-native-app` command available globally on your machine.

### 3. Test the CLI

```bash
# Create a test app
create-react-native-app TestApp

# Or with options
create-react-native-app TestApp --package-manager pnpm --skip-install
```

### 4. Unlink when done testing

```bash
npm unlink -g create-react-native-app
```

## Testing Changes

After making changes to the CLI code:

1. No need to run `npm link` again if already linked
2. Just run the command again to test new changes
3. Make sure to test all options:
   - Different package managers (npm, yarn, pnpm)
   - Skip install flag
   - Skip git flag
   - Interactive vs argument modes

## Updating the Template

The template is in the `template/` directory. To update it:

1. Make changes to files in `template/`
2. Remember that these placeholders will be replaced:
   - `HelloWorld` → project name (PascalCase)
   - `helloworld` → project name (lowercase)
   - `com.helloworld` → bundle identifier
   - `Hello World` → display name

3. Test by creating a new app with the CLI

## Template Placeholders

Files that contain placeholders:
- `package.json` - name field
- `app.json` - name and displayName
- `android/app/build.gradle` - applicationId
- `android/settings.gradle` - rootProject.name
- `android/app/src/main/AndroidManifest.xml` - package name
- `ios/Podfile` - target name
- Kotlin/Swift source files - package/bundle names

## Directory Structure

```
create-react-native-app/
├── bin/
│   └── cli.js              # Entry point (executable)
├── src/
│   ├── index.js            # Main CLI logic
│   ├── prompts.js          # Interactive prompts
│   ├── template.js         # Template copying and replacement
│   └── utils.js            # Utility functions
├── template/               # React Native app template
│   ├── android/
│   ├── ios/
│   ├── src/
│   └── ...
├── package.json
└── README.md
```

## Publishing

### 1. Test thoroughly

```bash
# Create several test apps with different configurations
create-react-native-app TestApp1 --package-manager npm
create-react-native-app TestApp2 --package-manager yarn
create-react-native-app TestApp3 --package-manager pnpm --skip-install
```

### 2. Update version

```bash
npm version patch  # or minor, or major
```

### 3. Login to npm

```bash
npm login
```

### 4. Publish

```bash
npm publish
```

### 5. Test published version

```bash
npx create-react-native-app TestPublished
```

## Troubleshooting

### "command not found" after npm link
- Make sure npm global bin directory is in your PATH
- Check with: `npm bin -g`
- Add to PATH if needed

### Changes not reflected
- Unlink and link again
- Or restart your terminal

### Template files not copying
- Check `files` field in package.json includes `template`
- Verify `.npmignore` doesn't exclude template directory

## Best Practices

1. **Always test on both macOS and Linux** (if possible)
2. **Test with all three package managers** (npm, yarn, pnpm)
3. **Verify the generated app builds and runs** on both iOS and Android
4. **Check that all placeholders are replaced** correctly
5. **Test edge cases**: special characters in names, existing directories, etc.

## Adding New Features

### Adding a new prompt

Edit `src/prompts.js`:

```javascript
questions.push({
  type: 'list',
  name: 'newFeature',
  message: 'Select a feature:',
  choices: ['Option1', 'Option2'],
  default: 'Option1'
});
```

### Adding a new CLI option

Edit `src/index.js`:

```javascript
.option('--new-flag', 'Description of new flag')
```

### Adding template modifications

Edit `src/template.js` in the `createApp` function to add custom logic for file manipulation.

## Git Workflow

```bash
# Create a feature branch
git checkout -b feature/new-feature

# Make changes and commit
git add .
git commit -m "Add new feature"

# Push and create PR
git push origin feature/new-feature
```

## Release Checklist

- [ ] All tests pass
- [ ] Version bumped
- [ ] CHANGELOG updated
- [ ] README updated if needed
- [ ] Tested locally with `npm link`
- [ ] Published to npm
- [ ] Tested with `npx create-react-native-app`
- [ ] Git tag created
- [ ] Changes pushed to GitHub

