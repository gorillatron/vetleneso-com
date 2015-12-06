
var fs = require("fs")
var gulp = require("gulp")
var sourcemaps = require("gulp-sourcemaps")
var babelify = require("babelify")
var uglifyify = require("uglifyify")
var browserify = require("browserify")
var notify = require('osx-notifier')


var babelrc = JSON.parse(fs.readFileSync('./.babelrc', 'utf8'))

if(!babelrc.plugins)
  babelrc.plugins = []

// Expose api/client as module 'api' to the server
babelrc.plugins.push(["babel-plugin-module-alias", [
  { "src": "./src/api/client.js", "expose": "api" }
]])

var debug = !(process.env.NODE_ENV == 'production' || process.env.NODE_ENV == 'prod')

gulp.task("build-client", (cb) => {
  var bundler = browserify({ debug: debug })

  bundler = bundler.transform(babelify, babelrc)
  bundler = bundler.require("./src/client.js", { entry: true })

  if(!debug) {
    bundler = bundler.transform({global: true}, 'uglifyify')
  }

  const bundle = bundler.bundle()

  bundle
    .on("error", (err) => {
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


gulp.task('dev-mode', () => {
  gulp.watch('./src/**/*', ['build-client'])
})