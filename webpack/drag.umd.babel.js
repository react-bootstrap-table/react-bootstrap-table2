import * as path from 'path';
import umdConfig from './webpack.umd.babel';

module.exports = {
  ...umdConfig,
  entry: {
    'react-bootstrap-table2-drag/dist/react-bootstrap-table2-drag': './packages/react-bootstrap-table2-drag/index.js',
    'react-bootstrap-table2-drag/dist/react-bootstrap-table2-drag.min': './packages/react-bootstrap-table2-drag/index.js'
  },
  output: {
    path: path.join(__dirname, '../packages'),
    filename: '[name].js',
    library: 'ReactBootstrapTable2Drag',
    libraryTarget: 'umd'
  }
};
