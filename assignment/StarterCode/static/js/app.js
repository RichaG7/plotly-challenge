// Fetch the JSON data and console log it
df_json = "samples.json"

function init() {
  var data = df_json[0];
  console.log(data);

  var sample = data.samples;
  console.log(sample)

  var sample_values=sample.sample_values.slice(0, 10).reverse();
  var otu_ids=sample.otu_ids.slice(0, 10).reverse();
  var otu_labels=sample.otu_labels

  var sample_values_bubble = sample.sample_values
  var otu_ids_bubble = sample.otu_ids
 
  var id = data.names;
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
      color: otu_ids_bubble,
      size: sample_values_bubble.map(sample_value=>sample_value*.6), 
      colorscale: 'Earth'
    }
  };

  var bubbleLayout={
    xaxis: {title: "OTU ID"}
  };

  Plotly.newPlot('bubble', [bubbleTrace], bubbleLayout);

};

d3.json(df_json).then((data) => {
  var ids = data.names;

  var selector = d3.select('#selDataset');

  ids.forEach(name => {
    selector.append("option")
            .property("value", name)
            .text(name);
  });
});

function onchange() {
  id = selector.property('value')
  d3.select('body').append('select')
};

function chartbuilder(id) {
  d3.json(df_json).then((data) => {
    var samples = data.samples;

    var filteredsample = samples.filter(samples => samples.id == id);

    var sample_values=filteredsample.sample_values.slice(0, 10).reverse();
    var otu_ids=filteredsample.otu_ids.slice(0, 10).reverse();
    var otu_labels=filteredsample.otu_labels

    var sample_values_bubble = filteredsample.sample_values
    var otu_ids_bubble = filteredsample.otu_ids
     
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
          color: otu_ids_bubble,
          size: sample_values_bubble.map(sample_value=>sample_value*.6), 
          colorscale: 'Earth'
      }
    };

    var bubbleLayout={
        xaxis: {title: "OTU ID"}
    };

    Plotly.newPlot('bubble', [bubbleTrace], bubbleLayout);

  });

};

  
function demogs(id) {
  d3.json(df_json).then((data) => {
    var demographics = data.metadata;

    var filtereddemographic = demographics.filter(demographics => demographics.id == id);

    var keys = Object.keys(filtereddemographic)
    var metaSelector = d3.select('#sample-metadata');
      
    console.log(keys);
    console.log(filtereddemographic);
    metaSelector.html('');

    keys.forEach((key) => {
      metaSelector.append('h6')
                  .text(`${key}: ${filtereddemographic[key]}`)
    });
  });
};

function optionChanged() {

  d3.json(df_json).then((data) => {
      data.names.forEach()
  })      
}; 