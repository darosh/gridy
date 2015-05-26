module.exports = function (gulp, plugins, conf) {
    return function (done) {
        require('../examples/node');
        done();
    };
};