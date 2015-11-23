
var fs = require('fs')

var babelrc = JSON.parse(fs.readFileSync('./.babelrc', 'utf8'))


require("babel-core/register")(babelrc)
require("babel-polyfill")

require("./src/server")