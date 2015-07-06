var fs = require('fs')
var http = require('http')
var resizeJpeg = require('../index.js')

http.get('http://aboutpug.com/wp-content/uploads/2015/01/flying-monkey-cute-pug.jpg')
  .on('response', function (resp) {
    resp
      .pipe(resizeJpeg(800))
      .pipe(fs.createWriteStream('webpug.w800.jpg'))
  })
