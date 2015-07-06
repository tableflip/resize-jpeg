# resize-jpeg

You want to resize a jpeg? You want to preserve it's visual quality while doing so?

```sh
resize-jpeg -w 800 original.jpg > original.w800.jpg
```

## Resize a jpeg and optimise for the web with `mozjpeg`

[GraphicsMagick](http://www.graphicsmagick.org/) (and ImageMagick) dial down the quality of your JPEG files when you resize them.

That's surprising. [`mozjpeg`](https://npm.io/mozjpeg) does a better job of optimising pixels for your eyes, and every byte counts, so instead:

```sh
resize-jpeg --minify -w 800 original.jpg > original.w800.min.jpg
```

That'll generally give a better output jpeg for fewer bytes. Win win!

## Get started

Use a sensible package manager for you OS to install http://www.graphicsmagick.org/
Then use npm to install `resize-jpeg`, globally as a command line tool.

```sh
brew install graphicsmagick
npm install -g resize-jpeg
resize-jpeg -w 800 path/to/my/picture
```
where `-w` is the new **width** you'd like proportionally scale the image to.
Add a `--minify` in there to engage mozjpeg minification magic.

## Use it as a module!

Add it to your project
`npm install --save resize-jpeg`

Add you now have a transform stream that'll resize internet pugs on the fly:

```js
var fs = require('fs')
var http = require('http')
var resizeJpeg = require('resize-jpeg')

http.get('http://aboutpug.com/wp-content/uploads/2015/01/flying-monkey-cute-pug.jpg')
  .on('response', function (resp) {
    resp
      .pipe(resizeJpeg(800))
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

---

A [(╯°□°）╯︵TABLEFLIP](https://tableflip.io) side project.
