module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        corejs: '3.6',
      },
    ],
    [
      '@babel/preset-react',
      {
        runtime: 'automatic'
      },
    ]
  ],
  plugins: [
    '@babel/plugin-transform-runtime',
    'babel-plugin-styled-components',
  ],
  retainLines: true
};
