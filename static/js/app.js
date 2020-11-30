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
  console.log(Rparty);

console.log(chairs[0]);
console.log(chairs[0].Candidate);

//Propagating Table Row Data from chairs
//next is drop down to switch to table row data from ranking
var arrObj = [chairs];

  for (i = 0; i < arrObj.length; i++) {
    d3.select('tbody')
      .selectAll('tr')
      .data(arrObj[i])
      .enter()
      .append('tr')
      .html(function (d) {
        return `<td>${d.Candidate}</td><td>${d.State_Abbrv}</td><td>${d.Candidate_Votes}</td><td>${d.Committee}</td><td>${d.Contributions}</td>`;
      });
  }

  //Call Bar Graph
  //function (t1_xVals, t1_yVals, t2_xVals, t2_yVals, t1_Name, t2_Name, title, divID)
  createBar(CfullName, Ccontrib, 'Chair Members', RfullName, Rcontrib, 'R_Members', 'Contributions', 'contribBar');
  //Call Scatter Plot
  createScatter(Ccontrib, Cvotes, 'Chairs', Rcontrib, Rvotes, 'R_Members', 'contribCor');

//Getting Percentages for Donut Chairs
console.log(Cvotes);
var sumC = 0;
for (var i=0; i<Cvotes.length; i++){
  sumC += parseInt(Cvotes[i]);
}
var Cavg = sumC/Cvotes.length;
console.log(`Avg: ${Cavg}`);
console.log(`Sum: ${sumC}`);

var votePercentC = [];
function roundUp(num, places) {
  places = Math.pow(10, places)
  return Math.ceil(num * places) / places
}

for (var i = 0; i<Cvotes.length; i++){
  var holder = Cvotes[i]/sumC*100;
  votePercentC.push(roundUp(holder, 0));
};
//Getting Percentages for Donut Ranking
console.log(Rvotes);
var sumR = 0;
for (var i=0; i<Rvotes.length; i++){
  sumR += parseInt(Rvotes[i]);
}
var Ravg = sumR/Rvotes.length;
console.log(`Avg: ${Ravg}`);
console.log(`Sum: ${sumR}`);

var votePercentR = [];
function roundUp(num, places) {
  places = Math.pow(10, places)
  return Math.ceil(num * places) / places
}

for (var i = 0; i<Rvotes.length; i++){
  var holder = Rvotes[i]/sumR*100;
  votePercentR.push(roundUp(holder, 0));
};

console.log(`Vote Percents: ${votePercentR}`);
console.log(`Vote Percents: ${votePercentC}`);
// console.log(roundUp(192.168, 0));

createDonut(votePercentC, CfullName, 'Chair Vote %', 'Chairs', 'pieChairs');
createDonut(votePercentR, RfullName, 'Ranking Member %', 'R_Members', 'pieRanking');



//alert prints on screen
//alert(roundNum(3.163303562250186, 2));

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






const createScatter = function (t1_xVals, t1_yVals, t1_Name, t2_xVals, t2_yVals, t2_Name, divID) {
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
  var layout = {
    title: 'Contributions($$) to Votes'
  };
  //calling scatter plot
  Plotly.newPlot(divID, data, layout);
};


//////
const createDonut = function (values, labels, title, ctrTxt, divID) {
  var data = [{
    values: values,
    labels: labels,
    domain: {
      column: 0
    },
    // name: tipName,
    hoverinfo: 'label+percent+name',
    hole: .4,
    type: 'pie'
  }];

  var layout = {
    title: title,
    annotations: [{
      font: {
        size: 20
      },
      showarrow: false,
      text: ctrTxt,
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
    legend: {
      "orientation": "h"
    },
    grid: {
      rows: 0,
      columns: 0
    },
  };
  // Calling pie chart
  Plotly.newPlot(divID, data, layout);
}


//Pie Chart
// var data = [{
//   values: [16, 15, 12, 6, 5, 4, 42],
//   labels: ['US', 'China', 'European Union', 'Russian Federation', 'Brazil', 'India', 'Rest of World'],
//   domain: {
//     column: 0
//   },
//   name: 'GHG Emissions',
//   hoverinfo: 'label+percent+name',
//   hole: .4,
//   type: 'pie'
// }];

// var layout = {
//   title: 'Global Emissions 1990-2011',
//   annotations: [{
//     font: {
//       size: 20
//     },
//     showarrow: false,
//     text: 'CO2',
//     //loc of center text
//     x: .50,
//     y: .53
//   }],
//   height: 300,
//   width: 300,
//   margin: {
//     "t": 0,
//     "b": 0,
//     "l": 0,
//     "r": 0
//   },
//   showlegend: false,
//   legend: {"orientation": "h"},
//   grid: {
//     //makes the donut smaller
//     rows: 0,
//     columns: 0
//   },
// };
// // Calling pie chart
// Plotly.newPlot('pieChairs', data, layout);