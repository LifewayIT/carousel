module.exports = {
  ...require('../jest.common'),
  displayName: 'CLIENT',
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: [
    'jest-extended',
    '<rootDir>/test/client/setupAfterEnv.js',
  ],
  testMatch: [
    '**/__integration_tests__/**/*.spec.js',
    '**/__tests__/**/*.spec.js',
  ],
  moduleNameMapper: {
    '\\.(css)$': '<rootDir>/test/client/mocks/style.js',
    '\\.(png|jpg|jpeg|gif|ttf|eot|svg|ico|webmanifest|xml)$':
      '<rootDir>/test/client/mocks/file.js',
  },
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: './reports/client/tests',
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
  coverageDirectory: './reports/client/coverage',
};
