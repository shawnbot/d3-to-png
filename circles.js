module.exports = function(window, options, callback) {
  var d3 = window.d3,
      width = options.width || 400,
      height = options.height || 500;
      count = options.count || 100,
      svg = d3.select("svg")
        .attr("width", width)
        .attr("height", height);

  var circles = d3.range(0, count)
    .map(function(i) {
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        r: 2 + Math.random() * 28
      };
    });

  var color = d3.scale.category20();

  svg.selectAll("circle")
    .data(circles)
    .enter()
    .append("circle")
      .attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; })
      .attr("r", function(d) { return d.r; })
      .attr("fill", function(d, i) { return color(i); });

  callback(null, svg);
};
