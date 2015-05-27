var merge = require('merge2');

module.exports = function (gulp, plugins, conf) {
    return function () {
        var result = gulp.src('src/gridy/*.ts')
            .pipe(plugins.typescript({
                module: 'commonjs',
                target: 'ES5',
                noImplicitAny: true,
                declarationFiles: true,
                out: 'gridy.js'
            }));

        return merge([
            result.js.pipe(gulp.dest('dist/commonjs')),
            result.dts.pipe(gulp.dest('.'))
        ]);
    };
};
