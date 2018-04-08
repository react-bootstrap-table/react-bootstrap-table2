import gulp from 'gulp';
import babel from 'gulp-babel';
import sass from 'gulp-sass';
import cleanCSS from 'gulp-clean-css';
import cleanDir from 'gulp-clean';
import rename from 'gulp-rename';
import shell from 'gulp-shell';

const LIB = 'lib';
const DIST = 'dist';
const TEST = 'test';
const PKG_PATH = './packages';
const NODE_MODULES = 'node_modules';

const JS_PKGS = [
  'react-bootstrap-table2',
  'react-bootstrap-table2-editor',
  'react-bootstrap-table2-filter',
  'react-bootstrap-table2-overlay',
  'react-bootstrap-table2-paginator'
].reduce((pkg, curr) => `${curr}|${pkg}`, '');

const JS_SKIPS = `+(${TEST}|${LIB}|${DIST}|${NODE_MODULES})`;

const STYLE_PKGS = [
  'react-bootstrap-table2',
  'react-bootstrap-table2-filter',
  'react-bootstrap-table2-paginator'
].reduce((pkg, curr) => `${curr}|${pkg}`, '');

const STYLE_SKIPS = `+(${NODE_MODULES})`;


function clean() {
  return gulp
    .src(`./packages/+(${JS_PKGS})/+(${LIB}|${DIST})`, { allowEmpty: true })
    .pipe(cleanDir());
}

function scripts() {
  return gulp
    .src([
      `./packages/+(${JS_PKGS})/**/*.js`,
      `!packages/+(${JS_PKGS})/${JS_SKIPS}/**/*.js`
    ])
    .pipe(babel())
    .pipe(rename((path) => {
      if (path.dirname.indexOf('src') > -1) {
        path.dirname = path.dirname.replace('src', `${LIB}/src`);
      } else {
        path.dirname += `/${LIB}`;
      }
    }))
    .pipe(gulp.dest(PKG_PATH));
}

function styles() {
  return gulp
    .src([
      `./packages/+(${STYLE_PKGS})/style/**/*.scss`,
      `!packages/+(${STYLE_PKGS})/${STYLE_SKIPS}/**/*.scss`
    ])
    .pipe(sass().on('error', sass.logError))
    .pipe(rename((path) => {
      path.dirname = path.dirname.replace('style', DIST);
    }))
    .pipe(gulp.dest(PKG_PATH))
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(rename((path) => {
      path.extname = '.min.css';
    }))
    .pipe(gulp.dest(PKG_PATH));
}

function umd(done) {
  gulp.parallel(
    () => gulp.src('./webpack/next.umd.babel.js').pipe(shell(['webpack --config <%= file.path %>'])),
    () => gulp.src('./webpack/editor.umd.babel.js').pipe(shell(['webpack --config <%= file.path %>'])),
    () => gulp.src('./webpack/filter.umd.babel.js').pipe(shell(['webpack --config <%= file.path %>'])),
    () => gulp.src('./webpack/overlay.umd.babel.js').pipe(shell(['webpack --config <%= file.path %>'])),
    () => gulp.src('./webpack/paginator.umd.babel.js').pipe(shell(['webpack --config <%= file.path %>']))
  )();
  done();
}

const buildJS = gulp.parallel(umd, scripts);
const buildCSS = styles;
const build = gulp.series(clean, gulp.parallel(buildJS, buildCSS));

gulp.task('prod', build);
gulp.task('default', build);
