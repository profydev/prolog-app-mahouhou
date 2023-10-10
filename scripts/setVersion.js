/* eslint-disable @typescript-eslint/no-var-requires */
const dotenv = require("dotenv");
const fs = require("fs");
const packageJson = require("../package.json");

let envConfig;

// Check if .env.local file exists
if (fs.existsSync(".env.local")) {
  // If it does, read the variables from the .env.local file
  dotenv.config();
  envConfig = dotenv.parse(fs.readFileSync(".env.local"));
} else {
  // If it doesn't, use process.env directly
  envConfig = process.env;
}

// Update version number
envConfig["NEXT_PUBLIC_APP_VERSION"] = packageJson.version;

// Convert back to string format and write back to file only if .env.local file exists
if (fs.existsSync(".env.local")) {
  let envConfigStr = "";
  for (let key in envConfig) {
    if (key === "NEXT_PUBLIC_APP_VERSION") {
      envConfigStr += `${key}=${envConfig[key]}\n`;
    }
  }
  fs.writeFileSync(".env.local", envConfigStr);
}
