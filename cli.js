#!/usr/bin/env node

var fs = require('fs')
var resizeJpeg = require('./index.js')
var argv = require('minimist')(process.argv.slice(2))
var source = argv._[0] === '-' ? process.stdin : fs.createReadStream(argv._[0])
var width = parseInt(argv.w, 10)

if (!width) helpUser('-w is required')
if (width < 1) helpUser('-w is width in pixels, so should be a positive integer')
if (!source) helpUser('a path to file is required')
if (argv.h || argv.help) helpUser()

source
  .pipe(resizeJpeg(width))
  .pipe(process.stdout)
  .on('error', function (err) {
    console.error(err)
    process.exit(-1)
  })

function helpUser (msg) {
  if (msg) console.error(msg)
  console.log('\nUsage: resize-jpeg -w 160 /path/to/file')
  process.exit(msg ? -1 : 0)
}
