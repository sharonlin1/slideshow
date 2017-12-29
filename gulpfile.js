var gulp = require('gulp'),
  less = require('gulp-less');

gulp.task('less', function () {
  gulp.src('./style/less/*.less')
    .pipe(less())
    .pipe(gulp.dest('./style/css/'))
});

gulp.task('watch', function () {
  gulp.watch('./style/less/*.less', ['less']);
});

gulp.task('default', ['less', 'watch']);