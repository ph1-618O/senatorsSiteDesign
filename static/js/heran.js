

var mean = [2032956.0, 2092005.0, 1946799.5, 4112152.0, 2699725.5, 5989317.5, 3320832.0, 3758603.5, 3162049.0, 1594225.5, 3281789.0, 3112687.5, 3675112.0, 4525577.0, 2481615.5, 5377286.5, 2240173.0, 7719033.5, 6735534.5, 6866791.0, 4363762.5, 4903450.5, 22124314.0, 6991370.0, 5864915.0, 11055827.5, 4250447.0, 15507955.0, 9892348.0, 15044964.5, 9878596.0, 5652954.5, 10599059.0, 4832109.5, 9086105.5, 8635975.0, 3098283.5, 3558218.0, 6123855.0, 12022149.5]
var dropdownMenu = d3.select("#Dropdown11");

function fiteredby_party(party) {
  // console.log(party)

  //main function
  Promise.all([
    d3.csv('../static/data/chairs.csv'),
    d3.csv('../static/data/ranking.csv'),
    d3.csv('../static/data/combined.csv'),
    d3.csv('../static/data/newcombined.csv'),

  ]).then(function (files) {
    chairs = files[0];
    // console.log(chairs)
    ranking = files[1];
    // console.log(ranking)
    combined = files[2]
    combined_new = files[3]

    console.log(party)
    //  New Combined Senators Data for scatter
    CNpartyvotespercent = [];
    var i = 0;
    for (i = 0; i < combined_new.length; i++) {
      console.log(combined_new[i]);
      CNpartyvotespercent.push(combined_new[i].Vote_Share);
    }


    // Combined Senators Data  
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
      // Avotes.push(combined[i].Vote_Share);
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
      // Cvotes.push(chairs [i].Vote_Share);
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
      // Rvotes.push(ranking[i].Vote_Share);
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

    //Color and party onditions for Donut toggle 
    /////////////////////////////////////////////JEN 12/15/20 652AM -  I switched back the colors and party to match, it flipped on mine and this works??///////////////////////////////////
    if (party == "Democrat") {
      console.log(party)
      makeTable(chairs);////REDS
      var partyColors = ['#F04C4C', '#E84A4B', '#DF4849', '#D74747','#CE4546', '#C64344', '#BE4242', '#B64041', '#AE3E3F', '#A63C3D', '#9E3B3B', '#96393A', '#8E3738', '#863536', '#7E3334', '#763232', '#6F3030', '#672E2E', '#5F2C2C', '#582A2A']
      //   'rgb(72, 0, 0)',
      //   'rgb(80,0,0)',
      //   'rgb(88, 0, 0)',
      //   'rgb(96, 0, 0)',
      //   'rgb(104, 0, 0)',
      //   'rgb(112, 0, 0)',
      //   'rgb(120, 0, 0)',
      //   'rgb(128, 0, 0)',
      //   'rgb(136, 0, 0)',
      //   'rgb(144, 0, 0)',
      //   'rgb(152, 0, 0)',
      //   'rgb(168, 0, 0)',
      //   'rgb(176, 0, 0)',
      //   'rgb(184, 0, 0)',
      //   'rgb(192, 0, 0)',
      //   'rgb(200, 0, 0)',
      //   'rgb(232, 0, 0)',
      //   'rgb(240, 0, 0)',
      //   'rgb(248, 0, 0)',
      //   'rgb(255, 0, 0)']
        
      
/////////////////////////////////////////////JEN 12/15/20 652AM -  I switched back the colors and party to match, it flipped on mine and this works??///////////////////////////////////
      createDonut(votePercentC, CfullName, 'Chair Vote %', 'Chairs', 'pieChairs', partyColors);
    } else if (party == "Republican") {
      makeTable(ranking);///BLUES
      var partyColors = ['#4878A6','#4674A1','#44719C', '#416D97', '#3F6A93', '#3D668E', '#3B6389', '#396084', '#375C80', '#35597B', '#335576', '#315272', '#2F4F6D', '#2D4B68', '#2B4864', '#294560', '#27425B', '#253E57', '#233B52', '#21384E']
        //'rgb(0,0,233)',
      //   'rgb(0,0,229)',
      //   'rgb(0,0,224)',
      //   'rgb(0,0,213)',
      //   'rgb(0,0,209)',
      //   'rgb(0,0,193)',
      //   'rgb(0,0,188)',
      //   'rgb(0,0,168)',
      //   'rgb(0,0,162)',
      //   'rgb(0,0,139)',
      //   'rgb(0,0,107)',
      //   'rgb(0,0,100)',
      //   'rgb(0,0,73)',
      //   'rgb(0,0,66)',
      //   'rgb(0,0,35)',
      //   'rgb(0,0,43)',
      //   'rgb(0,0,66)',
      //   'rgb(0,0,35)',
      //   'rgb(0,0,43)'
      //]
/////////////////////////////////////////////JEN 12/15/20 652AM -  End Changes///////////////////////////////////

      var partyColors = 
      createDonut(votePercentR, RfullName, 'Ranking Member %', 'Ranking', 'pieChairs', partyColors);
    } else {
      makeTable(combined);/////PURPLES

      var partyColors = ['#FA6E6E',
        '#F66B70',
        '#F26872',
        '#EE6574', '#EA6275',
        '#E56077', '#E15D79', '#DC5B7A',
        '#D7597B', '#D2577C', '#CD557D',
        '#C8547E', '#C3527F', '#BD517F',
        '#BD517F', '#B84F80', '#B24E80', '#AC4D80', 
        '#A64C80', '#A14B80', '#9B4980', '#95487F', '#8F477E', '#89467E', '#89467E', '#83457D', '#7D447B', '#77437A', '#714278', '#714278', '#6B4177', '#664075', '#603F73', '#5A3E71', '#543D6F', '#4F3B6C', '#493A6A', '#443967', '#3E3764', '#393661', '#34345E', '#2F335B', '#2A3158']
      createDonut(votePercentA, AfullName, 'All Votes %', 'All Senators', 'pieChairs', partyColors);

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
      .html(function (d) {////////////////////////////////////////////////////////////
        return `<td>${d.Candidate}</td><td>${d.State_Abbrv}</td><td>${d.Candidate_Votes}</td><td>${d.Vote}</td><td>${d.Committee}</td><td>${d.Categories}</td><td>${d.Contributions}</td>`;
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

  // var trace3 = {
  //   x: t1_xVals,
  //   y: t1_yVals,
  //   mode: 'lines',
  //   type: 'line',
  //   name: 'Chair V/$$'
  // };

  // var trace4 = {
  //   x: t2_xVals,
  //   y: t2_yVals,
  //   mode: 'lines',
  //   type: 'scatter',
  //   name: 'Chair V/$$'
  // };



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
  //   type: 'lines',
  //   name: 'Ranking V/$$'
  // };

  var data = [trace1, trace2];
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

var sub;




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
        size: 10,
        family: 'Helvetica'////////////JEN CHANGES 12/15/20 657AM//////////////////////
      },
      showarrow: false,
      text: ctrTxt,
      textposition: 'inside',
      insidetextfont:{
        family: 'Helvetica',
        size: 5,
      },
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
    textfont: 'Helvetica',
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



