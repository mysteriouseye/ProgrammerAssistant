const gulp = require('gulp');
const gutil = require('gulp-util');
const electron = require('electron-connect').server.create();

gulp.task('watch:electron', function (){
    electron.start();
    gulp.watch(['./main.js'],electron.restart);
    gulp.watch(['./src/**/*.{html,js,css}'],electron.reload);
});
