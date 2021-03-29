module.exports = {
  preset: "ts-jest",
  modulePathIgnorePatterns: ["node_modules", "lib"],
  testEnvironment: "node",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testPathIgnorePatterns: ["<rootDir>/node_modules", "<rootDir>/lib"],
  testTimeout: 10000,
};
