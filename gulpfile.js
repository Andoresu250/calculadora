var gulp = require('gulp'); 
var del = require('del'); 
var sass = require('gulp-sass');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');

gulp.task('clean',function(){
    return del(['dist/**/*']);
});

gulp.task('build',['sass','images','fonts','scripts'],function(){
});

gulp.task('sass', function () {
  return gulp.src('src/styles/**/*.scss') 
  .pipe(sass({
      includePaths: ['node_modules/bootstrap-sass/assets/stylesheets']
  }))
  .pipe(gulp.dest('dist/css'));
});

gulp.task('fonts', function () {
    return gulp.src('node_modules/bootstrap-sass/assets/fonts/**/*')
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

    gulp.task('scripts',['scripts-jquery','scripts-bootstrap'], function(){
      return gulp.src('src/scripts/**/*.js')
        .pipe(plumber({
          errorHandler: function (error) {
            console.log(error.message);
            this.emit('end');
        }}))
        .pipe(concat('main.js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('dist/scripts/'))
    });
    gulp.task('scripts-jquery', function(){
      return  gulp.src('node_modules/jquery/dist/jquery.min.js')
        .pipe(gulp.dest('dist/scripts/'))
    });
    gulp.task('scripts-bootstrap', function(){
      return  gulp.src('node_modules/bootstrap-sass/assets/javascripts/bootstrap.min.js')
        .pipe(gulp.dest('dist/scripts/'))
    });

 gulp.task('default',['watch']);
 
 gulp.task('watch', function () { 
  gulp.watch("src/styles/**/*.scss", ['sass']);
  gulp.watch("src/scripts/**/*.js", ['scripts']);
  gulp.watch("src/images/**/*.*", ['images']);
  gulp.watch("node_modules/bootstrap-sass/assets/fonts/**/*", ['fonts']);
});