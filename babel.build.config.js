module.exports = {
  extends: './babel.config.js',
  sourceMaps: true,
  ignore: [
    '**/__integration_tests__/**',
    '**/__tests__/**',
    /\.stories\./
  ]
};
