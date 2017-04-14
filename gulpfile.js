const gulp = require('gulp');

const less = require('gulp-less');

gulp.task('default', ['less'], () => {
  gulp.watch('src/less/*.less', ['less']);
});

gulp.task('less', () => {
  return gulp.src('src/less/main.less')
    .pipe(less())
    .pipe(gulp.dest('./dist'));
});
