import type { Config } from 'jest';

const config: Config = {
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
  moduleNameMapper: {
    '\\.svg': '<rootDir>/src/__mocks__/svg.ts',
    '^@root/(.*)$': '<rootDir>/src/$1',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@services/(.*)$': '<rootDir>/src/services/$1',
    '^@pages/(.*)$': '<rootDir>/src/pages/$1',
    '^@constants/(.*)$': '<rootDir>/src/constants/$1',
    '^@store/(.*)$': '<rootDir>/src/store/$1',
    '^@assets/(.*)$': '<rootDir>/src/assets/$1',
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '.+\\.(png|jpg|svg)$': 'jest-transform-stub',
  },
};

export default config;
