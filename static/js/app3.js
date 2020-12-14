
var dropdownMenu = d3.select("#Dropdown11");

function fiteredby_party(party) {
// console.log(party)

//main function
Promise.all([
  d3.csv('../static/data/consolidated_Chairs.csv'),
  d3.csv('../static/data/consolidated_Ranking.csv'),
  d3.csv('../static/data/combined.csv'),
]).then(function (files) {
  chairs = files[0];

  ranking = files[1];
  combined = files[2]

  // console.log(party)


// Combined Data  
  AfullName = [];
  Avotes = [];
  Acommittee = [];
  Acontrib = [];
  AfirstName = [];
  AlastName = [];
  Aparty = [];
  Astate = [];
  AstateAbbr = [];
  AstateVotesTot = [];

  var i = 0;
  for (i = 0; i < combined.length; i++) {
    console.log(combined[i]);
    Aparty.push(combined[i].Party);
    AfullName.push(combined[i].Candidate);
    AfirstName.push(combined[i].Last_Name);
    AlastName.push(combined[i].First_Name);
    AstateAbbr.push(combined[i].State_Abbrv);
    Avotes.push(combined[i].Candidate_Votes);
    Astate.push(combined[i].State);
    AstateVotesTot.push(combined[i].Total_Votes);
    Acontrib.push(combined[i].Contributions);
  };
// End Combined Data 
  
// Chair Data 
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
// End Chair Data 
  
// Ranking Data 
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
  // End Ranking Data 

  console.log(Rparty);

  console.log(chairs[0]);
  console.log(chairs[0].Candidate);



  //Making Charts
  //Call Bar Graph
  //function (t1_xVals, t1_yVals, t2_xVals, t2_yVals, t1_Name, t2_Name, title, divID)
  createBar(CfullName, Ccontrib, 'Chair Members', RfullName, Rcontrib, 'R_Members', 'Contributions', 'contribBar');
  //Call Scatter Plot
  createScatter(Ccontrib, Cvotes, 'Chairs', Rcontrib, Rvotes, 'R_Members', 'contribCor');

  //Getting Percentages for Donut Chairs
  console.log(Cvotes);
  var sumC = 0;
  for (var i = 0; i < Cvotes.length; i++) {
    sumC += parseInt(Cvotes[i]);
  }
  var Cavg = sumC / Cvotes.length;
  console.log(`Avg: ${Cavg}`);
  console.log(`Sum: ${sumC}`);

  var votePercentC = [];

  function roundUp(num, places) {
    places = Math.pow(10, places)
    return Math.ceil(num * places) / places
  }

  for (var i = 0; i < Cvotes.length; i++) {
    var holder = Cvotes[i] / sumC * 100;
    votePercentC.push(roundUp(holder, 0));
  };
  //Getting Percentages for Donut Ranking
  console.log(Rvotes);
  var sumR = 0;
  for (var i = 0; i < Rvotes.length; i++) {
    sumR += parseInt(Rvotes[i]);
  }

  var Ravg = sumR / Rvotes.length;
  console.log(`Avg: ${Ravg}`);
  console.log(`Sum: ${sumR}`);

  var votePercentR = [];
  
  function roundUp(num, places) {
    places = Math.pow(10, places)
    return Math.ceil(num * places) / places
  }

  for (var i = 0; i < Rvotes.length; i++) {
    var holder = Rvotes[i] / sumR * 100;
    votePercentR.push(roundUp(holder, 0));
  };

  // Getting Percentages for Combined  Donut
  console.log(Avotes);
  var sumA = 0;
  for (var i = 0; i < Avotes.length; i++) {
    sumA += parseInt(Avotes[i]);
  }

  var Aavg = sumA / Avotes.length;
  console.log(`Avg: ${Aavg}`);
  console.log(`Sum: ${sumA}`);

  var votePercentA = [];

  function roundUp(num, places) {
    console.log(num)
    places = Math.pow(10, places)
    return Math.ceil(num * places) / places
  }

  for (var i = 0; i < Avotes.length; i++) {
    var holder = Avotes[i] / sumA * 100;
    votePercentA.push(roundUp(holder, 0));
  };
  // end heran 

  // console.log(`Vote Percents: ${votePercentR}`);
  // console.log(`Vote Percents: ${votePercentC}`);
  // console.log(roundUp(192.168, 0));

  //Condition for Donut toggle 
  if (party == "Democrat") {
    console.log(party)
    makeTable(ranking);

    var partyColors = ['rgb(0,0,233)',
      'rgb(0,0,224)',
      'rgb(0,0,213)',
      'rgb(0,0,209)',
      'rgb(0,0,193)',
      'rgb(0,0,188)',
      'rgb(0,0,168)',
      'rgb(0,0,162)',
      'rgb(0,0,139)',
      'rgb(0,0,107)',
      'rgb(0,0,100)',
      'rgb(0,0,73)',
      'rgb(0,0,66)',
      'rgb(0,0,35)',
      'rgb(0,0,43)'

    ]
    createDonut(votePercentC, CfullName, 'Chair Vote %', 'Chairs', 'pieChairs',partyColors);
  } else if (party == "Republican") {
    makeTable(chairs);

    var partyColors = ['rgb(233, 0, 0)',
      'rgb(224, 0, 0)',
      'rgb(213, 0, 0)',
      'rgb(209, 0, 0)',
      'rgb(193, 0, 0)',
      'rgb(188, 0, 0)',
      'rgb(168, 0, 0)',
      'rgb(162, 0, 0)',
      'rgb(139, 0, 0)',
      'rgb(107, 0, 0)',
      'rgb(100, 0, 0)',
      'rgb(73, 0, 0)',
      'rgb(66, 0, 0)',
      'rgb(35, 0, 0)',
      'rgb(43, 0, 0)'

    ]
    createDonut(votePercentR, RfullName, 'Ranking Member %', 'Ranking', 'pieChairs', partyColors);
  } else {
    makeTable(combined);

    var partyColors = ['rgb(0,0,233)',
      'rgb(0,0,224)',
      'rgb(0,0,213)',
      'rgb(0,0,209)',
      'rgb(0,0,193)',
      'rgb(0,0,188)',
      'rgb(0,0,168)',
      'rgb(0,0,162)',
      'rgb(0,0,139)',
      'rgb(0,0,107)',
      'rgb(0,0,100)',
      'rgb(0,0,73)',
      'rgb(0,0,66)',
      'rgb(0,0,35)',
      'rgb(0,0,43)',
      'rgb(224, 0, 0)',
      'rgb(213, 0, 0)',
      'rgb(209, 0, 0)',
      'rgb(193, 0, 0)',
      'rgb(188, 0, 0)',
      'rgb(168, 0, 0)',
      'rgb(162, 0, 0)',
      'rgb(139, 0, 0)',
      'rgb(107, 0, 0)',
      'rgb(100, 0, 0)',
      'rgb(73, 0, 0)',
      'rgb(66, 0, 0)',
      'rgb(35, 0, 0)',
      'rgb(43, 0, 0)'

    ]
    createDonut(votePercentA, AfullName, 'All Votes %', 'All Senators', 'pieChairs',partyColors);

  }


// // Create Color for Donut 
//   function chooseColor(party) {
//     switch (party) {
//       case "Democrat":
//         return ["blue"]
    
//       case "Republican":
//         return "red"
    
//     }
//   }
//   chooseColor()
  

  //alert prints on screen
  //alert(roundNum(3.163303562250186, 2));



}).catch(function (err) {
  //show error
  console.log(err)
});
//end main function
}
fiteredby_party("All Senators")


