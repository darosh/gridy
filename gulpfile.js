var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var conf = require('./gulpfile.conf.js');

function getTask(task) {
    return require('./gulp-tasks/' + task)(gulp, plugins, conf);
}

gulp.task('browserify:gridy', ['ts:gridy'], getTask('browserify-gridy'));
gulp.task('browserify:diagramy', ['ts:diagramy'], getTask('browserify-diagramy'));

gulp.task('browserify', ['browserify:gridy', 'browserify:diagramy']);

gulp.task('build:examples', ['ts:gridy', 'ts:diagramy'], getTask('build-examples'));

gulp.task('doc', getTask('typedoc'));

gulp.task('tslint', getTask('tslint'));

gulp.task('ts:gridy', getTask('typescript-gridy'));
gulp.task('ts:diagramy', getTask('typescript-diagramy'));
gulp.task('ts', ['ts:gridy', 'ts:diagramy']);

gulp.task('test', ['tslint']);

gulp.task('watch', function () {
    gulp.watch(conf.watch.gridy, ['browserify:gridy']);
    gulp.watch(conf.watch.diagramy, ['browserify:diagramy']);
});

gulp.task('clean', getTask('clean'));

gulp.task('default', ['browserify', 'test', 'build:examples', 'doc']);