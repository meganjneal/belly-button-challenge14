 // URL for the Belly Button Biodiversity JSON data  
 const url = "https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json";  
   
 // Initialize the dashboard  
 function init() {  
     // Use D3 to select the dropdown menu  
     let dropdownMenu = d3.select("#selDataset");  
   
     // Fetch the JSON data and console log it  
     d3.json(url).then((data) => {  
         console.log("Data: " + data);  
   
         // An array of id names  
         let names = data.names;  
   
         // Iterate through the names Array  
         names.forEach((name) => {  
             // Append each name as an option to the dropdown menu  
             dropdownMenu.append("option").text(name).property("value", name);  
         });  
   
         // Set the first sample from the list  
         let first_sample = names[0];  
   
         // Log the value of first_sample  
         console.log("First sample: " + first_sample);  
   
         // Build the initial plots  
         buildMetadata(first_sample);  
         buildBarChart(first_sample);  
         buildBubbleChart(first_sample);  
     });  
 }  
   
 // Function that populates metadata info  
 function buildMetadata(sample) {  
     // Fetch the JSON data and console log it  
     d3.json(url).then((data) => {  
         // Get all metadata  
         let metadata = data.metadata;  
   
         // Filter based on the value of the sample  
         let value = metadata.filter(result => result.id == sample);  
   
         // Log the array of metadata objects after the filter  
         console.log("Metadata value: " + value);  
   
         // Get the first index from the array  
         let valueData = value[0];  
   
         // Clear out metadata  
         d3.select("#sample-metadata").html("");  
   
         // Use Object.entries to add each key/value pair to the panel  
         Object.entries(valueData).forEach(([key, value]) => {  
             // Log the individual key/value pairs as they are appended to the metadata panel  
             console.log("Key: " + key + " Value: " + value);  
             d3.select("#sample-metadata").append("h5").text(key + ": " + value);  
         });  
     });  
 }  
   
 // Function that builds the bar chart  
 function buildBarChart(sample) {  
     // Fetch the JSON data and console log it  
     d3.json(url).then((data) => {  
         // Get all sample data  
         let sampleInfo = data.samples;  
   
         // Filter based on the value of the sample  
         let value = sampleInfo.filter(result => result.id == sample);  
   
         // Get the first index from the array  
         let valueData = value[0];  
   
         // Get the otu_ids, labels, and sample values  
         let otu_ids = valueData.otu_ids;  
         let otu_labels = valueData.otu_labels;  
         let sample_values = valueData.sample_values;  
   
         // Log the data to the console  
         console.log("OTU IDs: " + otu_ids);  
         console.log("OTU Labels: " + otu_labels);  
         console.log("Sample Values: " + sample_values);  
   
         // Set top ten items to display in descending order  
         let yticks = otu_ids.slice(0, 10).map(id => "OTU " + id).reverse();  
         let xticks = sample_values.slice(0, 10).reverse();  
         let labels = otu_labels.slice(0, 10).reverse();  
   
         // Set up the trace for the bar chart  
         let trace = {  
             x: xticks,  
             y: yticks,  
             text: labels,  
             type: "bar",  
             orientation: "h"  
         };  
   
         // Setup the layout  
         let layout = {  
             title: "Top 10 OTUs Present"  
         };  
   
         // Call Plotly to plot the bar chart  
         Plotly.newPlot("bar", [trace], layout);  
     });  
 }  
   
 // Function that builds the bubble chart  
 function buildBubbleChart(sample) {  
     // Fetch the JSON data and console log it  
     d3.json(url).then((data) => {  
         // Get all sample data  
         let sampleInfo = data.samples;  
   
         // Filter based on the value of the sample  
         let value = sampleInfo.filter(result => result.id == sample);  
   
         // Get the first index from the array  
         let valueData = value[0];  
   
         // Get the otu_ids, labels, and sample values  
         let otu_ids = valueData.otu_ids;  
         let otu_labels = valueData.otu_labels;  
         let sample_values = valueData.sample_values;  
   
         // Log the data to the console  
         console.log("OTU IDs: " + otu_ids);  
         console.log("OTU Labels: " + otu_labels);  
         console.log("Sample Values: " + sample_values);  
   
         // Set up the trace for bubble chart  
         let trace1 = {  
             x: otu_ids,  
             y: sample_values,  
             text: otu_labels,  
             mode: "markers",  
             marker: {  
                 size: sample_values,  
                 color: otu_ids,  
                 colorscale: "Earth"  
             }  
         };  
   
         // Set up the layout  
         let layout = {  
             title: "Bacteria Per Sample",  
             hovermode: "closest",  
             xaxis: { title: "OTU ID" }  
         };  
   
         // Call Plotly to plot the bubble chart  
         Plotly.newPlot("bubble", [trace1], layout);  
     });  
 }  
   
 // Function that updates the dashboard when a new sample is selected  
 function optionChanged(value) {   
     // Log the new value  
     console.log("Value changed to: " + value);  
   
     // Call all functions to update the dashboard  
     buildMetadata(value);  
     buildBarChart(value);  
     buildBubbleChart(value);  
 }  
   
 // Call the initialize function  
 init();  