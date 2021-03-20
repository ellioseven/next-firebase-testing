module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testPathIgnorePatterns: ["<rootDir>/node_modules"],
  modulePathIgnorePatterns: [".cache", ".next", "public", "static", "out"],
};
