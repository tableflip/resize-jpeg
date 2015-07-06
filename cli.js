#!/usr/bin/env node

/*
  Usage: resize-jpeg --minify -w 160 /path/to/file
*/
var fs = require('fs')
var pumpify = require('pumpify')
var resizeJpeg = require('./index.js')
var mozjpeg = require('mozjpeg-stream')
var argv = require('minimist')(process.argv.slice(2))

var width = parseInt(argv.w, 10)
var source = argv._[0] === '-' ? process.stdin : fs.createReadStream(argv._[0])
var resize = argv.minify ? pumpify(resizeJpeg(width), mozjpeg()) : resizeJpeg(width)

source
  .pipe(resize)
  .pipe(process.stdout)
  .on('error', function (err) {
    console.error(err)
    process.exit(-1)
  })
