# d3 &rarr; png

This is not really a library or a tool so much as it is a proof of concept in
which we use [d3.js](http://d3js.org) and
[jsdom](https://github.com/tmpvar/jsdom) to generate SVG documents from the
command line. Here's how to use it:

### 1. Install the Node prerequisites

```sh
$ npm install
```

### 2. Install [ImageMagick](http://www.imagemagick.org/)

With your favorite package manager (brew, apt, etc.).

### 3. Write a rendering script

It should look like this:

```js
module.exports = function(window, options, callback) {
  var d3 = window.d3,
      svg = d3.select("svg");
  // do something fancy with svg here
  callback(null, svg.node());
};
```

Your `module.exports` function whould accept the following arguments:

* `window` the DOM window for the current context. Get your reference to d3 via
  `window.d3`.
* `options` is a dictionary of command line options from
  [optimist](https://github.com/substack/node-optimist).
* `callback` is a function to call when you're done rendering, in the form
  `callback(error, node)`. `node` may either by a d3 selection or a DOM node.

See [circles.js](blob/master/circles.js) for an example.

### 4. Run your script to create the SVG

Replace `render.js` with the path to your script:

```sh
$ node index.js render.js > output.svg
```

### 5. Convert your SVG to PNG

Using [ImageMagick's convert utility](http://www.imagemagick.org/script/convert.php):

```sh
$ convert -background none output.svg output.png
```

### Automate it!

The included `Makefile` automates these steps with wildcard targets for `%.svg` and `%.png`:

```sh
# renders with circles.js
$ make circles.svg
# converts circles.svg to circles.png
$ make circles.png
```

As an added bonus, `%.svg` is a prerequisite of `%.png`, so the `.svg` will be generated automatically when you make the `.png`.

### Providing options to your script

Command line options are parsed with [optimist](https://github.com/substack/node-optimist) and passed as the second argument to your render function, so if you run:

```sh
$ node index.js --width 500 --height 100 render.js
```

Your render script will receive the following options object as its second argument:

```js
{
  width: 500,
  height: 100
}
```
