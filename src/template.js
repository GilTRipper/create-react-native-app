const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const ora = require('ora');
const { execa } = require('execa');
const { replaceInFile, replaceInFilesRecursively } = require('./utils');

async function createApp(config) {
  const { projectName, projectPath, bundleIdentifier, displayName, packageManager, skipInstall, skipGit } = config;
  
  const templatePath = path.join(__dirname, '../template');

  // Step 1: Copy template
  const copySpinner = ora('Copying template files...').start();
  try {
    await fs.ensureDir(projectPath);
    await fs.copy(templatePath, projectPath, {
      filter: (src) => {
        // Skip node_modules, build folders, etc.
        const relativePath = path.relative(templatePath, src);
        return !relativePath.includes('node_modules') &&
               !relativePath.includes('.git') &&
               !relativePath.includes('build') &&
               !relativePath.includes('Pods') &&
               !relativePath.includes('android/app/build') &&
               !relativePath.includes('ios/build');
      }
    });

    // Rename _gitignore to .gitignore
    const gitignorePath = path.join(projectPath, '_gitignore');
    if (await fs.pathExists(gitignorePath)) {
      await fs.move(gitignorePath, path.join(projectPath, '.gitignore'));
    }

    copySpinner.succeed('Template files copied');
  } catch (error) {
    copySpinner.fail('Failed to copy template files');
    throw error;
  }

  // Step 2: Replace placeholders
  const replaceSpinner = ora('Replacing placeholders...').start();
  try {
    const replacements = {
      'HelloWorld': projectName,
      'helloworld': projectName.toLowerCase(),
      'com.helloworld': bundleIdentifier,
      'Hello World': displayName,
    };

    // Files to replace
    const filesToReplace = [
      'package.json',
      'app.json',
      'index.js',
      'android/settings.gradle',
      'android/app/build.gradle',
      'android/app/src/main/AndroidManifest.xml',
      'android/app/src/main/java/com/helloworld/MainActivity.kt',
      'android/app/src/main/java/com/helloworld/MainApplication.kt',
      'ios/Podfile',
      'ios/HelloWorld/Info.plist',
      'ios/HelloWorld.xcodeproj/project.pbxproj',
    ];

    for (const file of filesToReplace) {
      const filePath = path.join(projectPath, file);
      if (await fs.pathExists(filePath)) {
        await replaceInFile(filePath, replacements);
      }
    }

    // Rename iOS folder
    const iosOldPath = path.join(projectPath, 'ios/HelloWorld');
    const iosNewPath = path.join(projectPath, `ios/${projectName}`);
    if (await fs.pathExists(iosOldPath)) {
      await fs.move(iosOldPath, iosNewPath);
    }

    // Rename iOS xcodeproj
    const xcodeprojOldPath = path.join(projectPath, 'ios/HelloWorld.xcodeproj');
    const xcodeprojNewPath = path.join(projectPath, `ios/${projectName}.xcodeproj`);
    if (await fs.pathExists(xcodeprojOldPath)) {
      await fs.move(xcodeprojOldPath, xcodeprojNewPath);
    }

    // Rename iOS xcworkspace
    const xcworkspaceOldPath = path.join(projectPath, 'ios/HelloWorld.xcworkspace');
    const xcworkspaceNewPath = path.join(projectPath, `ios/${projectName}.xcworkspace`);
    if (await fs.pathExists(xcworkspaceOldPath)) {
      await fs.move(xcworkspaceOldPath, xcworkspaceNewPath);
    }

    // Rename Android package directories
    const androidOldPath = path.join(projectPath, 'android/app/src/main/java/com/helloworld');
    const bundleParts = bundleIdentifier.split('.');
    const androidNewPath = path.join(projectPath, `android/app/src/main/java/${bundleParts.join('/')}`);
    if (await fs.pathExists(androidOldPath)) {
      await fs.ensureDir(path.dirname(androidNewPath));
      await fs.move(androidOldPath, androidNewPath);
    }

    replaceSpinner.succeed('Placeholders replaced');
  } catch (error) {
    replaceSpinner.fail('Failed to replace placeholders');
    throw error;
  }

  // Step 3: Install dependencies
  if (!skipInstall) {
    const installSpinner = ora(`Installing dependencies with ${packageManager}...`).start();
    try {
      await execa(packageManager, ['install'], {
        cwd: projectPath,
        stdio: 'inherit'
      });
      installSpinner.succeed('Dependencies installed');
    } catch (error) {
      installSpinner.fail('Failed to install dependencies');
      console.log(chalk.yellow('You can install them manually later with:'), `${packageManager} install`);
    }

    // Install pods for iOS
    if (process.platform === 'darwin') {
      const podSpinner = ora('Installing iOS pods...').start();
      try {
        await execa('pod', ['install'], {
          cwd: path.join(projectPath, 'ios'),
          stdio: 'inherit'
        });
        podSpinner.succeed('iOS pods installed');
      } catch (error) {
        podSpinner.fail('Failed to install pods');
        console.log(chalk.yellow('You can install them manually later with:'), 'cd ios && pod install');
      }
    }
  }

  // Step 4: Initialize git
  if (!skipGit) {
    const gitSpinner = ora('Initializing git repository...').start();
    try {
      await execa('git', ['init'], { cwd: projectPath });
      await execa('git', ['add', '.'], { cwd: projectPath });
      await execa('git', ['commit', '-m', 'Initial commit'], { cwd: projectPath });
      gitSpinner.succeed('Git repository initialized');
    } catch (error) {
      gitSpinner.fail('Failed to initialize git');
      console.log(chalk.yellow('You can initialize git manually later'));
    }
  }
}

module.exports = { createApp };

