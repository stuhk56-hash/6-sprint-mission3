const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig');

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: '.',
  moduleDirectories: ['node_modules', 'src'],
  testMatch: [
    '<rootDir>/tests/**/*.test.ts',
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.test.ts',
    '!src/app.ts',
    '!src/main.ts',
    '!src/websocket.ts',
    '!src/lib/errors/*.ts',
    '!src/types/*.ts',
    '!src/validators/*.ts',
  ],
  coverageDirectory: './coverage',
  coverageReporters: ['text', 'lcov'],
  transform: {
    '^.+\\.ts$': ['ts-jest', { tsconfig: { module: 'NodeNext' } }],
  },
  moduleNameMapper: {
    ...pathsToModuleNameMapper(compilerOptions.paths || {}, { prefix: '<rootDir>/' }),
    '\\.(css|less)$': 'identity-obj-proxy',
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
};
