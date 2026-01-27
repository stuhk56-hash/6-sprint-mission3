module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: './jest-framework',
  testMatch: [
    '**/__tests__/**/*.test.ts',
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
  coverageDirectory: '../coverage',
  coverageReporters: ['text', 'lcov'],
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy',
    '^(.*)\\.js$': '$1',
  },
};
