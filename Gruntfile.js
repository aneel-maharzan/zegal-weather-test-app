module.exports = function(grunt){
	'use strict';

	grunt.initConfig({

		//basic setting and info about plugins
		pkg: grunt.file.readJSON('package.json'),

		// Setting folder templates.
		// dirs: {
		// 	js: 'assets/js/',
		// 	css: 'assets/css',
		// 	sass: 'assets/scss'
		// },

		//name of  plugin(plugin name without the "grunt-contrib")

		//sass
		sass:{
			options: {
	          style: 'expanded',
	        },
			dist:{
				files:{
					'assets/css/style.css' : ['assets/scss/main.scss']
				}
			}
		},
		concat : {
			js: { 
				src: [
					'./assets/js/*.js'
				],
				dest: './assets/js/main.js'
			}
		},

		postcss: {
			options: {
				map: true,
				processors: [
			        //require('pixrem')(),  add fallbacks for rem units
			        require('autoprefixer')({browsers: 'last 5 versions'}), // add vendor prefixes
			        // require('cssnano')() minify the result
		        ]
			},
			dist: {
				src:'assets/css/style.css'
			}
		},
		watch: {
			css: {
				files: ['assets/scss/**/*.scss'],
				tasks: ['sass', 'postcss']
			},
			options: {
				spawn: false
			}
		},

		
		// Copy files to deploy.
		copy: {
			deploy: {
				src: [
					'**',
					'!.*',
					'!*.md',
					'!.*/**',
					'!Gruntfile.js',
					'!package.json',
					'!package-lock.json',
					'!node_modules/**',
					'!npm-debug.log',
					'!assets/scss/**'
				],
				dest: 'deploy/<%= pkg.name %>',
				expand: true,
				dot: true
			}
		},

	});

	//load plugins

	// Load NPM tasks to be used here

	grunt.loadNpmTasks( 'grunt-contrib-copy' );
	grunt.loadNpmTasks( 'grunt-contrib-watch' );
	grunt.loadNpmTasks( 'grunt-contrib-sass' );
	grunt.loadNpmTasks( 'grunt-contrib-concat' );
	grunt.loadNpmTasks('grunt-postcss');
	
	// Register tasks
	grunt.registerTask( 'default', [ 'sass', 'postcss'] );
	grunt.registerTask( 'css', [ 'sass' ] );
	grunt.registerTask( 'js', [ 'concat' ] );
	grunt.registerTask( 'deploy', [ 'concat', 'sass', 'copy:deploy' ] );


};

