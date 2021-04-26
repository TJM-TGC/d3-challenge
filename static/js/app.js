// Load CSV Data

_csv = "static/data/data.csv"

// Build Chart Parameters

var svgWidth = 800;
var svgHeight = 500;

var margin = {

    top: 20,
    right: 40,
    bottom: 60,
    left: 50
};


var width = svgWidth - margin.left - margin.right;
var height = svgHeigh - margin.top - margin.bottom;

// Create the SVG Rapper 

var svg = d3

.select("#scatter")
.append("svg")
.attr("width",svgWidth)
.attr("height",svgHeight);

var chartGroup = svg.append("g")
.attr("transform",'translate(${margin.left},${margin.top');

// Load Data 

d3.csv(_csv).then(function(CensusData)) {
    Census.Data.forEach(function(data) {
        data.poverty = +data.poverty;
        data.healthcare = +data.healthcare;
    });


// Creates the Scale

const xScale = d3.scaleLinear()
.domain(d3.extent(CensusData,d=> d.poverty))
.range([0,width])
.nice();

const yScale = d3.scaleLinear()
.domain(d3.extent(CensusData, d=> d.healthcare))
.range([height, 0])
.nice();

// The Axes

const xAxis = d3.axisBottom(xScale)
}