module.exports = {
    src: {
        gridy: 'dist/commonjs/gridy.js',
        diagramy: 'dist/commonjs/diagramy.js'
    },
    tgt: {
        gridy: 'gridy.js',
        diagramy: 'diagramy.js'
    },
    min: {
        gridy: 'gridy.min.js',
        diagramy: 'diagramy.min.js'
    },
    ts: ['src/**/*.ts'],
    watch: {
        gridy: ['src/gridy/*.js'],
        diagramy: ['src/diagramy/*.js']
    },
    doc: {src: 'src/**/*.ts', tgt: 'doc'},
    clean: ['dist', 'doc', 'examples/output'],
    dest: 'dist/browser'
};