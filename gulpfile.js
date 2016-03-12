var gulp = require('gulp');
var uglify = require('gulp-uglify');
var gds = require('gulp-dev-server');

// process JS files and return the stream.
gulp.task('compress', function () {
  return gulp.src('public/javascripts//**/*js')
    .pipe(uglify())
    .pipe(gulp.dest('public/dist/js'));
});

// start and stop server for each save
gulp.task('dev', function () {
  gds.task({
    restart: ['lib/**/*.js'],
    notify: ['static/**/*.js'],
    server: {
      environment: 'development',
      script: { path: 'app.js' }
    }
  })
});

gulp.task('js-watch', ['compress']);


gulp.task('default', ['compress', 'dev']);
