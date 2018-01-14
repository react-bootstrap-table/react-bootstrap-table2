/* eslint no-console: 0 */
import rimraf from 'rimraf';
import * as path from 'path';

import webpack from 'webpack';

import config from './webpack.prod.config.babel';

const build = () => {
  [
    path.join(__dirname, 'packages/react-bootstrap-table2/dist'),
    path.join(__dirname, 'packages/react-bootstrap-table2-editor/dist'),
    path.join(__dirname, 'packages/react-bootstrap-table2-filter/dist'),
    path.join(__dirname, 'packages/react-bootstrap-table2-overlay/dist'),
    path.join(__dirname, 'packages/react-bootstrap-table2-paginator/dist')
  ].forEach((dir) => {
    rimraf.sync(dir);
  });
  webpack(config).run((err) => {
    if (err) {
      console.error('Failed to compile.', [err]);
      process.exit(1);
    } else {
      console.info('Compiled successfully');
    }
  });
};

build();
