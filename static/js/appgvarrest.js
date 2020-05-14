// Define SVG area dimensions
var svgWidth = 1260;
var svgHeight = 760;

// Define the chart's margins as an object
var chartMargin = {
  top: 75,
  right: 30,
  bottom: 130,
  left: 30
};

// Define dimensions of the chart area
var width = svgWidth - chartMargin.left - chartMargin.right;
var height = svgHeight - chartMargin.top - chartMargin.bottom;

var toolTip = d3.tip()
.attr("class", "d3-tip")
.offset([-10, 0])
.html(function(d) {
return (`Incident Id: ${d.incident_id}<br>Year: ${d.year} <br>Arrested: ${d.Arrested}`);
});


// Select body, append SVG area to it, and set the dimensions
var svg = d3
  .select("body")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);


// Append a group to the SVG area and shift ('translate') it to the right and down to adhere
// to the margins set in the "chartMargin" object.
var chartGroup = svg.append("g")
  .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);



  svg.call(toolTip);

// d3.json("../resource/gvdata.json", function(gvData, err) {
d3.json("../static/data/all.json").then(function(gvData) {
  console.log('hi');
  console.log(gvData);
  //if (err) throw err;

  // Cast the killed value to a number for each piece of gvData
  gvData.forEach(function(data) {
    data.state = data.state;
    data.Arrested =+ data.Arrested
    data.Killed = +data.Killed;
    data.Year =+ data.Year;
  });
  var xBandScale = d3.scaleBand()
  .domain(gvData.map(d => d.state))
  .range([0, width])
  .padding(0.1);

  var yLinearScale = d3.scaleLinear()
  .domain([0, d3.max(gvData, d => d.Arrested)])
  .range([height, 0]);

  var bottomAxis = d3.axisBottom(xBandScale);
  var leftAxis = d3.axisLeft(yLinearScale);


  chartGroup.append("g")
    .call(leftAxis);

  chartGroup.append("g")
    .classed("x-axis", true)
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis)
  .selectAll("text")
    .attr("y", 0)
    .attr("x", 9)
   .attr("dy", ".135em")
   .attr("transform", "rotate(90)")
    .style("text-anchor", "start");
  

  
    // Create code to build the bar chart using the gvData.
  
  barGroup = chartGroup.selectAll(".bar")
    .data(gvData)
    .enter()
    .append("rect")
    .classed("bar", true)
    .attr("width", xBandScale.bandwidth())
    .attr("height", d => height - yLinearScale(d.Arrested))
    .attr("x", d => xBandScale(d.state))
    .attr("y", d => yLinearScale(d.Arrested))
    .on('click', toolTip.show)
    .on('mouseout', function() {
      d3.select(".d3-tip")
      .transition()
        .delay(100)
        .duration(600)
        .style("opacity",0)
        .style('pointer-events', 'none')
      });	





  // chartGroup.call(toolTip);


  // barGroup.on("click", function(data) {
  //   toolTip.show(data, this);
  // })
  //   // onmouseout event
  //   .on("mouseout", function(data, index) {
  //     toolTip.hide(data);
  //   });

//}).catch(function(error) {
//  console.log(error);
});