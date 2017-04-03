const gulp = require('gulp');
const ts = require('gulp-typescript');
const tsp = ts.createProject('tsconfig.json', { declaration: true });

gulp.task('package.json', () => gulp.src('./package.json').pipe(gulp.dest('./dist')));

gulp.task('build', () => gulp.src('./src/**/*.ts').pipe(tsp()).pipe(gulp.dest('./dist')));

gulp.task('default', ['package.json', 'build']);
