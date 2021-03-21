module.exports = {
  preset: "ts-jest",
  transform: {
    "^.+\\.tsx?$": "babel-jest",
  },
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "@styles(.*)$": "<rootDir>/styles/$1",
    "@pages(.*)$": "<rootDir>/pages/$1",
    "@components(.*)$": "<rootDir>/components/$1",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testPathIgnorePatterns: ["<rootDir>/node_modules"],
  modulePathIgnorePatterns: [".cache", ".next", "public", "static", "out"],
};
