var gulp        = require('gulp');
var uglify = require('gulp-uglify');

// process JS files and return the stream.
gulp.task('js', function () {
    return gulp.src('public/javascripts//**/*js')
        .pipe(uglify())
        .pipe(gulp.dest('public/javascripts/dist/js'));
});

// create a task that ensures the `js` task is complete before
// reloading browsers
gulp.task('js-watch', ['js']);

// use default task to launch Browsersync and watch JS files


gulp.task('default', ['js']);
