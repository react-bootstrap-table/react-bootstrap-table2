import * as path from 'path';
import umdConfig from './webpack.umd.babel';

module.exports = {
  ...umdConfig,
  entry: {
    'react-bootstrap-table2-editor/dist/react-bootstrap-table2-editor': './packages/react-bootstrap-table2-editor/index.js',
    'react-bootstrap-table2-editor/dist/react-bootstrap-table2-editor.min': './packages/react-bootstrap-table2-editor/index.js'
  },
  output: {
    path: path.join(__dirname, '../packages'),
    filename: '[name].js',
    library: 'ReactBootstrapTable2Editor',
    libraryTarget: 'umd'
  }
};
