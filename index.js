var util = require('util')
var dcp = require('duplex-child-process')

// The mysterious dangling `-` tells gm to stream stdin and stdout instead of using filenames
var args = 'convert -size %s - -resize %s -define jpeg:preserve-settings -'

module.exports = function (width) {
  var size = width + 'x' + width
  // e.g gm convert -size 800x800 - -resize 800x800 -define jpeg:preserve-settings -
  var resize = dcp.spawn('gm', util.format(args, size, size).split(' '))
  return resize
}
