let fs = require('fs');
let { exec, spawn } = require('child_process');
let gulp = require('gulp');
let clean = require('gulp-clean');
let webpack = require('webpack');
let configGen = require('./webpack.config.js');
let fozyProc = null;

const BASE_DIR = './src/';
const DEST_DIR = BASE_DIR + 'dist';

gulp.task('clean', function(){
    gulp.src(
        [ DEST_DIR ],
	    { read: false }
    ).pipe(clean({force: true}));
});

// gulp.task('fozy', function() {
//     fozyProc = spawn('fozy -w', {
//         stdio: 'inherit',
//         shell: true
//     });
// });

gulp.task('webpack', function() {
    configGen().then(function(config) {
        config.devtool = 'cheap-module-eval-source-map';
        webpack(config).watch(null, function(err, stats) {
            if (err) {
                console.log(err);
            }
            exec(`echo ${(+new Date)} > ${DEST_DIR}/deploydone`);
        });
    });
});

gulp.task('default', ['clean', 'webpack'], function(){});