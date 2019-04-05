var gulp = require('gulp'),
    sass = require('gulp-sass'),
    cleanCss = require('gulp-clean-css'),
    autoprefixer = require('gulp-autoprefixer'),
    stylelint = require('stylelint'),
    gulpStylelint = require('gulp-stylelint');

gulp.task('sass', () => {
    return gulp.src(['./src/scss/**/*.scss'])
        .pipe(gulpStylelint({
            reporters: [{
                formatter: 'string',
                console: true
            }],
            failAfterError: true,
            debug: true
        }))
        .pipe(sass())
        .pipe(autoprefixer(['last 5 versions']))
        .pipe(cleanCss())
        .pipe(gulp.dest('./src/css'))
});

gulp.task('watch', () => {
    gulp.watch(['./src/scss/**/*.scss'], gulp.series('sass'))
});

