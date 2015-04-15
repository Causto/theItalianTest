module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-compress');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            dist: {
                options: {
                    style: 'compact',
                    debugInfo: true,
                    lineNumbers: true,
                    sourcemap: 'file'
                },
                files: [{
                    expand: true,
                    cwd: 'source/dev/',
                    src: ['*.scss'],
                    dest: 'source/css/',
                    ext: '.css'
                }]
            }
        },
        cssmin: {
            options: {
                mangle: false,
                stripBanners: true,
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd-HH-MM") %> */'
            },
            css_target: {
                files: [{
                    expand: true,
                    cwd: 'source/css/',
                    src: ['*.css'],
                    dest: 'public/css/',
                    ext: '.min.css'
                }]
            }
        },
        uglify: {
            options: {
                sourceMap: true,
                mangle: false,
                stripBanners: true,
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd-HH-MM") %> */'
            },
            js_target: {
                files: [{
                    expand: true,
                    cwd: 'source/js/',
                    src: 'main.js',
                    dest: 'public/js/',
                    ext: '.min.js'
                }]
            }
        },
        compress: {
            main: {
                options: {
                    archive:  grunt.template.today("yyyy" + "mm" + "dd" + "HH" + "MM") + '.zip'
                },
                files: [
                    {
                        expand: true,
                        cwd: 'public/',
                        src: ['**/*'],
                        dest: '../',
                        filter: 'isFile'
                    }
                ]
            }
        },
        concat: {
            options: {
                sourceMap: true,
                stripBanners: true,
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                        '<%= grunt.template.today("yyyy-mm-dd") %> */'
            },
            js_concat: {
                src: ['public/design/js/utils.services.js', 'public/design/js/utils.common.js', 'public/design/js/script.js', 'public/design/js/chester.js', 'public/design/js/navigation.common.js', '!*.min.js'],
                dest: 'public/design/js/built.js'
            }
        },
        copy: {
            html: {
                files: [{
                    expand: true,
                    cwd: 'source/',
                    src: ['*.html'],
                    dest: 'public/'
                }]
            },
            css: {
                files: [{
                    expand: true,
                    cwd: 'source/',
                    src: ['source/css/**'],
                    dest: 'public/'
                }]
            },
            js: {
                files: [{
                    expand: true,
                    cwd: 'source/',
                    src: ['source/js/*.min.js'],
                    dest: 'public/'
                }]
            }
        },
        watch: {
            sass: {
                files: 'source/dev/*.scss',
                tasks: ['sass', 'cssmin'],
                options: {
                  interrupt: true,
                  livereload: true
                }
            },
            html: {
                files: 'source/*.html',
                tasks: ['copy:html'],
                options: {
                  interrupt: true,
                  livereload: true
                }
            },
            js: {
                files: 'source/js/*.js',
                tasks: ['uglify'],
                options: {
                  interrupt: true,
                  livereload: true
                }
            }
        }
    });

    grunt.registerTask('default', ['sass', 'uglify', 'cssmin', 'copy', 'watch']);

};