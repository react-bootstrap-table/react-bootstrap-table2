import * as path from 'path';
import umdConfig from './webpack.umd.babel';

module.exports = {
  ...umdConfig,
  entry: {
    'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter': './packages/react-bootstrap-table2-filter/index.js',
    'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min': './packages/react-bootstrap-table2-filter/index.js'
  },
  output: {
    path: path.join(__dirname, '../packages'),
    filename: '[name].js',
    library: 'ReactBootstrapTable2Filter',
    libraryTarget: 'umd'
  }
};
