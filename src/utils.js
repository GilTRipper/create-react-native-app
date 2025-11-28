const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');

function checkNodeVersion() {
  const nodeVersion = process.versions.node;
  const majorVersion = parseInt(nodeVersion.split('.')[0], 10);

  if (majorVersion < 20) {
    console.error(
      chalk.red('Error: Node.js version 20 or higher is required.'),
      chalk.yellow(`\nYou are currently running Node.js ${nodeVersion}`)
    );
    process.exit(1);
  }
}

async function replaceInFile(filePath, replacements) {
  try {
    let content = await fs.readFile(filePath, 'utf8');

    Object.keys(replacements).forEach(key => {
      const regex = new RegExp(key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
      content = content.replace(regex, replacements[key]);
    });

    await fs.writeFile(filePath, content, 'utf8');
  } catch (error) {
    // File might not exist, skip
    console.log(chalk.yellow(`Warning: Could not replace in ${filePath}`));
  }
}

async function replaceInFilesRecursively(dirPath, replacements, extensions = ['.js', '.ts', '.tsx', '.json', '.xml', '.gradle', '.kt', '.swift']) {
  const files = await fs.readdir(dirPath);

  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const stat = await fs.stat(filePath);

    if (stat.isDirectory()) {
      // Skip certain directories
      if (!['node_modules', '.git', 'build', 'Pods'].includes(file)) {
        await replaceInFilesRecursively(filePath, replacements, extensions);
      }
    } else if (stat.isFile()) {
      const ext = path.extname(file);
      if (extensions.includes(ext)) {
        await replaceInFile(filePath, replacements);
      }
    }
  }
}

module.exports = {
  checkNodeVersion,
  replaceInFile,
  replaceInFilesRecursively
};

