var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var util = require('gulp-util');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');

var browserSync = require('browser-sync');

var gulp = require('gulp');
var jade = require('gulp-jade');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');

var mainBowerFiles = require('main-bower-files');

var paths = {
  scripts: ['src/scripts/**/*.js'],
  haml: ['src/jade/**/*.jade'],
  sass: ['src/scss/**/*.scss'],
  images: 'src/images/**/*',
  tmp: {
    scripts: "tmp/scripts"
  }
};

var config = {
    server: {
      baseDir: "./public"
    },
    watchOptions: {debounceDelay: 1000},
    tunnel: false,
    host: 'localhost',

    port: 9999,
    logPrefix: "BrowserSync:"
};

gulp.task('jade', function () {
  return gulp.src(paths.haml)
    .pipe(jade())
    .pipe(gulp.dest('public/'));
});

gulp.task('sass', function () {
  return gulp.src(paths.sass)
    .pipe(sass())
    .pipe(gulp.dest('public/'));
});

gulp.task('build:bower', function() {
  return gulp.src(mainBowerFiles())
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('public/'))
});

gulp.task('scripts', function(){
  return browserify('./src/scripts/index.js', { debug: true })
    .transform("babelify", {presets: ["es2015"]}).bundle()
    .on('error', util.log.bind(util, 'Browserify Error'))
    .pipe(source('index.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(uglify({ mangle: false }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./public'));
});

gulp.task('scripts:reload', ['scripts'], browserSync.reload);
gulp.task('jade:reload',    ['jade'],    browserSync.reload);
gulp.task('sass:reload',    ['sass'],    browserSync.reload);

gulp.task('watch', function() {
    gulp.watch(paths.scripts, ['scripts:reload']);
    gulp.watch(paths.haml,    ['jade:reload']);
    gulp.watch(paths.sass,    ['sass:reload']);
});

gulp.task('build', ['scripts', 'jade', 'sass', 'build:bower', 'watch']);

gulp.task('default', ['build'], function() {
    browserSync(config);
});