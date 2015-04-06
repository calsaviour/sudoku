module.exports = {
    all: {
        src: [
            'src/js/**/*.js',
            'test/**/*.js',
            'config/*.js',
            'Gruntfile.js'
        ],
        options: {
            browserify: true,
            browser: true,
            '-W030': true
        }
    }
};
