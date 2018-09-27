/**
 * Created by Administrator on 2017/08/17.
 */
var gulp = require("gulp");
var uglify = require("gulp-uglify");
var concat = require("gulp-concat");
var minifyCss = require("gulp-minify-css");
var minifyHtml = require("gulp-minify-html");
console.log(gulp);
gulp.task("js",function () {
    gulp.src("./*.js")
        .pipe(uglify())
        .pipe(concat("all.js"))
        .pipe(gulp.dest("./"));
});
gulp.task("css",function () {
    gulp.src("./*.css")
        .pipe(minifyCss())
        .pipe(concat("all.css"))
        .pipe(gulp.dest("./css"));
})
gulp.task("html",function () {
    gulp.src("./*.html")
        .pipe(minifyHtml())
        .pipe(gulp.dest("./html"));
})
gulp.task("default",["js","css","html"]);
/*gulp.watch("./!*.js",["js"]);
gulp.watch("./!*.css",["css"]);
gulp.watch("./!*.html",["html"]);*/
