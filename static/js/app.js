Promise.all([
  d3.csv('../static/data/consolidated_Chairs.csv'),
  d3.csv('../static/data/consolidated_Ranking.csv'),
]).then(function (files) {
  chairs = files[0];
  ranking = files[1];


  CfullName = [];
  Cvotes = [];
  Ccommittee = [];
  Ccontrib = [];
  CfirstName = [];
  ClastName = [];
  Cparty = [];
  Cstate = [];
  CstateAbbr = [];
  CstateVotesTot = [];

  var i = 0;
  for (i = 0; i < chairs.length; i++) {
    // console.log(chairs[i]);
    Cparty.push(chairs[i].Party);
    CfullName.push(chairs[i].Candidate);
    CfirstName.push(chairs[i].Last_Name);
    ClastName.push(chairs[i].First_Name);
    CstateAbbr.push(chairs[i].State_Abbrv);
    Cvotes.push(chairs[i].Candidate_Votes);
    Cstate.push(chairs[i].State);
    CstateVotesTot.push(chairs[i].Total_Votes);
    Ccontrib.push(chairs[i].Contributions);
  };
  console.log(CfullName);

  RfullName = [];
  Rvotes = [];
  Rcommittee = [];
  Rcontrib = [];
  RfirstName = [];
  RlastName = [];
  Rparty = [];
  Rstate = [];
  RstateAbbr = [];
  RstateVotesTot = [];

  var i = 0;
  for (i = 0; i < ranking.length; i++) {
    // console.log(chairs[i]);
    Rparty.push(ranking[i].Party);
    RfullName.push(ranking[i].Candidate);
    RfirstName.push(ranking[i].Last_Name);
    RlastName.push(ranking[i].First_Name);
    RstateAbbr.push(ranking[i].State_Abbrv);
    Rvotes.push(ranking[i].Candidate_Votes);
    Rstate.push(ranking[i].State);
    RstateVotesTot.push(ranking[i].Total_Votes);
    Rcontrib.push(ranking[i].Contributions);
  };

  // d3.select("tbody")
  // .selectAll("tr")
  // .data(austinWeather)
  // .enter()
  // .append("tr")
  // .html(function(d) {
  //   return `<td>${d.date}</td><td>${d.low}</td><td>${d.high}</td>`;
  // });

  //Call Bar Graph
//function (t1_xVals, t1_yVals, t2_xVals, t2_yVals, t1_Name, t2_Name, title, divID)
  createBar(CfullName, Ccontrib, 'Chair Members', RfullName, Rcontrib,  'R_Members', 'Contributions', 'contribBar');
  //Call Scatter Plot
  createScatter(Ccontrib, Cvotes, 'Chairs', Rcontrib, Rvotes, 'R_Members', 'contribCor');






}).catch(function (err) {
  //show error
  console.log(err)
});



//Bar Graph Func
const createBar = function (t1_xVals, t1_yVals, t1_Name, t2_xVals, t2_yVals, t2_Name, title, divID) {
  var trace1 = {
    x: t1_xVals,
    y: t1_yVals,
    type: 'bar',
    name: t1_Name
  };

  var trace2 = {
    x: t2_xVals,
    y: t2_yVals,
    type: 'bar',
    name: t2_Name
  };

  var data = [trace1, trace2];

  var layout = {
    title: title,
    showlegend: true
  };

  Plotly.newPlot(divID, data, layout, {
    displayModeBar: false
  });
}






const createScatter = function(t1_xVals, t1_yVals, t1_Name, t2_xVals, t2_yVals, t2_Name, divID){
  //Scatter
  var trace1 = {
    x: t1_xVals,
    y: t1_yVals,
    mode: 'lines+markers',
    type: 'scatter',
    name: t1_Name
  };
  
  // var trace2 = {
  //   x: [1335104, 926007, 672941, 588166],
  //   y: [4141799, 9883101, 11873431, 4646940],
  //   mode: 'lines',
  //   type: 'scatter',
  //   name: 'Chair V/$$'
  // };
  
  var trace2 = {
    x: t2_xVals,
    y: t2_yVals,
    mode: 'lines+markers',
    type: 'scatter',
    name: t2_Name
  };
  
  // var trace4 = {
  //   x: [192243, 1105119, 6019422, 223675],
  //   y: [4940984, 13705548, 1602233, 4408613],
  //   mode: 'lines',
  //   type: 'scatter',
  //   name: 'Ranking V/$$'
  // };
  
  var data = [trace1, trace2];
  var layout = {title: 'Contributions($$) to Votes'};
  //calling scatter plot
  Plotly.newPlot(divID, data, layout);
};










///
//Scatter Chart
// var trace1 = {
//   x: [1335104, 926007, 672941, 588166],
//   y: [4141799, 9883101, 11873431, 4646940],
//   mode: 'markers',
//   type: 'scatter',
//   name: 'Chair V/$$',
// };

// var trace2 = {
//   x: [1335104, 926007, 672941, 588166],
//   y: [4141799, 9883101, 11873431, 4646940],
//   mode: 'lines',
//   type: 'scatter',
//   name: 'Chair V/$$'
// };

// var trace3 = {
//   x: [192243, 1105119, 6019422, 223675],
//   y: [4940984, 13705548, 1602233, 4408613],
//   mode: 'markers',
//   type: 'scatter',
//   name: 'Ranking V/$$'
// };

// var trace4 = {
//   x: [192243, 1105119, 6019422, 223675],
//   y: [4940984, 13705548, 1602233, 4408613],
//   mode: 'lines',
//   type: 'scatter',
//   name: 'Ranking V/$$'
// };

// var data = [trace1, trace2, trace3, trace4];
// //calling scatter plot
// Plotly.newPlot('HighestContributions', data);

/////End scatter plot


//Pie Chart
var data = [{
  values: [16, 15, 12, 6, 5, 4, 42],
  labels: ['US', 'China', 'European Union', 'Russian Federation', 'Brazil', 'India', 'Rest of World'],
  domain: {
    column: 0
  },
  name: 'GHG Emissions',
  hoverinfo: 'label+percent+name',
  hole: .4,
  type: 'pie'
}];

var layout = {
  title: 'Global Emissions 1990-2011',
  annotations: [{
    font: {
      size: 20
    },
    showarrow: false,
    text: 'CO2',
    x: .50,
    y: .53
  }],
  height: 300,
  width: 300,
  margin: {
    "t": 0,
    "b": 0,
    "l": 0,
    "r": 0
  },
  showlegend: false,
  grid: {
    rows: 0,
    columns: 0
  },
};
// Calling pie chart
Plotly.newPlot('PieChart', data, layout);