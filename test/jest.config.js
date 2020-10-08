const path = require('path');

module.exports = {
  rootDir: path.join(__dirname, '..'),
  moduleDirectories: [
    'node_modules',
    path.join(__dirname, 'src'),
    __dirname,
  ],
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: [
    'jest-extended',
    '<rootDir>/test/setupAfterEnv.js',
  ],
  testMatch: [
    '**/__integration_tests__/**/*.spec.js',
    '**/__tests__/**/*.spec.js',
  ],
  moduleNameMapper: {
    '\\.(css)$': '<rootDir>/test/mocks/style.js',
    '\\.(png|jpg|jpeg|gif|ttf|eot|svg|ico|webmanifest|xml)$':
      '<rootDir>/test/mocks/file.js',
  },
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
  coveragePathIgnorePatterns: ['<rootDir>/test/'],
  collectCoverageFrom: ['<rootDir>/src/**/*.js'],
  coverageDirectory: './reports/coverage',
};
