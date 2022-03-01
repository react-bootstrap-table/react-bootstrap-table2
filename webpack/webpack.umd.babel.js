const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  externals: [{
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react'
    }
  }, {
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom'
    }
  }],
  module: {
    rules: [{
      test: /\.js?$/,
      use: ['babel-loader'],
      exclude: /node_modules/
    }]
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()]
  },
  plugins: [
    new webpack.SourceMapDevToolPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new ESLintPlugin({
      // Plugin options
      extensions: ['js', 'jsx'],
      eslintPath: require.resolve('eslint'),
      exclude: ['/node_modules/'],
      // ESLint class options
      resolvePluginsRelativeTo: __dirname
    })
  ]
};
