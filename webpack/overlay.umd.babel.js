import * as path from 'path';
import umdConfig from './webpack.umd.babel';

module.exports = {
  ...umdConfig,
  entry: {
    'react-bootstrap-table2-overlay/dist/react-bootstrap-table2-overlay': './packages/react-bootstrap-table2-overlay/index.js',
    'react-bootstrap-table2-overlay/dist/react-bootstrap-table2-overlay.min': './packages/react-bootstrap-table2-overlay/index.js'
  },
  output: {
    path: path.join(__dirname, '../packages'),
    filename: '[name].js',
    library: 'ReactBootstrapTable2Overlay',
    libraryTarget: 'umd'
  }
};
