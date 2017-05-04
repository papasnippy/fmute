const gulp = require('gulp');
const ts = require('gulp-typescript');
const tslint = require('gulp-tslint');
const tsCommonjs = ts.createProject('tsconfig.json', { declaration: true });
const tsModule = ts.createProject('tsconfig.json', { module: 'es6' });
const SRC = [
    './src/**/*.ts',
    './src/**/*.tsx'
];

gulp.task('package.json', () => {
    return gulp
        .src([
            './package.json',
            './README.md',
            './LICENSE.md'
        ])
        .pipe(gulp.dest('./dist'));
});

gulp.task('tslint', () => {
    return gulp
        .src(SRC)
        .pipe(tslint({
            formatter: 'verbose'
        }))
        .pipe(tslint.report({
            emitError: false,
            summarizeFailureOutput: 1
        }));
});

gulp.task('build:commonjs', ['tslint'], () => {
    return gulp
        .src(SRC)
        .pipe(tsCommonjs())
        .pipe(gulp.dest('./dist'));
});

gulp.task('build:es', ['tslint'], () => {
    return gulp
        .src(SRC)
        .pipe(tsModule())
        .pipe(gulp.dest('./dist/es'));
});

gulp.task('default', ['package.json', 'tslint', 'build:commonjs', 'build:es']);
