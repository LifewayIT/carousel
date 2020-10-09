// known issue: import/extensions rule incorrectly warns on importing ts files without an extension (see https://github.com/benmosher/eslint-plugin-import/issues/1857))

module.exports = {
  extends: [
    'corinth/browser',
    'plugin:import/typescript'
  ],
  ignorePatterns: [
    'lib/**',
    'node_modules/**'
  ],
  rules: {
    'import/extensions': ['error', 'ignorePackages',
      { js: 'never', jsx: 'never', ts: 'never', tsx: 'never' },
    ]
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: ['corinth/typescript']
    },
    {
      files: ['*.spec.js'],
      settings: {
        'import/resolver': {
          jest: {
            jestConfigFile: './jest.config.js'
          }
        }
      }
    },
    {
      files: ['*', '!./src/**/*'],
      extends: ['corinth/node']
    }
  ]
};
