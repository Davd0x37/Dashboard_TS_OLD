module.exports = {
  clearMocks: true,

  coverageDirectory: "coverage",

  preset: "ts-jest",

  testEnvironment: "node",

  testMatch: ["**/__tests__/**/*.ts?(x)", "**/?(*.)+(spec|test).ts?(x)"]
};
