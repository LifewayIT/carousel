module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        corejs: '3.6',
      },
    ],
    '@babel/preset-react',
  ],
  plugins: [
    '@babel/plugin-transform-runtime',
    'babel-plugin-styled-components',
  ],
  retainLines: true,
  ignore: [
    '**/__integration_tests__/**',
    '**/__tests__/**',
    /\.stories\./
  ]
};
