var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

module.exports = function (gulp, plugins, conf) {
    return function () {
        var b = browserify({
            entries: conf.src.gridy,
            debug: false,
            standalone: 'Gridy'
        });

        return b.bundle()
            .pipe(source(conf.src.gridy))
            .pipe(plugins.rename(conf.tgt.gridy))
            .pipe(gulp.dest(conf.dest))
            .pipe(plugins.rename(conf.min.gridy))
            .pipe(buffer())
            .pipe(plugins.sourcemaps.init({loadMaps: true}))
            // Add transformation tasks to the pipeline here.
            .pipe(plugins.uglify())
            .on('error', plugins.util.log)
            .pipe(plugins.sourcemaps.write('./'))
            .pipe(gulp.dest(conf.dest));
    };
};