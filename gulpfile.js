"use strict";
/*
  gulp is a task runner that operate on node js platform of node stream. Allowing to perform multiple tasks such as file watching.
  gulp api contain 4 top level functions, gulp.task, gulp.src , gulp.dest, gulp.watch.

  vinyl-source-stream is for piping the bundle stream into your gulp pipeline.
  gulp util is for logging custom messages to the terminal
  references: https://hiddentao.com/archives/2016/09/09/react-hot-module-replacement-with-browserify/
*/
const browserify = require('browserify'),
  source = require('vinyl-source-stream2'),
  watchify = require('watchify'),
  livereactload = require('livereactload'),
  livereload = require('gulp-server-livereload'),
  gulp = require('gulp'),
  gutil = require('gulp-util'),
  moment = require('moment');
  moment().format();

/*
  gulp.task(names,deps,fn)
  arguments: names,deps and fn. Where name is a string,
  deps is an array of task names,
  and fn is the function that performs your task. Deps is optional
  references:
  https://github.com/gulpjs/gulp/blob/master/docs/recipes/fast-browserify-builds-with-watchify.md
  https://www.viget.com/articles/gulp-browserify-starter-faq

  browserify api: https://github.com/substack/node-browserify#usage
  browserify([files] [,opts]),  this 2 arguments are optional.
*/

  //running task. browserify({}) will return a browserify instance.
  gulp.task('js',() => {
    // create new bundle
    const b = browserify({
      //add entries for bundling
      entries: ["./wwwroot/js/main.js"],
      //when creating the browserify instance b, you MUST set the cache and packageCache properties,
      //which is a requirement from watchify. references: https://github.com/substack/watchify
      cache:{},
      packageCache:{},
      //include the plugin used
      plugin:[watchify,livereactload]
    })


  //   /*
  //   processing method
  //   b.bundle() Bundle the files and their dependencies into a single javascript file,return bundle stream
  //   */
    let _build = () => {
      //start bundling
      return b.bundle()
      .on('error', (err) => {
        gutil.log(err.stack);
      })
      //since return type is of bundle *stream. method chaining is possible with .pipe()
      .pipe(source('bundle.js'))
      //specify destination folder for bundle.js
      .pipe(gulp.dest('wwwroot/js'));
    }

    // on change ,watchify api
    b.on('update', () => {
     gutil.log('Rerunning browserify...');
     const updateStart = Date.now();
     _build().on('end', () => {
       gutil.log(`...Done ${Date.now() - updateStart} ms`);
     });
   });
   // kick-off
   return _build();
  });

  /*
  gulp-server-livereload references:https://www.npmjs.com/package/gulp-server-livereload
  definition: calling gulp task naming as 'server'. When running 'gulp server', task server will be run in conjunction with task 'js' that is defined above
  By using livereload. it run a local webserver via socket.io. options can be defined in livereload({}).

  attribute fallback is the file to fall back to(relative to webserver root), solving react router development environment related to viewing
  webpage depending on specific url keyed on the address bar as "browserHistory" in react-router need explicit configuration of all routed path
  in the server
  */
  gulp.task('server', ['js'], function() {
  return gulp.src('./')
  .pipe(livereload({
    host: 'localhost',
    port: 8080,
    open: true,
    // defaultFile: './Views/Home/index.html',
    defaultFile: 'Index.html',
    fallback: './Views/Home/index.html'
  }));
});
