var gulp = require('gulp'),
    watch = require('gulp-watch'),
    browserSync = require('browser-sync').create(),
    sass = require('gulp-sass'),
    cleanCSS = require('gulp-clean-css'),
    autoprefixer = require('gulp-autoprefixer');

var srcDir = './src';
var buildDir = './build';

gulp.task('default', function () {
    gulp.parallel('scss', 'js', 'fonts')();

    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch(srcDir + "/scss/**/*", gulp.series('scss'));
    gulp.watch(srcDir + "/img/**/*", gulp.series('img'));
    gulp.watch(srcDir + "/js/**/*", gulp.series('js'));
    gulp.watch(srcDir + "/fonts/**/*", gulp.series('fonts'));
    gulp.watch("index.html").on('change', browserSync.reload);
});

gulp.task('scss', function () {
    return gulp.src(srcDir + '/scss/styles.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(cleanCSS({
            compatibility: 'ie8'
        }))
        .pipe(gulp.dest(buildDir + '/css'))
        .pipe(browserSync.stream());
});

gulp.task('img', function () {
    return gulp.src(srcDir + '/img/**/*')
        .pipe(gulp.dest(buildDir + '/img'));
});

gulp.task('js', function () {
    return gulp.src(srcDir + '/js/**/*')
        .pipe(gulp.dest(buildDir + '/js'));
});

gulp.task('fonts', function () {
    return gulp.src(srcDir + '/fonts/**/*')
        .pipe(gulp.dest(buildDir + '/fonts'));
});