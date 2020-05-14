const svgWidth = 975;
const svgHeight = 610;

const chartMargin = {
    top: 30,
    right: 30,
    bottom: 30,
    left: 30
};

const chartWidth = svgWidth - chartMargin.left - chartMargin.right;
const chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;
      
const svg = d3.selectAll('#svg')
    .append('svg')
    .classed('viewBox', true)
    .attr('height', svgHeight)
    .attr('width', svgWidth)



// Scaler variables
const projection = d3.geoAlbersUsa().scale(1300).translate([svgWidth / 2, svgHeight / 2])
const colorScale = d3.scaleSequentialSqrt(d3.interpolateTurbo).domain([0,4000])
const radius = d3.scaleSqrt().domain([0,1683]).range([0,10]);

const path = d3.geoPath(projection)



d3.json("../static/data/comboTopo.json").then(function(data) {
    
    const countiesMap = svg.append('g').classed('map-container', true)
    
    countiesMap.selectAll('.map')
      .data(topojson.feature(data, data.objects.counties).features
      .sort(function(a,b) {return b.properties.INCIDENT - a.properties.INCIDENT}))
      .join('path')
        .classed('map', true)
        .attr('fill', d => colorScale(+d.properties.DENSITY))
        .attr('stroke', 'grey')
        .attr('stroke-width', 0.5)
        .attr('stroke-linejoin', 'round')
        .attr('d', path)
        .attr('cursor', 'pointer')

    const incidents = svg.append('g').classed('incidents-container', true)

    incidents.selectAll('.circle')
      .data(topojson.feature(data, data.objects.counties).features)
      .join('circle')
        .attr('transform', d=> ('translate(' + path.centroid(d)[0] + ',' + path.centroid(d)[1] + ')') )
        .attr('r', d => radius(+d.properties.INCIDENT))
        .style('fill-opacity', .5)
        .style('fill', 'red')
        .style('stroke', 'white')
        .style('stroke-width', .1)
        
    const legend = svg.append('g').classed('legend-container', true)
        .attr('transform', 'translate(740,60)')

    const sliderBox = svg.append('g').classed('slider-box', true)

})