//Propagating Table Row Data from chairs
//next is drop down to switch to table row data from ranking
const makeTable = function (data) {
  var arrObj = [data];
  d3.select("tbody").html("")
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
}

//Bar Graph Func
const createBar = function (t1_xVals, t1_yVals, t1_Name, t2_xVals, t2_yVals, t2_Name, title, divID) {
  var trace1 = {
    x: t1_xVals,
    y: t1_yVals,
    type: 'bar',
    name: t1_Name,
    marker: {
      color: 'rgb(174 18 58)' //'rgb(233, 29, 14)' //chairs
    }
  };

  var trace2 = {
    x: t2_xVals,
    y: t2_yVals,
    type: 'bar',
    name: t2_Name,
    marker: {
      color: 'rgb(72, 120, 166)', //'rgb(35, 32, 102)'
    }
  };

  var data = [trace1, trace2];

  var layout = {
    title: title,
    showlegend: true,
    width: 700,
    height: 500,
    yaxis: {
      title: {
        text: 'Dollars',
        tickfont: 10,

      },
    },
    xaxis: {
      title: {
        text: 'Senators',
        // standoff: 20,
      },
      tickangle: 30,
      // showdividers: true,
      // dividercolor: 'grey',
      // dividerwidth: 1,
      showticklabels: false,
      tickfont: {
        size: 10
      },
    },
    margin: {
      l: 50,
      r: 50,
      b: 100,
      t: 100,
      pad: 4
    }
  };

  Plotly.newPlot(divID, data, layout, {
    displayModeBar: true
  });
}


