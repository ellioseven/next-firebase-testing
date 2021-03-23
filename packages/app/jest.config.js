module.exports = {
  preset: "ts-jest",
  transform: {
    "^.+\\.tsx?$": "babel-jest",
  },
  moduleNameMapper: {
    "@styles(.*)$": "<rootDir>/styles/$1",
    "@pages(.*)$": "<rootDir>/pages/$1",
    "@components(.*)$": "<rootDir>/components/$1",
    "@services(.*)$": "<rootDir>/services/$1",
  },
  testPathIgnorePatterns: ["<rootDir>/node_modules"],
  modulePathIgnorePatterns: [".cache", ".next", "public", "static", "out"],
};
