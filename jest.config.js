const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.json');

module.exports = {
  verbose: true,

  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  collectCoverage: false,
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coverageDirectory: 'coverage',

  // A list of reporter names that Jest uses when writing coverage reports
  coverageReporters: ['text-summary', 'lcov'],

  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/src/',
  }),

  preset: 'ts-jest',

  testEnvironment: 'node',
  testMatch: ['<rootDir>/tests/**/*spec.ts'],
  setupFiles: ['<rootDir>/.env.test.js'],

  transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest'],
  },
};
