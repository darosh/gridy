module.exports = function (gulp, plugins, conf) {
    return function () {
        return gulp
            .src(conf.doc.src)
            .pipe(plugins.typedoc({
                module: 'commonjs',
                out: conf.doc.tgt,
                mode: 'file',
                name: 'Gridy',
                readme: 'assets/doc.template.md'
            }));
    };
};
