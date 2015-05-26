module.exports = function (gulp, plugins, conf) {
    return function () {
        return gulp.src('src/gridy/*.ts')
            .pipe(plugins.typescript({
                noImplicitAny: true,
                out: 'gridy.js',
                declarations: true
            }))
            .js
            .pipe(gulp.dest('dist/commonjs'));
    };
};
