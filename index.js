var fs = require("fs"),
    sys = require("sys"),
    jsdom = require("jsdom"),
    argv = require("optimist").argv,
    scripts = [
        "vendor/d3.v3.min.js"
    ],
    // I'm sure there's a much better way to do this...
    render = require("./" + argv._[0]),
    // just write to stdout
    write = sys.puts;

// create a jsdom environment with an empty <svg> document
jsdom.env("<svg></svg>", scripts, function(errors, window) {
    render(window, argv, function(error, node) {
      // check to see if this is a d3 selection, and if so get the DOM node
      if (node instanceof window.d3.selection) {
        node = node.node();
      }
      // set the xmlns attribute on the root node
      node.setAttribute("xmlns", "http://www.w3.org/2000/svg");
      // write the XML declaration first
      write('<?xml version="1.0" standalone="yes"?>');
      // then "serialize" using outerHTML
      write(node.outerHTML);
    });
});
