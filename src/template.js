const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const ora = require('ora');
const execa = require("execa");
const { replaceInFile } = require("./utils");

async function createApp(config) {
  const {
    projectName,
    projectPath,
    bundleIdentifier,
    displayName,
    packageManager,
    skipInstall,
    skipGit,
    skipPods,
    autoYes,
  } = config;

  const templatePath = path.join(__dirname, "../template");

  // Step 1: Copy template
  const copySpinner = ora("Copying template files...").start();
  try {
    await fs.ensureDir(projectPath);
    await fs.copy(templatePath, projectPath, {
      filter: src => {
        // Skip node_modules, build folders, etc.
        const relativePath = path.relative(templatePath, src);
        return (
          !relativePath.includes("node_modules") &&
          !relativePath.includes(".git") &&
          !relativePath.includes("build") &&
          !relativePath.includes("Pods") &&
          !relativePath.includes("android/app/build") &&
          !relativePath.includes("ios/build")
        );
      },
    });

    // Rename _gitignore to .gitignore
    const gitignorePath = path.join(projectPath, "_gitignore");
    if (await fs.pathExists(gitignorePath)) {
      await fs.move(gitignorePath, path.join(projectPath, ".gitignore"));
    }

    copySpinner.succeed("Template files copied");
  } catch (error) {
    copySpinner.fail("Failed to copy template files");
    throw error;
  }

  // Step 2: Replace placeholders
  const replaceSpinner = ora("Replacing placeholders...").start();
  try {
    const replacements = {
      HelloWorld: projectName,
      helloworld: projectName.toLowerCase(),
      "com.helloworld": bundleIdentifier,
      "Hello World": displayName,
    };

    // Files to replace
    const filesToReplace = [
      "package.json",
      "app.json",
      "index.js",
      "android/settings.gradle",
      "android/app/build.gradle",
      "android/app/src/main/AndroidManifest.xml",
      "android/app/src/main/java/com/helloworld/MainActivity.kt",
      "android/app/src/main/java/com/helloworld/MainApplication.kt",
      "ios/Podfile",
      "ios/HelloWorld/Info.plist",
      "ios/HelloWorld.xcodeproj/project.pbxproj",
    ];

    for (const file of filesToReplace) {
      const filePath = path.join(projectPath, file);
      if (await fs.pathExists(filePath)) {
        await replaceInFile(filePath, replacements);
      }
    }

    // Special handling for app.json to ensure displayName is set correctly
    const appJsonPath = path.join(projectPath, "app.json");
    if (await fs.pathExists(appJsonPath)) {
      let appJsonContent = await fs.readFile(appJsonPath, "utf8");
      try {
        const appJson = JSON.parse(appJsonContent);
        // Ensure displayName is set correctly
        if (appJson.displayName !== displayName) {
          appJson.displayName = displayName;
          appJsonContent = JSON.stringify(appJson, null, 2);
          await fs.writeFile(appJsonPath, appJsonContent, "utf8");
        }
      } catch (error) {
        // If JSON parsing fails, the replaceInFile should have handled it
        console.log(
          chalk.yellow(`Warning: Could not parse app.json: ${error.message}`)
        );
      }
    }

    // Add package attribute to AndroidManifest.xml
    const androidManifestPath = path.join(
      projectPath,
      "android/app/src/main/AndroidManifest.xml"
    );
    if (await fs.pathExists(androidManifestPath)) {
      let manifestContent = await fs.readFile(androidManifestPath, "utf8");
      // Add package attribute to manifest tag if it doesn't exist
      if (!manifestContent.includes("package=")) {
        manifestContent = manifestContent.replace(
          /<manifest xmlns:android="http:\/\/schemas\.android\.com\/apk\/res\/android">/,
          `<manifest xmlns:android="http://schemas.android.com/apk/res/android" package="${bundleIdentifier}">`
        );
        await fs.writeFile(androidManifestPath, manifestContent, "utf8");
      }
    }

    // Rename iOS folder
    const iosOldPath = path.join(projectPath, "ios/HelloWorld");
    const iosNewPath = path.join(projectPath, `ios/${projectName}`);
    if (await fs.pathExists(iosOldPath)) {
      await fs.move(iosOldPath, iosNewPath);
    }

    // Rename iOS xcodeproj
    const xcodeprojOldPath = path.join(projectPath, "ios/HelloWorld.xcodeproj");
    const xcodeprojNewPath = path.join(
      projectPath,
      `ios/${projectName}.xcodeproj`
    );
    if (await fs.pathExists(xcodeprojOldPath)) {
      await fs.move(xcodeprojOldPath, xcodeprojNewPath);
    }

    // Rename iOS xcworkspace
    const xcworkspaceOldPath = path.join(
      projectPath,
      "ios/HelloWorld.xcworkspace"
    );
    const xcworkspaceNewPath = path.join(
      projectPath,
      `ios/${projectName}.xcworkspace`
    );
    if (await fs.pathExists(xcworkspaceOldPath)) {
      await fs.move(xcworkspaceOldPath, xcworkspaceNewPath);
    }

    // Rename Android package directories
    const androidOldPath = path.join(
      projectPath,
      "android/app/src/main/java/com/helloworld"
    );
    const bundleParts = bundleIdentifier.split(".");
    const androidNewPath = path.join(
      projectPath,
      `android/app/src/main/java/${bundleParts.join("/")}`
    );
    if (await fs.pathExists(androidOldPath)) {
      await fs.ensureDir(path.dirname(androidNewPath));
      await fs.move(androidOldPath, androidNewPath);
    }

    replaceSpinner.succeed("Placeholders replaced");
  } catch (error) {
    replaceSpinner.fail("Failed to replace placeholders");
    throw error;
  }

  // Step 3: Install dependencies
  let dependenciesInstalled = false;

  if (!skipInstall) {
    console.log(
      chalk.cyan(`\n📦 Installing dependencies with ${packageManager}...\n`)
    );

    try {
      const installArgs =
        packageManager === "npm"
          ? ["install", "--legacy-peer-deps"]
          : ["install"];

      await execa(packageManager, installArgs, {
        cwd: projectPath,
        stdio: "inherit",
        shell: true,
      });
      console.log(chalk.green("\n✅ Dependencies installed successfully!\n"));
      dependenciesInstalled = true;
    } catch (error) {
      console.log(chalk.red("\n❌ Failed to install dependencies"));

      if (error.message) {
        console.log(chalk.dim(`Error: ${error.message}`));
      }

      console.log(
        chalk.yellow(`\nYou can install dependencies manually later with:`)
      );
      console.log(chalk.cyan(`  cd ${projectName}`));
      console.log(chalk.cyan(`  ${packageManager} install\n`));
    }

    // Install pods for iOS only if dependencies were installed successfully
    if (dependenciesInstalled && process.platform === "darwin" && !skipPods) {
      let shouldInstallPods = autoYes;

      if (!autoYes) {
        const inquirer = require("inquirer");
        const { installPods } = await inquirer.prompt([
          {
            type: "confirm",
            name: "installPods",
            message: "Install iOS CocoaPods now?",
            default: true,
          },
        ]);
        shouldInstallPods = installPods;
      }

      if (shouldInstallPods) {
        console.log(chalk.cyan("\n📦 Installing iOS CocoaPods...\n"));
        try {
          await execa("pod", ["install"], {
            cwd: path.join(projectPath, "ios"),
            stdio: "inherit",
            shell: true,
          });
          console.log(
            chalk.green("\n✅ iOS CocoaPods installed successfully!\n")
          );
        } catch (error) {
          console.log(chalk.red("\n❌ Failed to install CocoaPods"));
          if (error.message) {
            console.log(chalk.dim(`Error: ${error.message}`));
          }
          console.log(
            chalk.yellow(`\nYou can install them manually later with:`)
          );
          console.log(chalk.cyan(`  cd ${projectName}/ios`));
          console.log(chalk.cyan(`  pod install\n`));
        }
      } else {
        console.log(chalk.yellow("\n⏭️  Skipping iOS CocoaPods installation"));
        console.log(chalk.gray("You can install them later with:"));
        console.log(chalk.cyan(`  cd ${projectName}/ios && pod install\n`));
      }
    } else if (!dependenciesInstalled && process.platform === "darwin") {
      console.log(
        chalk.yellow(
          "⚠️  Skipping iOS CocoaPods installation (dependencies not installed)\n"
        )
      );
    }
  }

  // Step 5: Initialize git
  if (!skipGit) {
    console.log(chalk.cyan("\n📁 Initializing git repository...\n"));
    try {
      await execa("git", ["init"], { cwd: projectPath });
      await execa("git", ["add", "."], { cwd: projectPath });
      await execa(
        "git",
        ["commit", "-m", "Initial commit from @giltripper/create-rn-app"],
        { cwd: projectPath }
      );
      console.log(chalk.green("✅ Git repository initialized\n"));
    } catch (error) {
      console.log(chalk.red("❌ Failed to initialize git"));
      console.log(
        chalk.yellow(`\nYou can initialize git manually later with:`)
      );
      console.log(chalk.cyan(`  cd ${projectName}`));
      console.log(chalk.cyan(`  git init`));
      console.log(chalk.cyan(`  git add .`));
      console.log(chalk.cyan(`  git commit -m "Initial commit"\n`));
    }
  }
}

module.exports = { createApp };

