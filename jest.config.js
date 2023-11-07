
const fs = require("fs");

const swcConfig = JSON.parse(fs.readFileSync(`${__dirname}/.swcrc`, "utf-8"));

// Jest configuration
// https://jestjs.io/docs/en/configuration
/** @type {import('jest').Config} */
const config = {
  clearMocks: true,

  // Test all files either suffixed with "-test.js", "-test.jsx", "-test.ts", "-test.tsx", or
  // having ".test.js", ".test.jsx", ".test.ts", ".test.tsx" extensions
  testRegex: ".*[-.]test\\.(js|ts)x?$",

  setupFiles: [
    // Configure environment variables for the test environment
    "<rootDir>/jest.setup.js",
  ],

  transform: {
    "^.+\\.(t|j)sx?$": ["@swc/jest", { ...swcConfig }],
  },
  // File extensions to be tested
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};

module.exports = config;

