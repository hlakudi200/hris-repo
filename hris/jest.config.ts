const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    "^redux-actions$": "<rootDir>/__mocks__/redux-actions.js"
  },
  transformIgnorePatterns: [
    '/node_modules/(?!redux-actions)/'
  ]
}

module.exports = createJestConfig(customJestConfig)