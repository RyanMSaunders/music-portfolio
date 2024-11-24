// Config for Gulp, compiling and minifying files

// Initialize modules
const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const babel = require('gulp-babel');
const terser = require('gulp-terser');
const browsersync = require('browser-sync').create();
const concat = require('gulp-concat');

// Use dart-sass for @use
sass.compiler = require('dart-sass');


// // Sass Task
// function scssTask() {
//   return src('source/stylesheets/scss/index.scss', { sourcemaps: true })
//     .pipe(sass())
//     .pipe(postcss([autoprefixer(), cssnano()]))
//     .pipe(dest('build/stylesheets/css', { sourcemaps: '.' }))
    
// }


// Sass Task
async function scssTask(done) {
  console.log('Starting SCSS Task');
  return src('source/stylesheets/scss/index.scss', { sourcemaps: true })
    .pipe(sass()).on('error', sass.logError)
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(dest('build/stylesheets/css', { sourcemaps: '.' }))
    .on('end', () => {
      console.log('SCSS Task Completed');
      done(); // Signal async completion
    });
}

// JavaScript Task
function jsTask() {
  return src('source/**/*.js', { sourcemaps: true })
    .pipe(babel({ presets: ['@babel/preset-env'] })) // compiles ES6 to version older browser can support
    .pipe(concat('script.js')) // Combine into script.js
    .pipe(terser()) // minify js
    .pipe(dest('build/javascripts', { sourcemaps: '.' })); // destination of compiled folder
}

// Browsersync
function browserSyncServe(cb) {
  browsersync.init({
    server: {
      baseDir: 'build',
    },
    notify: {
      styles: {
        top: 'auto',
        bottom: '0',
      },
    },
  });
  cb();
}
function browserSyncReload(cb) {
  browsersync.reload();
  cb();
}

// Watch Task
function watchTask() {
  watch('*.html', browserSyncReload);
  watch(
    ['source/stylesheets/scss/**/*.scss', 'source/javascripts/**/*.js'],
    series(scssTask, jsTask, browserSyncReload)
  );
}

// Default Gulp Task
exports.default = series(scssTask, jsTask, browserSyncServe, watchTask);

// Build Gulp Task
exports.build = series(scssTask, jsTask);