const createScatter = function (t1_xVals, t1_yVals, t1_Name, t2_xVals, t2_yVals, t2_Name, divID) {
  //Scatter
  var trace1 = {
    x: t1_xVals,
    y: t1_yVals,
    // mode: 'lines+markers',
    mode: 'markers',
    type: 'scatter',
    marker: {
      color: 'rgb(174 18 58)', //'rgb(233, 29, 14)', //color hex republican red
      size: 8
    },
    name: t1_Name
  };

  var trace3 = {
    x: [3242360],
    y: [0],
    mode: 'lines',
    type: 'scatter',
    name: 'Chair V/$$'
  };

  var trace2 = {
    x: t2_xVals,
    y: t2_yVals,
    // mode: 'lines+markers',
    mode: 'markers',
    type: 'scatter',
    marker: {
      color: 'rgb(72, 120, 166)', //'rgb(35, 32, 102)', //democrat blue
      size: 8
    },
    name: t2_Name
  };

  // var trace4 = {
  //   x: [192243, 1105119, 6019422, 223675],
  //   y: [4940984, 13705548, 1602233, 4408613],
  //   mode: 'lines',
  //   type: 'scatter',
  //   name: 'Ranking V/$$'
  // };

  var data = [trace1, trace2, trace3];
  var layout = {
    title: 'Contributions($$) to Votes',
    width: 700,
    height: 500,
    // margin: {
    //   l: 50,
    //   r: 50,
    //   b: 100,
    //   t: 100,
    //   pad: 4
    // },
    yaxis: {
      title: {
        text: 'Votes',
        tickfont: 10,

      },
    },
    xaxis: {
      title: {
        text: 'Dollars',
        standoff: 20
      },
      tickangle: 30,
      // tickfont: {
      //   size: 15
      // },
    },
    // xaxis: {
    //   type: 'log',
    //   autorange: true
    // },
    // yaxis: {
    //   type: 'log',
    //   autorange: true
    // }
  };
  //calling scatter plot
  Plotly.newPlot(divID, data, layout);
};


var files 

// getData()

// dropdownMenu.on("change", fiteredby_party)

var sub;

// Create condition for color 
// function senateColr{
//   if (party == "Democrat") {
//     color = "blue"

//   } else if (party == "Republican") {
//   color = "red" } else {

//   }
// }


// // //////plot donut
const createDonut = function (values, labels, title, ctrTxt, divID, partyColors) {
  console.log(values)
  var data = [{
    values: values,
    labels: labels,
    domain: {
      column: 0
    },
    // automargin: true,
    // name: tipName,
    hoverinfo: 'label+percent+name ',
    hole: .3,
    type: 'pie',
    marker: {
      colors:  
       partyColors
    },
  }];

  var layout = {
    title: title,
    annotations: [{
      font: {
        size: 10
      },
      showarrow: false,
      text: ctrTxt,
      textposition: 'inside',
      x: .50,
      y: .53
    }],
    height: 400,
    width: 400,
    margin: {
      "t": -15,
      "b": -15,
      "l": 0,
      "r": 0
    },
    showlegend: false,
    legend: {
      "orientation": "h"
    },
    grid: {
      rows: 10,
      columns: 0
    },
  };
  // Calling pie chart
  Plotly.newPlot(divID, data, layout);
}

// ////update on click

// // var select = d3.select('.pieButton');

// // select.on('click', function(){
// //   selectedVal= select.property("value")
// //   data=data.filter()
// //   createDonut(data)
// // })

// // function defaultFunction() {
// //   d3.json("Senators", function (error, newdata) {
// //     if (error) throw error;
// //     data = newdata;
// //     data.forEach(function (d) {
// //       d.value = +d.value;
// //     })
// //     update();
// //   });
// // }


// // function updateFunction() {
// //   d3.json("Ranking Members", function (error, newdata) {
// //     if (error) throw error;
// //     data = newdata;
// //     update();
// //   });
// // }



// // function update(err, newdata) {
// //   y.domain([0, d3.max(data, function (d) {
// //     return d.value;
// //   })]);

// //   x.domain(data.map(function (d) {
// //       return d.name
// //     }))
// //     .padding([0.5]);
// // }

// //////


//Lin regress

const linRegress = function (y, x) {
  var lr = {};
  var n = y.length;
  var sumX, sumY, sumXY, sumXX, sumYY;
  sumX = sumY = sumXY = sumXX = sumYY = 0;

  for (var i = 0; i < y.length; i++) {
    sumX += x[i];
    sumY += y[i];
    sumXY += (x[i] * y[i]);
    sumXX += (x[i] * x[i]);
    sumYY += (y[i] * y[i]);
  }
  lr['slope'] = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
  lr['intercept'] = (sumY - lr.slope * sumX) / n;
  lr['r2'] = Math.pow((n * sumXY - sumX * sumY) / Math.sqrt((n * sumXX - sumX * sumX) * (n * sumYY - sumY * sumY)), 2);

  return lr;
};

//votes
var pointsY = [460350,
  558166,
  121554,
  285596,
  850087,
  672941,
  1335104,
  449017,
  138149,
  926007,
  1378458,
  4835191,
  732376,
  547619,
  136210,
  1125999
];

//contributions
var pointsX = [8040544,
  4841285,
  3772045,
  2902855,
  8201067,
  11056889,
  4890271,
  5875081,
  6058418,
  9828566,
  15893492,
  25254738,
  6617848,
  6568817,
  7380997,
  18631193
];

var lr = linRegress(pointsY, pointsX);
console.log(lr);

// // const getBestFit = function(pointsY, pointsX) {
// //   let holder = [];
// //   for (var i = 0; i < pointsY.length; i++){
// //     holder.push()

// //   }
// //     return y = mx + b
// // }


// // for (var i = 0; i < y.length; i++) {

$(window).bind('resize', function (e) {
  if (window.RT) clearTimeout(window.RT);
  window.RT = setTimeout(function () {
    this.location.reload(false); /* false to get page from cache */
  }, 100);
});