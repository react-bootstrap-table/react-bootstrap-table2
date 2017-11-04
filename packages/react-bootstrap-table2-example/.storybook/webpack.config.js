const path = require('path');

const sourcePath = path.join(__dirname, '../../react-bootstrap-table2/src');
const paginationSourcePath = path.join(__dirname, '../../react-bootstrap-table2-paginator/src');
const sourceStylePath = path.join(__dirname, '../../react-bootstrap-table2/style');
const paginationStylePath = path.join(__dirname, '../../react-bootstrap-table2-paginator/style');
const storyPath = path.join(__dirname, '../stories');
const examplesPath = path.join(__dirname, '../examples');
const srcPath = path.join(__dirname, '../src');
const aliasPath = {
  examples: examplesPath,
  stories: storyPath,
  src: srcPath,
  components: path.join(srcPath, 'components'),
  utils: path.join(srcPath, 'utils'),
};

const loaders = [{
  enforce: 'pre',
  test: /\.js?$/,
  exclude: /node_modules/,
  include: [examplesPath, storyPath],
  loader: 'eslint-loader',
}, {
  test: /\.js?$/,
  use: ['babel-loader'],
  exclude: /node_modules/,
  include: [sourcePath, paginationSourcePath, storyPath],
}, {
  test: /\.css$/,
  use: ['style-loader', 'css-loader'],
}, {
  test: /\.scss$/,
  use: ['style-loader', 'css-loader', 'sass-loader'],
  include: [storyPath, sourceStylePath, paginationStylePath],
}, {
  test: /\.(jpg|png|woff|woff2|eot|ttf|svg)$/,
  loader: 'url-loader?limit=100000',
}];

// Export a function. Accept the base config as the only param.
module.exports = (storybookBaseConfig, configType) => {
  // configType has a value of 'DEVELOPMENT' or 'PRODUCTION'
  // You can change the configuration based on that.
  // 'PRODUCTION' is used when building the static version of storybook.

  // loaders
  loaders.forEach(value => {
    storybookBaseConfig.module.rules.push(value);
  })

  // alias
  storybookBaseConfig.resolve.alias = aliasPath;

  // Return the altered config
  return storybookBaseConfig;
};
