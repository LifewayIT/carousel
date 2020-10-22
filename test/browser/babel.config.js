module.exports = {
  // extends
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        corejs: '3.6',
      },
    ],
    '@babel/preset-typescript',
    '@babel/preset-react',
  ],
  plugins: [
    '@babel/plugin-transform-runtime',
    'babel-plugin-styled-components',
    // 'babel-plugin-istanbul',
    // [
    //   '@babel/plugin-transform-modules-commonjs',
    //   {
    //     loose: true,
    //   },
    // ],
  ],
  retainLines: true
};
