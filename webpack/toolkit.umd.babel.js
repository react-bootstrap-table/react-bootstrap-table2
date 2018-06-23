import * as path from 'path';
import umdConfig from './webpack.umd.babel';

module.exports = {
  ...umdConfig,
  entry: {
    'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit': './packages/react-bootstrap-table2-toolkit/index.js',
    'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min': './packages/react-bootstrap-table2-toolkit/index.js'
  },
  output: {
    path: path.join(__dirname, '../packages'),
    filename: '[name].js',
    library: 'ReactBootstrapTable2Toolkit',
    libraryTarget: 'umd'
  }
};
