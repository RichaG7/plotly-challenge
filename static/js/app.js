// Fetch the JSON data and console log it
function chartbuilder(id) {
  d3.json("samples.json").then((data) => {
    var selector = d3.select('#selDataset');

    var samples = data.samples;
    var metadata = data.metadata;

    var id = selector.property('value');

    var filteredsample = samples.filter(samples => samples.id == id);
    var filteredmetadata = metadata.filter(metadata => metadata.id == id);

    var sample_values=filteredsample[0].sample_values.slice(0,10).reverse();
    var sample_values_bubble=filteredsample[0].sample_values;

    var otu_ids=filteredsample[0].otu_ids.slice(0,10).reverse();
    var otu_ids_bubble=filteredsample[0].otu_ids;

    var otu_labels=filteredsample[0].otu_labels;

    var wfreq = filteredmetadata[0].wfreq;

    var barTrace={
        y: otu_ids.map(id=>`OTU ${id}`), 
        x: sample_values,
        type: 'bar', 
        orientation: 'h'
    };
      
    var barLayout={
        title: `Bacteria Cultures Found in ${id}`
    };

    Plotly.newPlot('bar', [barTrace], barLayout);

    var bubbleTrace = {
        x: otu_ids_bubble,
        y: sample_values_bubble,
        mode: 'markers',
        text: otu_labels,
        marker: {
          color: otu_ids,
          size: sample_values.map(sample_value=>sample_value*.6), 
          colorscale: 'Earth'
      }
    };

    var bubbleLayout={
        xaxis: {title: "OTU ID"}
    };

    Plotly.newPlot('bubble', [bubbleTrace], bubbleLayout);

    var gaugetrace = [
      {
        domain: { x: [0, 1], y: [0, 1] },
        value: wfreq,
        title: { text: "Belly Button Washing Frequency" },
        type: "indicator",
        mode: "gauge+number"
      }
    ];
    
    var gaugelayout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
    Plotly.newPlot('gauge', gaugetrace, gaugelayout);

  });
};

function demogs(id) {
  d3.json("samples.json").then((data) => {
    var selector = d3.select('#selDataset');

    var demographics = data.metadata;
    var id = selector.property('value');

    var filtereddemographic = demographics.filter(demographics => demographics.id == id);

    var keys = Object.keys(filtereddemographic[0])
    var metaSelector = d3.select('#sample-metadata');
    metaSelector.html('');

    keys.forEach((key) => {
      metaSelector.append('h6')
                  .text(`${key}: ${filtereddemographic[0][key]}`)
    });
  });
};

function init() {
  var data = d3.json("samples.json").then((data) => {
    var ids = data.names;

    var selector = d3.select('#selDataset');

    ids.forEach(name => {
      selector.append("option")
              .property("value", name)
              .text(name);
    });

    var id = selector.property('value');

    chartbuilder(id);
    demogs(id);
  });
};

d3.selectAll("#selDataset").on("change", optionChanged);

function optionChanged() {
  // Use D3 to select the dropdown menu
  var dropdownMenu = d3.select("#selDataset");
  // Assign the value of the dropdown menu option to a variable
  var id = dropdownMenu.property("value");

  chartbuilder(id);
  demogs(id);

};

init();