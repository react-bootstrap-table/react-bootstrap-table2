const path = require('path');

const sourcePath = path.join(__dirname, '../../react-bootstrap-table2/src');
const storyPath = path.join(__dirname, '../stories');
const examplesPath = path.join(__dirname, '../examples');
const aliasPath = {
  examples: examplesPath,
  stories: storyPath,
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
  include: [sourcePath, storyPath],
}, {
  test: /\.scss$/,
  use: ['style-loader', 'raw-loader', 'sass-loader'],
  include: [storyPath],
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
