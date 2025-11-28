# 📖 Documentation Index

Welcome to **create-react-native-app** - your custom React Native CLI tool!

## 🎯 Start Here

### New to this project? Start with:
1. **[SUMMARY.md](SUMMARY.md)** 📋 - Complete overview of what was created
2. **[GET_STARTED.md](GET_STARTED.md)** ⚡ - Quick start in 1 minute

## 📚 Main Documentation

### For CLI Development
- **[README.md](README.md)** - Main README with features and usage
- **[DEVELOPMENT.md](DEVELOPMENT.md)** - Detailed development guide
- **[QUICKSTART.md](QUICKSTART.md)** - Quick reference for testing

### For Template Users
- **[template/README.md](template/README.md)** - Generated app documentation
- **[template/SETUP.md](template/SETUP.md)** - Setup instructions for Firebase & Maps

## 🗂️ Other Files

- **[CHANGELOG.md](CHANGELOG.md)** - Version history
- **[LICENSE](LICENSE)** - MIT License
- **[package.json](package.json)** - CLI package configuration
- **[test-cli.sh](test-cli.sh)** - Automated test script

## 📂 Directory Structure

```
create-react-native-app/
│
├── 📖 Documentation
│   ├── INDEX.md (this file)
│   ├── SUMMARY.md ⭐ START HERE
│   ├── GET_STARTED.md ⚡ QUICK START
│   ├── README.md
│   ├── DEVELOPMENT.md
│   ├── QUICKSTART.md
│   ├── CHANGELOG.md
│   └── LICENSE
│
├── 💻 CLI Source Code
│   ├── bin/
│   │   └── cli.js (entry point)
│   └── src/
│       ├── index.js (main logic)
│       ├── prompts.js (interactive questions)
│       ├── template.js (template processing)
│       └── utils.js (helper functions)
│
├── 📱 React Native Template
│   └── template/
│       ├── android/ (Android app)
│       ├── ios/ (iOS app)
│       ├── assets/ (fonts, icons)
│       ├── src/ (app source code)
│       ├── SETUP.md (for template users)
│       └── ... (your app files)
│
├── 🧪 Testing
│   └── test-cli.sh (automated tests)
│
└── ⚙️ Configuration
    ├── package.json
    ├── .gitignore
    └── .npmignore
```

## 🚀 Quick Commands

### Setup
```bash
cd /path/to/create-react-native-app
npm install
npm link
```

### Test Locally
```bash
create-react-native-app MyTestApp
```

### Run Tests
```bash
./test-cli.sh
```

### Publish
```bash
npm publish
```

## 🎯 Workflow

### First Time Setup
1. Read [SUMMARY.md](SUMMARY.md)
2. Follow [GET_STARTED.md](GET_STARTED.md)
3. Create a test app
4. Verify it works

### Daily Development
1. Make changes to `src/` or `template/`
2. Test with `create-react-native-app TestApp --skip-install`
3. Run `./test-cli.sh` for automated checks
4. Update [CHANGELOG.md](CHANGELOG.md)

### Before Publishing
1. Test with all package managers
2. Test generated app builds (iOS & Android)
3. Update version in `package.json`
4. Run `npm publish`
5. Test published version with `npx create-react-native-app`

## 📦 What Gets Published

When you run `npm publish`, these files are included:
- `bin/` - CLI executable
- `src/` - CLI source code
- `template/` - React Native template
- `package.json`, `README.md`, `LICENSE`

These are excluded:
- `node_modules/`
- Documentation (except README)
- Test files
- Git files

## 🎓 Learning Path

**Beginner** (just want to use it):
1. [GET_STARTED.md](GET_STARTED.md)
2. Create an app
3. Done!

**Intermediate** (want to customize):
1. [SUMMARY.md](SUMMARY.md)
2. [QUICKSTART.md](QUICKSTART.md)
3. Edit `template/` files
4. Test locally

**Advanced** (want to modify CLI):
1. [DEVELOPMENT.md](DEVELOPMENT.md)
2. Edit `src/` files
3. Run [test-cli.sh](test-cli.sh)
4. Publish to npm

## 🔗 External Resources

### React Native
- [React Native Docs](https://reactnative.dev/)
- [React Native CLI](https://github.com/react-native-community/cli)

### CLI Tools Used
- [Commander.js](https://github.com/tj/commander.js/) - CLI framework
- [Inquirer.js](https://github.com/SBoudrias/Inquirer.js/) - Interactive prompts
- [Ora](https://github.com/sindresorhus/ora) - Spinners
- [Chalk](https://github.com/chalk/chalk) - Terminal colors
- [fs-extra](https://github.com/jprichardson/node-fs-extra) - File operations
- [execa](https://github.com/sindresorhus/execa) - Process execution

### Publishing
- [npm Publishing Guide](https://docs.npmjs.com/cli/v9/commands/npm-publish)
- [Semantic Versioning](https://semver.org/)

## ❓ FAQ

**Q: Where do I start?**
A: Read [SUMMARY.md](SUMMARY.md) then [GET_STARTED.md](GET_STARTED.md)

**Q: How do I test locally?**
A: Run `npm link` then `create-react-native-app TestApp`

**Q: How do I customize the template?**
A: Edit files in `template/` directory

**Q: How do I publish?**
A: Run `npm publish` (after `npm login`)

**Q: What if users need Firebase/Maps setup?**
A: They follow `template/SETUP.md` after creating app

**Q: Can I add more prompts?**
A: Yes! Edit `src/prompts.js`

**Q: Can I add more CLI options?**
A: Yes! Edit `src/index.js`

## 🎉 Ready to Go!

Start here: **[GET_STARTED.md](GET_STARTED.md)** ⚡

Or deep dive: **[SUMMARY.md](SUMMARY.md)** 📋

Questions? Check **[DEVELOPMENT.md](DEVELOPMENT.md)** 📚

---

Made with ❤️ for rapid React Native development

