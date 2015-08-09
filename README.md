# resize-jpeg

Resize a jpeg image **and** preserve it's encoding quality:

```sh
resize-jpeg -w 800 original.jpg > original.w800.jpg
```

By default, [GraphicsMagick](http://www.graphicsmagick.org/) (and ImageMagick) arbitrarily reduce the quality of your images when you resize them. **That's surprising.**

A tool like `mozjpeg` does a better job of optimising images, so inthe spirit of doing one thing well, this module provides a streaming transform and a command line tool, to handle the details of getting graphicsmagick to resize without reducing quality.

## Get started

Use a sensible package manager for you OS to install [GraphicsMagick](http://www.graphicsmagick.org/)

Then use npm to install `resize-jpeg`, globally as a command line tool.

```sh
brew install graphicsmagick
npm install -g resize-jpeg
resize-jpeg -w 800 path/to/my/picture
```
where `-w` is the new **width** you'd like proportionally scale the image to.

## Use it as a module!

Add it to your project
`npm install --save resize-jpeg`

Now you have a transform stream that'll resize internet pugs on the fly:

```js
var fs = require('fs')
var http = require('http')
var resizeJpeg = require('resize-jpeg')

http.get('http://aboutpug.com/wp-content/uploads/2015/01/flying-monkey-cute-pug.jpg')
  .on('response', function (resp) {
    resp
      .pipe(resizeJpeg(800)) // woo hoo
      .pipe(fs.createWriteStream('webpug.w800.jpg'))
  })
```

or more simply, just resize jpegs from your local file system

```js
var fs = require('fs')
var http = require('http')
var resizeJpeg = require('resize-jpeg')

fs.createReadStream('flying-pug.jpg')
  .pipe(resizeJpeg(800))
  .pipe(fs.createWriteStream('pug.w800.jpg'))
```

## How does it work?

Under the hood, `resize-jpeg` is just doing the work of remembering the nasty gm command arguments for you. If you prefer to do it long hand, then it's the same as:

```sh
gm convert original.jpg -resize 800x800 -define jpeg:preserve-settings - > original.w800.min.jpg
```

## Resize and optimise for the web

If you want to save your image for the web (who doesnt?), [`mozjpeg`](https://npm.io/mozjpeg) does a better job of optimising pixels for your eyes, and every byte counts, so you can:

```sh
resize-jpeg -w 800 foo.jpg | mozjpeg > foo.w800.min.jpg
```

Or better still just go install [saveforweb](saveforweb), which does all the things that your friendly neighbourhood image editing program would do to optimise photos for transmission on the information super highway:

```sj
saveforweb -w 800 foo.jpg > foo.w800.min.jpg
```

That'll generally give a better output jpeg for fewer bytes. Win win!

---

A [(╯°□°）╯︵TABLEFLIP](https://tableflip.io) side project.
