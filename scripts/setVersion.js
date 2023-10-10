/* eslint-disable @typescript-eslint/no-var-requires */
const dotenv = require("dotenv");
const fs = require("fs");
const packageJson = require("../package.json");

dotenv.config();

let envConfig;

// Check if the environment variable exists
if (process.env.NEXT_PUBLIC_APP_VERSION) {
  // If it does, use it directly
  envConfig = process.env;
} else {
  // If it doesn't, read the variables from the .env.local file
  envConfig = dotenv.parse(fs.readFileSync(".env.local"));
}

// Update version number
envConfig["NEXT_PUBLIC_APP_VERSION"] = packageJson.version;

// Convert back to string format
let envConfigStr = "";
for (let key in envConfig) {
  if (key === "NEXT_PUBLIC_APP_VERSION") {
    envConfigStr += `${key}=${envConfig[key]}\n`;
  }
}

// Write back to file only if it's not in the GitHub Actions environment
if (!process.env.NEXT_PUBLIC_APP_VERSION) {
  fs.writeFileSync(".env.local", envConfigStr);
}
