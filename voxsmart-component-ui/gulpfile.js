'use strict';

// Configuration.

var config = {};

// SCSS
config.sass = {
  srcFiles: [
    './scss/*.scss',
    './components/**/*.scss'
  ],
  options: {
    outputStyle: 'compressed'
  },
  destDir: './public/css/'
};

// Javascript
config.scripts = {
  srcFiles: [
    './scripts/*.js'
  ],
  destDir: './public/js/'
};

// Load Gulp and other tools.
var fs = require('fs');
var gulp = require('gulp');
var run = require('gulp-run');
var sass = require('gulp-sass')(require('sass'));
var sassGlob = require('gulp-sass-glob');
var sassLint = require('gulp-sass-lint');
var sourcemaps = require('gulp-sourcemaps');
var runSequence = require('gulp4-run-sequence');
var autoprefixer = require('gulp-autoprefixer');
var minify = require('gulp-minify');
var concat = require('gulp-concat');


// Gulp tasks.

/**
 * Sets up and watchers.
 */
gulp.task('watch', function () {
  gulp.watch(config.sass.srcFiles, gulp.series('sass'));
  gulp.watch(config.scripts.srcFiles, gulp.series('scripts'));
});

/**
 * Task sequence generate theme and output files.
 */
gulp.task('build-theme', function () {
  runSequence('sass', 'scripts');
});

/**
 * Processes sass files.
 */
gulp.task('sass', function () {
  return gulp.src('scss/**/*.scss')
    .pipe(sassGlob())
    .pipe(sourcemaps.init())
    .pipe(sass(config.sass.options).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(config.sass.destDir));
});

/**
 * Processes scripts files.
 */
gulp.task('scripts', function () {
  return gulp.src(config.scripts.srcFiles)
    .pipe(sourcemaps.write('./'))
    .pipe(concat('main.js'))
    .pipe(minify())
    .pipe(gulp.dest(config.scripts.destDir));
});

/**
 * Lint sass files.
 */
gulp.task('lint:sass', function () {
  return gulp.src(config.sass.srcFiles)
    .pipe(sassLint())
    .pipe(sassLint.format());
});

/**
 * Gulp default task.
 */
gulp.task('default', function () {
  runSequence('watch');
});

gulp.task('production', function () {
  runSequence('sass', 'scripts');
});
