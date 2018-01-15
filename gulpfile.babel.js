import gulp from 'gulp';
import babel from 'gulp-babel';
import rimraf from 'rimraf';
import * as path from 'path';


gulp.task('default', ['prod']);

gulp.task('clean', () => {
  [
    path.join(__dirname, 'packages/react-bootstrap-table2/lib'),
    path.join(__dirname, 'packages/react-bootstrap-table2-editor/lib'),
    path.join(__dirname, 'packages/react-bootstrap-table2-filter/lib'),
    path.join(__dirname, 'packages/react-bootstrap-table2-overlay/lib'),
    path.join(__dirname, 'packages/react-bootstrap-table2-paginator/lib')
  ].forEach((dir) => {
    rimraf.sync(dir);
  });
});

gulp.task('prod', ['clean'], () => {
  [
    'react-bootstrap-table2',
    'react-bootstrap-table2-editor',
    'react-bootstrap-table2-filter',
    'react-bootstrap-table2-overlay',
    'react-bootstrap-table2-paginator'
  ].forEach((pkg) => {
    gulp.src([
      `./packages/${pkg}/**/*.js`,
      `!packages/${pkg}/+(test|dist|node_modules)/**/*.js`
    ])
      .pipe(babel())
      .pipe(gulp.dest(`./packages/${pkg}/lib`));
  });
});
