/* eslint-disable @typescript-eslint/no-var-requires */
const dotenv = require('dotenv');
const fs = require('fs');
const packageJson = require('../package.json');

dotenv.config();

// Load existing environment variables
let envConfig = dotenv.parse(fs.readFileSync('.env.local'));

// Update version number
envConfig['NEXT_PUBLIC_APP_VERSION'] = packageJson.version;

// Convert back to string format
let envConfigStr = '';
for (let key in envConfig) {
  envConfigStr += `${key}=${envConfig[key]}\n`;
}

// Write back to file
fs.writeFileSync('.env.local', envConfigStr);