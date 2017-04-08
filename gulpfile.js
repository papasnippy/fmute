const gulp = require('gulp');
const ts = require('gulp-typescript');
const tslint = require('gulp-tslint');
const tsp = ts.createProject('tsconfig.json', { declaration: true });
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

gulp.task('build', ['tslint'], () => {
    return gulp
        .src(SRC)
        .pipe(tsp())
        .pipe(gulp.dest('./dist'));
});

gulp.task('default', ['package.json', 'tslint', 'build']);
