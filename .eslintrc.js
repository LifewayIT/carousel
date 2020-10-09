module.exports = {
  extends: [
    'corinth/browser',
  ],
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
