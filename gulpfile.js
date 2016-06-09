var gulp = require('gulp');
var scss = require('gulp-scss');
var watch = require('gulp-watch');

gulp.task('scss', function() {
  gulp.src('styles/*.scss')
    .pipe(scss())
    .pipe(gulp.dest('styles/'));
});

gulp.task('default', ['scss'], function () {
    gulp.watch('styles/*.scss', ['scss']);
});
