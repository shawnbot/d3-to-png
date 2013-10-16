# d3-to-png

This is not really a library or a tool so much as it is a proof of concept in
which we use [d3.js](http://d3js.org) in conjunction with
[node.js](http://nodejs.org) to generate SVG documents from the command line.

Here's how to run it:

```
$ node index.js script.js > output.svg
```

You'll want to replace `script.js` above with your own Node script that looks
like this:

```
module.exports = function(window, options, callback) {
  var d3 = window.d3,
      svg = d3.select("svg");
  // do something fancy with svg here
  callback(null, svg.node());
};
```

and which accepts the following arguments:

* `window` the DOM window for the current context. Get your reference to d3 via
  `window.d3`.
* `options` is a dictionary of command line options from
  [optimist](https://github.com/substack/node-optimist).
* `callback` is a function to call when you're done rendering, in the form
  `callback(error, node)`. Note that `node` here is the *DOM node*, not a d3
  selection, which you can get by calling [selection.node()](https://github.com/mbostock/d3/wiki/Selections#wiki-node).

See [circles.js](blob/master/circles.js) for an example.
