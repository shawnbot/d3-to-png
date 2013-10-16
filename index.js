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
      node.setAttribute("xmlns", "http://www.w3.org/2000/svg");
      write('<?xml version="1.0" standalone="yes"?>');
      write(node.outerHTML);
    });
});
