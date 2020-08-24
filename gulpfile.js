var gulp = require('gulp'),
    watch = require('gulp-watch'),
    browserSync = require('browser-sync').create(),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer');

var srcDir = './src';
var buildDir = './build';

gulp.task('default', function () {
    OnSass();
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch(srcDir + "/scss/**/*", gulp.series('sass'));
    gulp.watch("index.html").on('change', browserSync.reload);
});

gulp.task('sass', function () {
    return OnSass();
});

function OnSass() {
    return gulp.src(srcDir + '/scss/styles.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 4 versions'],
            cascade: true
        }))
        .pipe(gulp.dest(buildDir + '/css'))
        .pipe(browserSync.stream());
}