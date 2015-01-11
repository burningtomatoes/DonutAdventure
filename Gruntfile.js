module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> / www.burningtomato.com */\n'
            },
            build: {
                src: ['src/3rdparty/inherit.js', 'src/game/entity.js', 'src/game/pickup.js', 'src/**/*.js'],
                dest: 'build/donutadventure.min.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.registerTask('default', ['uglify']);
};