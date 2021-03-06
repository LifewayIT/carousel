const path = require('path');
const { jsWithBabel: tsjestPreset } = require('ts-jest/presets');

module.exports = {
  rootDir: path.join(__dirname, '../..'),
  moduleDirectories: [
    'node_modules',
    path.join(__dirname, 'src'),
    __dirname,
  ],
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: [
    'jest-extended',
    '<rootDir>/test/client/setupAfterEnv.js',
  ],
  testMatch: [
    '**/__integration_tests__/**/*.spec.[jt]s?(x)',
    '**/__tests__/**/*.spec.[jt]s?(x)',
    '!**/*.browser.spec.[jt]s?(x)',
  ],
  moduleNameMapper: {
    '\\.(css)$': '<rootDir>/test/client/mocks/style.js',
    '\\.(png|jpg|jpeg|gif|ttf|eot|svg|ico|webmanifest|xml)$':
      '<rootDir>/test/client/mocks/file.js',
    '^&test/(.*)': '<rootDir>/test/$1'
  },
  transform: tsjestPreset.transform,
  snapshotSerializers: [
    '<rootDir>/test/client/snapshot-serializers/styled-classes.js',
    '<rootDir>/test/client/snapshot-serializers/children-element.js',
  ],
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: './reports/tests',
        outputName: 'junit.xml',
        ancestorSeparator: ' › ',
        addFileAttribute: true,
        suiteNameTemplate: '{title}',
        classNameTemplate: '{classname}:',
        titleTemplate: '{title}',
      },
    ],
  ],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.[jt]s?(x)',
    '!*.spec.[jt]s?(x)',
    '!<rootDir>/src/index.ts',
    '!*.stories.[jt]s?(x)',
    '!<rootDir>/src/@types/**/*'
  ],
  coverageDirectory: './reports/coverage',
};
