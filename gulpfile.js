const gulp = require('gulp');
const sass = require('gulp-sass');
const del = require('del');
const browsersync = require('browser-sync');

// Clean css folder
function clean() {
  return del(['dist/css/**', '!dist/css'], { force: true });
}

// BrowserSync
function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: "./dist/"
    },
    port: 3000
  });
  done();
}

// BrowserSync Reload
function browserSyncReload(done) {
  browsersync.reload();
  done();
}

// Compile SASS
function sassCompile(done) {
  gulp.src("src/sass/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("dist/css"))
    .pipe(browsersync.stream());
  done();
}

function watch(done) {
  gulp.watch('src/sass/*.scss', gulp.series(clean ,sassCompile));
  gulp.watch('dist/index.html', browserSyncReload);
  done();
}

const build = gulp.series(clean, sassCompile, watch, browserSync);

exports.css = sassCompile;
exports.default = build;
