module.exports = function (gulp, plugins, conf) {
    return function () {
        return gulp.src(conf.ts)
            .pipe(plugins.tslint())
            .pipe(plugins.tslint.report('verbose'));
    };
};