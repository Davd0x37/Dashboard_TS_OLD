module.exports = {
  clearMocks: true,
  coverageDirectory: "build/coverage",
  collectCoverage: false,
  preset: "ts-jest",
  testEnvironment: "node",
  verbose: false,
  testMatch: ["**/__tests__/**/*.ts?(x)", "**/?(*.)+(spec|test).ts?(x)"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/app/$1"
  }
};
