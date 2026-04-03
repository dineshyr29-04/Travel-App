import { join } from 'path';

export const jestConfig = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  roots: [join(__dirname, 'src')],
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/$1',
  },
};

export default jestConfig;
