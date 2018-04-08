import * as path from 'path';
import umdConfig from './webpack.umd.babel';

module.exports = {
  ...umdConfig,
  entry: {
    'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator': './packages/react-bootstrap-table2-paginator/index.js',
    'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min': './packages/react-bootstrap-table2-paginator/index.js'
  },
  output: {
    path: path.join(__dirname, '../packages'),
    filename: '[name].js',
    library: 'ReactBootstrapTable2Paginator',
    libraryTarget: 'umd'
  }
};
