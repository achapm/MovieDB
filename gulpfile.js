// Require Gulp for rapid development environment:
var gulp = require('gulp');

// Require the gulp-sass plugin
var sass = require('gulp-sass');

// Require browser-sync to refresh the page each time a file is saved
var browserSync = require('browser-sync').create();

/* Require gulp-useref for:
JS concatenation into: dist/js/app.min.js 
CSS concatenation into: css/app.min.css */
var useref = require('gulp-useref');

// Require gulp-uglify for JS minification of: dist/js/app.min.js 
var uglify = require('gulp-uglify');

// Require gulp-cssnano for CSS minification
var cssnano = require('gulp-cssnano');

// Require gulp-if to insure we use the correct minification tools for JS (gulp-uglify) and CSS (gulp-cssnano)
var gulpIf = require('gulp-if');

// Require gulp-imagemin for image optimization
var imagemin = require('gulp-imagemin');

// Require gulp-cache to cache images that have already been optimized since optimizing images is a slow process
var cache = require('gulp-cache');

// Require del to cleaning up generated files in the /dist/ folder to insure that unused files are removed
var del = require('del');

// Require runSequence to insure that file cleanup (del) runs before build tasks
var runSequence = require('run-sequence');


// Create gulp-sass task to compile SASS files into CSS files
gulp.task('sass', function() {
  return gulp.src('app/scss/**/*.scss') // Gets all files ending with .scss in app/scss
    .pipe(sass())
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

// Create browserSync task and give it a base directory of app
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })
})

// Create useref task to concatenate and minify JS and CSS
gulp.task('useref', function(){
  return gulp.src('app/*.html')
    .pipe(useref())
    // Minifies only if it's a JS file
    .pipe(gulpIf('*.js', uglify({mangle: false})))
    // Minifies only if it's a CSS file
    .pipe(gulpIf('*.css', cssnano()))
    // Move files to distribution
    .pipe(gulp.dest('dist'))
});

// Copy the components to the /dist/ folder
gulp.task('components', function() {
  return gulp.src('app/components/**/*')
  .pipe(gulp.dest('dist/components'))
})

// Copy the views to the /dist/ folder
gulp.task('views', function() {
  return gulp.src('app/views/**/*')
  .pipe(gulp.dest('dist/views'))
})

// Remove all the files and folders in the /dist/ folder
gulp.task('clean:dist', function() {
  return del.sync('dist');
})

// Tell Gulp to watch for changes in SASS, HTML or JS, then compile and refresh the page
gulp.task('watch', ['browserSync'], function (){
  gulp.watch('app/*.js', browserSync.reload);
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/controllers/**/*.js', browserSync.reload);
  gulp.watch('app/services/**/*.js', browserSync.reload);
  gulp.watch('app/views/**/*.js', browserSync.reload);
  gulp.watch('app/views/**/*.html', browserSync.reload);
  gulp.watch('app/scss/**/*.scss', ['sass']); 
})

// Build final distribution into /dist/ folder
gulp.task('build', function (callback) {
  runSequence('clean:dist', 
    ['sass', 'useref', 'components', 'views'],
    callback
  )
})
