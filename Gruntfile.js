module.exports = function (grunt) {
    "use strict";
    var initConfig = require('./config/get-config.js')(grunt);

    grunt.initConfig(initConfig);

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-jslint');

    grunt.registerTask('lint', ['jslint:application', 'jshint']);
    grunt.registerTask('compile-test',  ['clean:test', 'copy:test', 'browserify:test', 'less:test']);
    grunt.registerTask('compile-dev',  ['clean:dev', 'copy:dev', 'browserify:dev', 'less:dev', 'autoprefixer:dev']);
    grunt.registerTask('compile-deploy',  ['clean:deploy', 'copy:deploy', 'browserify:deploy', 'less:deploy', 'autoprefixer:deploy', 'uglify']);
    grunt.registerTask('compile', ['compile-dev', 'compile-test', 'compile-deploy']);
    grunt.registerTask('server', ['compile-dev', 'connect:all', 'watch']);
    grunt.registerTask('default', ['compile']);

    if (initConfig.aws_s3) {
        grunt.loadNpmTasks('grunt-aws-s3');
        if (initConfig.aws_s3.production) {
            grunt.registerTask('deploy', ['compile-deploy', 'aws_s3:production', 'aws_s3:production-cleaner']);
        }
    }
};
