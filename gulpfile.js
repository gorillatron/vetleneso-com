
var fs = require("fs")
var path = require('path')
var gulp = require("gulp")
var sourcemaps = require("gulp-sourcemaps")
var babelify = require("babelify")
var uglifyify = require("uglifyify")
var browserify = require("browserify")
var notify = require('osx-notifier')
var del = require("del")
var async = require("async")
var gm = require("gm")


var babelrc = JSON.parse(fs.readFileSync('./.babelrc', 'utf8'))

if(!babelrc.plugins)
  babelrc.plugins = []

// Expose api/client as module 'api' to the server
babelrc.plugins.push(["babel-plugin-module-alias", [
  { "src": "./src/api/client.js", "expose": "api" }
]])


const debug = !(process.env.NODE_ENV == 'production' || process.env.NODE_ENV == 'prod')


gulp.task("create-gallery-thumbnails", (done) => {

  const imageMagick = gm.subClass({ imageMagick: true })

  const imageFolder = path.join(__dirname, 'resources/images/content/galleri')
  const thumbFolder = path.join(__dirname, 'resources/images/content/galleri/thumbs')

  del([thumbFolder + '/**', '!' + thumbFolder])
    .then(() => {
      
      const imageFileNames = fs.readdirSync(imageFolder)
                               .filter((fileName) => fileName.match(/jpg|gif|png/))

      const convertTasks = imageFileNames.map((imageFileName) => {
        return function(callback) {

          const imageFullPath = path.join(imageFolder, imageFileName)
          const imageThumbPath = path.join(thumbFolder, imageFileName)

          imageMagick(imageFullPath)
            .thumb(200, 200, imageThumbPath, 70, callback)

        }
      })

      async.parallelLimit(convertTasks, 10, (err, results) => {
        if(err) {
          console.log("ERRORs:", err)
          return done(err)
        }
        done() // success
      })

    })
    .catch((err) => {
      done(err)
    })
})


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
      console.log(err)
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


gulp.task('prepare-release', ['build-client', 'create-gallery-thumbnails'])


gulp.task('dev-mode', () => {
  gulp.watch('./src/**/*', ['build-client'])
})