const gulp = require('gulp');
const babel = require('gulp-babel');
const gutil = require('gulp-util');

const webpack = require('webpack');
const webpackConfig = require('./webpack.config');


// transpile from ES6 to ES5 for Server
/*
gulp.task('babel-server', function() {
  return gulp.src('./components/*.js')
        .pipe(babel({
            presets: ['es2015', 'react', 'stage-0']
        }))
        .on('error', gutil.log)
        .pipe(gulp.dest('./es5-lib'));
});
*/

// transpile from ES6 to ES5 for client
gulp.task('babel-client', function () {
  let myConfig = Object.create(webpackConfig);

  // run webpack
  webpack(myConfig, function(err, stats) {
   if (err) throw new gutil.PluginError('webpack', err);
   gutil.log('[webpack]', stats.toString({
     colors: true,
     progress: true
   }));
  });
});


gulp.task('watch', function() {
  gulp.watch('./src/*.js', ['babel-client']);
});

gulp.task('default', ['babel-client', 'watch']);

