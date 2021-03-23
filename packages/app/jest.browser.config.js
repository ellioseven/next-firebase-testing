const config = require("./jest.config");
module.exports = {
  ...config,
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.browser.setup.ts"],
  testPathIgnorePatterns: [
    "<rootDir>/node_modules",
    "<rootDir>/__tests__/pages/api",
  ],
};
