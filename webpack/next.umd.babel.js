import * as path from 'path';
import umdConfig from './webpack.umd.babel';

module.exports = {
  ...umdConfig,
  entry: {
    'react-bootstrap-table2/dist/react-bootstrap-table-next': './packages/react-bootstrap-table2/index.js',
    'react-bootstrap-table2/dist/react-bootstrap-table-next.min': './packages/react-bootstrap-table2/index.js'
  },
  output: {
    path: path.join(__dirname, '../packages'),
    filename: '[name].js',
    library: 'ReactBootstrapTable2',
    libraryTarget: 'umd'
  }
};
