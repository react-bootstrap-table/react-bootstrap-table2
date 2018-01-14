import * as path from 'path';
import webpack from 'webpack';

const sourceStylePath = path.join(__dirname, 'packages/react-bootstrap-table2/style');
const paginationSourceStylePath = path.join(__dirname, 'packages/react-bootstrap-table2-paginator/style');

module.exports = {
  entry: {
    'react-bootstrap-table2/dist/react-bootstrap-table2': ['./packages/react-bootstrap-table2'],
    'react-bootstrap-table2/dist/react-bootstrap-table2.min': ['./packages/react-bootstrap-table2'],
    'react-bootstrap-table2-editor/dist/react-bootstrap-table2-editor': ['./packages/react-bootstrap-table2-editor'],
    'react-bootstrap-table2-editor/dist/react-bootstrap-table2-editor.min': ['./packages/react-bootstrap-table2-editor'],
    'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter': ['./packages/react-bootstrap-table2-filter'],
    'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min': ['./packages/react-bootstrap-table2-filter'],
    'react-bootstrap-table2-overlay/dist/react-bootstrap-table2-overlay': ['./packages/react-bootstrap-table2-overlay'],
    'react-bootstrap-table2-overlay/dist/react-bootstrap-table2-overlay.min': ['./packages/react-bootstrap-table2-overlay'],
    'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator': ['./packages/react-bootstrap-table2-paginator'],
    'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min': ['./packages/react-bootstrap-table2-paginator']
  },
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, 'packages'),
    filename: '[name].js',
    library: 'ReactBootstrapTable',
    libraryTarget: 'umd'
  },
  externals: [{
    'react': {
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
      enforce: 'pre',
      test: /\.js?$/,
      exclude: /node_modules/,
      // include: [sourcePath],
      loader: 'eslint-loader'
    }, {
      test: /\.js?$/,
      use: ['babel-loader'],
      exclude: /node_modules/
      // include: [sourcePath]
    }, {
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
      include: [sourceStylePath, paginationSourceStylePath]
    }]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.SourceMapDevToolPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/,
      compress: { warnings: false }
    })
  ]
};
