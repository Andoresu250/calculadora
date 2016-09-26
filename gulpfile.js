var gulp = require('gulp'); 
var del = require('del'); 
var sass = require('gulp-sass');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('clean',function(){
    return del(['dist/**/*']);
});

gulp.task('build',['sass','images','fonts','scripts'],function(){
});

gulp.task('sass', function () {
  return gulp.src('src/sass/**/*.scss') 
  .pipe(sass({
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

gulp.task('scripts', function(){
  return gulp.src('src/scripts/**/*.js')
    .pipe(concat('main.js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('dist/scripts/'))
});

 gulp.task('default',['watch']);
 
 gulp.task('watch', function () { 
  gulp.watch('src/sass/**/*.scss', ['build']);
});