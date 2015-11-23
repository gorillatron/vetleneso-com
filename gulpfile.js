
var fs = require("fs")
var gulp = require("gulp")
var sourcemaps = require("gulp-sourcemaps")
var babelify = require("babelify")
var browserify = require("browserify")
var notify = require('osx-notifier')


var babelrc = JSON.parse(fs.readFileSync('./.babelrc', 'utf8'))

if(!babelrc.plugins)
  babelrc.plugins = []


babelrc.plugins.push(["babel-plugin-module-alias", [
  { "src": "./src/api/client.js", "expose": "api" }
]])


console.log(babelrc)

gulp.task("build-client", (cb) => {
  browserify({ debug: true })
    .transform(babelify, babelrc)
    .require("./src/client.js", { entry: true })
    .bundle()
    .on("error", (err) => {
      console.log("Error: " + err.message)
      notify({
        type: 'fail',
        title: 'Gulp',
        subtitle: 'Build fail',
        message: err.message,
        group: 'taskdoer'
      })
      cb() })
    .pipe(fs.createWriteStream("./resources/js/client.js"))
    .on("finish", () => {
      notify({
        type: 'pass',
        title: 'Gulp',
        subtitle: 'Build success',
        message: "success",
        group: 'taskdoer'
      })
      cb()
    })
})

gulp.task("build-server", (cb) => {
  browserify({ debug: true })
    .transform(babelify)
    .require("./src/server.js", { entry: true })
    .bundle()
    .on("error", (err) => {
      console.log("Error: " + err.message)
      notify({
        type: 'fail',
        title: 'Gulp',
        subtitle: 'Build fail',
        message: err.message,
        group: 'taskdoer'
      })
      cb() })
    .pipe(fs.createWriteStream("./dist/server.js"))
    .on("finish", () => {
      notify({
        type: 'pass',
        title: 'Gulp',
        subtitle: 'Build success',
        message: "success",
        group: 'taskdoer'
      })
      cb()
    })
})


gulp.task('dev-mode', () => {
  gulp.watch('./src/**/*', ['build-client'])
})