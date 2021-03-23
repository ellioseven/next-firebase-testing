const config = require("./jest.config");
module.exports = {
  ...config,
  testEnvironment: "node",
  setupFilesAfterEnv: ["<rootDir>/jest.node.setup.ts"],
  testPathIgnorePatterns: ["<rootDir>/node_modules", "<rootDir>/components"],
};
