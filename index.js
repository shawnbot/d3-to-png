var fs = require("fs"),
    sys = require("sys"),
    jsdom = require("jsdom"),
    argv = require("optimist").argv,
    scripts = [
        "vendor/d3.v3.min.js"
    ],
    render = require("./" + argv._[0]),
    write = sys.puts;

jsdom.env("<svg></svg>", scripts, function(errors, window) {
    render(window, argv, function(error, node) {
      // check to see if this is a d3 selection, and if so get the DOM node
      if (node instanceof window.d3.selection) {
        node = node.node();
      }
      node.setAttribute("xmlns", "http://www.w3.org/2000/svg");
      write('<?xml version="1.0" standalone="yes"?>');
      write(node.outerHTML);
    });
});
