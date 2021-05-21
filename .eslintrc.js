// known issue: import/extensions rule incorrectly warns on importing ts/tsx files without an extension (see https://github.com/benmosher/eslint-plugin-import/issues/1857)

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
    'import/extensions': ['error', 'always',
      { js: 'never', jsx: 'never', ts: 'never', tsx: 'never' },
    ]
  },
  overrides: [
    {
      files: ['**/*.js'],
      excludedFiles: ['src/**/*.js'],
      extends: ['corinth/node'],
      rules: {
        'import/extensions': ['error', 'always',
          { js: 'never', jsx: 'never', ts: 'never', tsx: 'never' },
        ]
      },
    },
    {
      files: ['*.spec.js'],
      excludedFiles: ['*.browser.spec.js'],
      rules: {
        'react/prop-types': 'off'
      },
      settings: {
        'import/resolver': {
          jest: {
            jestConfigFile: './jest.config.js'
          }
        }
      }
    },
    {
      files: ['*.browser.spec.js'],
      plugins: ['cypress'],
      extends: ['plugin:cypress/recommended'],
      rules: {
        'jest/expect-expect': 'off',
        'react/prop-types': 'off',
        'testing-library/prefer-screen-queries': 'off'
      },
      settings: {
        'import/resolver': {
          webpack: {
            config: './test/browser/webpack.config.js'
          }
        }
      }
    },
    {
      files: ['*.ts', '*.tsx'],
      extends: ['corinth/typescript'],
      rules: {
        /* bug in ts-eslint; it doesn't take into account types. Also, ts itself handles this. */
        '@typescript-eslint/no-unused-vars': 'off',
        'import/extensions': ['error', 'ignorePackages',
          { js: 'never', jsx: 'never', ts: 'never', tsx: 'never' },
        ],
        'react/prop-types': 'off'
      }
    },
    {
      files: ['*.tsx'],
      rules: {
        '@typescript-eslint/no-use-before-define': ['error', { functions: false, variables: false }]
      }
    },
  ]
};
