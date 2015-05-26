module.exports = function (gulp, plugins, conf) {
    return function () {
        return gulp.src('src/diagramy/*.ts')
            .pipe(plugins.typescript({
                //module: 'commonjs',
                target: 'ES5',
                //noImplicitAny: true,
                out: 'diagramy.js',
                declarations: true
            }))
            .js
            .pipe(gulp.dest('dist/commonjs'));
    };
};
