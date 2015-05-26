var del = require('del');

module.exports = function (gulp, plugins, conf) {
    return function (cb) {
        del(conf.clean, cb);
    };
};