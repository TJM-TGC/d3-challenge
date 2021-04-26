
// Width / Height for svg 
var svgWidth = outerWidth *.75;
var svgHeight = outerHeight * .75;

// Set Margins 
var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

// Height & Width

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Make the SVG Wrapper

var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);


// Load Data

d3.csv("assets/data/data.csv").then(function(stateData) {
// Parse Data ----
    stateData.forEach(function(data) {
        data.poverty = +data.poverty;
        data.healthcare = +data.healthcare;
      });
// Create Scale Function ----
    var xLinearScale = d3.scaleLinear()
      .domain([d3.min(stateData, d => d.poverty) -.5, d3.max(stateData, d => d.poverty)])
      .range([0, width]);
      var yLinearScale = d3.scaleLinear()
      .domain([d3.min(stateData, d => d.healthcare) -1, d3.max(stateData, d => d.healthcare)])
      .range([height, 0]);
// Create the Axis ----
var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);
// Append
chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

      chartGroup.append("g")
      .call(leftAxis);
// Make Circles for D3 
var circlesGroup = chartGroup.selectAll("circle")
.data(stateData)
.enter()
.append("circle")
.attr("cx", d => xLinearScale(d.poverty))
.attr("cy", d => yLinearScale(d.healthcare))
.attr("r", "17")
.attr("fill", "teal")
.attr("opacity", ".75");

var textGroup = chartGroup.selectAll()
.data(stateData)
.enter()
.append("text")
.attr("x", d => xLinearScale(d.poverty))
.attr("y", d => yLinearScale(d.healthcare))
.text(d => d.abbr)
.attr("r", "17")
.attr("text-anchor", "middle")
.style("fill", "white");

// Tooltip

var toolTip = d3.tip()
      .attr("class", "tooltip")
      .offset([4, -8])
      .html(function(d) {
        return (`${d.state}<hr><br>Percentage in Poverty: ${d.poverty}<br>Percentage with access to healthcare: ${d.healthcare}`);
      });
// Make Tooltip
    chartGroup.call(toolTip);

// -----
    circlesGroup.on("mouseover", function(data) {
      toolTip.show(data, this);
    })
    
// -------
    .on("mouseout", function(data, index) {
      toolTip.hide(data);
    });

// Create labels
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Percentage with Access to Healthcare");

      chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
      .attr("class", "axisText")
      .text("Percentage in Poverty");
  }).catch(function(error) {
    console.log(error);
  });