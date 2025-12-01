# create-rn-app

<p align="center">
  <h3 align="center">⚡ Create React Native App</h3>
  <p align="center">The fastest way to create a production-ready React Native app</p>
</p>

<p align="center">
  <img src="https://img.shields.io/npm/v/create-rn-app?style=flat-square" alt="npm version" />
  <img src="https://img.shields.io/npm/dm/create-rn-app?style=flat-square" alt="npm downloads" />
  <img src="https://img.shields.io/github/license/GilTRipper/create-rn-app?style=flat-square" alt="license" />
</p>

---

🚀 CLI tool to create a new React Native app with pre-configured setup including Firebase, Google Maps, Navigation, and more.

**Stop wasting time on boilerplate.** Get a production-ready React Native app in seconds with all the tools you need already configured.

## Quick Start

### Create a new project

```bash
npx @giltripper/create-rn-app MyAwesomeApp
```

### Interactive mode

```bash
npx @giltripper/create-rn-app
```

### With options

```bash
npx @giltripper/create-rn-app MyApp --package-manager pnpm --skip-install
```

### Non-interactive mode (CI/CD)

```bash
npx @giltripper/create-rn-app MyApp \
  --package-manager pnpm \
  --bundle-id com.company.myapp \
  --display-name "My App" \
  --skip-git \
  --yes
```

## Options

### Basic Options

- `[project-name]` - Name of your project (optional, will prompt if not provided)
- `-v, --version` - Display version number
- `-y, --yes` - Answer yes to all prompts (non-interactive mode)

### Package Manager

- `-p, --package-manager <manager>` - Package manager to use: `npm`, `yarn`, or `pnpm` (will prompt if not specified)

### Project Configuration

- `-b, --bundle-id <bundleId>` - Bundle identifier (e.g., `com.company.app`). If not provided, will prompt or use default based on project name.
- `-d, --display-name <displayName>` - App display name. If not provided, will prompt or use project name.

### Installation Options

- `--skip-install` - Skip dependency installation
- `--skip-pods` - Skip iOS CocoaPods installation
- `--skip-git` - Skip git initialization

## Examples

### Quick start with prompts

```bash
npx @giltripper/create-rn-app MyApp
```

### Full non-interactive setup

```bash
npx @giltripper/create-rn-app MyApp \
  -p pnpm \
  -b com.mycompany.myapp \
  -d "My Awesome App" \
  --skip-git \
  --yes
```

### Create project without installing dependencies

```bash
npx @giltripper/create-rn-app MyApp --skip-install
```

### Create project with specific package manager

```bash
npx @giltripper/create-rn-app MyApp -p yarn
```

## What's Included

The generated project includes a production-ready React Native app with:

- 🧭 React Navigation v7 with Stack and Drawer
- 📦 Zustand for state management, TanStack Query for server state
- 🔥 Firebase (Analytics, Messaging, Remote Config)
- 🗺️ Google Maps integration
- 🎨 Modern UI components (Bottom Sheet, Toast, Blur View, etc.)
- 📱 Native features (Push Notifications, Geolocation, Permissions, etc.)
- 🛠️ TypeScript, ESLint, Prettier, and development tools
- ⚡ Performance optimizations (Hermes, Reanimated, optimized images)

**For detailed information about the generated project, see the [Template README](./template/README.md)**

## Requirements

- **Node.js** >= 20
- **React Native development environment** setup
  - For iOS: Xcode, CocoaPods
  - For Android: Android Studio, JDK

See [React Native Environment Setup](https://reactnative.dev/docs/environment-setup) for detailed instructions.

## Non-Interactive Mode

The CLI supports fully non-interactive mode using the `--yes` flag, making it perfect for CI/CD pipelines and automation:

```bash
npx @giltripper/create-rn-app MyApp \
  --package-manager pnpm \
  --bundle-id com.company.myapp \
  --display-name "My App" \
  --skip-git \
  --yes
```

When using `--yes`, all prompts are automatically answered with default values, and you can provide all configuration via CLI flags.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

For major changes, please open an issue first to discuss what you would like to change.

## Documentation

### For Users
- 📱 [Template README](./template/README.md) - Complete guide for the generated React Native project
- 📝 [Changelog](./CHANGELOG.md) - Version history and changes

### For Contributors
- 📚 [Development Guide](./DEVELOPMENT.md) - For contributors and local development
- 🧪 [Tests README](./tests/README.md) - E2E testing guide
- 🚀 [Release Guide](./RELEASE.md) - For maintainers publishing to npm

## License

MIT © Gil T Ripper

## Support

If you encounter any issues, please file them in the [issues section](https://github.com/GilTRipper/create-rn-app/issues) of the repository.

---

**Made with ❤️ for the React Native community**
