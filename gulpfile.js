'use strict';

const gulp = require('gulp'),
    sass = require('gulp-sass'),
    maps = require('gulp-sourcemaps'),
    imagemin = require('gulp-imagemin');

gulp.task('compileSass', function(done) {
  gulp.src('scss/main.scss')
    .pipe(maps.init())
    .pipe(sass())
    .pipe(maps.write('./'))
    .pipe(gulp.dest('css'));
  done();
});

gulp.task('minifyImages', function(done) {
  gulp.src('img/*')
    .pipe(imagemin(
      [
        imagemin.jpegtran({progressive: true}),
        imagemin.optipng({optimizationLevel: 5}),
      ]
    ))
    .pipe(gulp.dest('dist/images'));
  done();
});

gulp.task('watchSass', function(done) {
  gulp.watch('scss/**/*.scss', gulp.series('compileSass'));
  done();
});

gulp.task('default', gulp.parallel('minifyImages', 'compileSass'));
