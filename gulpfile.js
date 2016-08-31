var gulp = require('gulp'); 
var del = require('del'); 
var sass = require('gulp-sass');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');


gulp.task('clean',function(){
    return del(['dist/**/*']);
});

gulp.task('build',['sass','images','fonts'],function(){
});

gulp.task('sass', function () {
  return gulp.src('src/sass/**/*.scss') 
  .pipe(sass({
      outputStyle: 'compressed',
      includePaths: ['node_modules/bootstrap-sass/assets/stylesheets']
  }))
  .pipe(gulp.dest('dist/css'));
});

gulp.task('fonts', function () {
    return gulp
        .src('node_modules/bootstrap-sass/assets/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'));
});
 
 gulp.task('images', function(){
  gulp.src('src/images/**/*')
    .pipe(cache(imagemin({ 
        optimizationLevel: 3, 
        progressive: true, 
        interlaced: true    
    })))
    .pipe(gulp.dest('dist/images/'));
});

 gulp.task('default',['watch']);
 
 gulp.task('watch', function () { 
  gulp.watch('src/sass/**/*.scss', ['build']);
});