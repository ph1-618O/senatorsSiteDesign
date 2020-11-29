// //Format needed for files
// d3.json("/static/data/votersinfo.json").then(function (data) {
//   console.log(data);
// });

Promise.all([
  d3.json("../static/data/consolidated_Chairs.json"),
  d3.json("../static/data/consolidated_Ranking.json")
]).then(function (files) {
  //testing promise
  // console.log(files[0]);
  // console.log(files[1]);

  //getting data from chair_members.json

  // for (const [key, value] of Object.entries(files[0])){
  //     console.log(`${key}: ${value}`)
  // }
  //Names, Last Name Chairs
  data1 = files[0];
  data2 = files[1];
  console.log(files[0]);
  console.log(files[1]);
  var chairNames = files[0].Candidate;
  console.log("chairNames");
  console.log(chairNames);
  var chairLastName = files[0].Last_Name;
  console.log("chairLastName");
  console.log(chairLastName);
  var chairParty = files[0].Party;
  console.log("Cparty");
  console.log(chairParty);

  //Getting Chairs Voting data
  var chairVotes = files[0].Candidate_Votes;
  console.log("ChairVotes");
  console.log(chairVotes);
  console.log(typeof chairVotes);
  console.log(typeof chairVotes[0]);
  //Getting sum total of all chair votes
  function sum(obj){
    return Object.keys(obj).reduce((sum, key) => sum + parseFloat(obj[key]||0),0);
  }
  console.log(`sum:${sum(chairVotes)}`);

  //Getting top 10 highest votes of chair votes
  //This returns an array of indexes
  function indexValue(o, n){
    var keys=Object.keys(o);
    keys.sort(function(a,b){
      return o[b] - o[a];
    })
    console.log(keys);
    return keys.slice(0, n);
  }
  console.log(indexValue(chairVotes, 10));
  var indexList = indexValue(chairVotes, 10)
  var maxVotes = [];
  for(var i=0; i < indexList.length; i++){
    maxVotes.push(chairVotes[indexList[i]]);
  }
  console.log(maxVotes);
  var maxVoteNames = [];
  for(var i=0; i < indexList.length; i++){
    maxVoteNames.push(chairNames[indexList[i]]);
  }

  console.log(maxVoteNames);

  var maxVoteAll = [];
  for(var i=0; i < indexList.length; i++){
      var entry = Object.entries(files[0])[i]
      maxVoteAll.push(entry);
  }

  console.log(maxVoteAll);


  console.log(chairVotes[11]);
  console.log(chairVotes[10]);
  console.log(chairVotes[6]);
  var totalChairVotes = files[0].Total_Votes;
  console.log("totalChairVotes");
  console.log(totalChairVotes);
  var stateChairs = files[0].State;
  console.log("stateChairs");
  console.log(stateChairs);
  var chairsCommittee = files[0].Committee;
  console.log("chairsCommittee")
  console.log(chairsCommittee);
  var chairContributions = files[0].Contributions;
  console.log("chair contributions")
  console.log(chairContributions);
  let chairArr = [chairNames, chairVotes, chairVotes, stateChairs, chairsCommittee];
  const chair = {
    chairNames,
    chairLastName,
    chairVotes,
    totalChairVotes,
    stateChairs,
    chairsCommittee,
    chairContributions
  };
  //Names, Last Name Ranking
  var rankingNames = files[1].Candidate;
  console.log("rankingNames");
  console.log(rankingNames);
  var rankingLastName = files[1].Last_Name;
  console.log("rankingLastName");
  console.log(rankingLastName);
  var rankingParty = files[1].Party;
  console.log("Rparty");
  console.log(rankingParty);

  //Getting Ranking Voting Data
  var rankingVotes = files[1].Candidate_Votes;
  console.log("rankingVotes");
  console.log(rankingVotes);
  console.log(`sum:${sum(rankingVotes)}`);
  var totalRankingVotes = files[1].Total_Votes;
  console.log("totalRankingVotes");
  console.log(totalRankingVotes);
  var stateRanking = files[1].State;
  console.log("stateRanking");
  console.log(stateRanking);
  var rankingCommittee = files[1].Committee;
  console.log("rankingCommittee")
  console.log(rankingCommittee);
  var rankingContributions = files[1].Contributions;
  console.log("ranking contributions")
  console.log(rankingContributions);
  let rankingArr = [rankingNames, rankingLastName, rankingVotes, totalRankingVotes, stateRanking, rankingCommittee, rankingContributions];

  const ranking = {
    rankingNames,
    rankingLastName,
    rankingVotes,
    totalRankingVotes,
    stateRanking,
    rankingCommittee
  };
  //Reformatting JSON from CSV to a complex object/dictionary
  function objectDeepKeys(obj) {
    return Object.keys(obj).filter(key => obj[key] instanceof Object).map(key => objectDeepKeys(obj[key]).map(k => `${key}.${k}`)).reduce((x, y) => x.concat(y), Object.keys(obj))
  }
  console.log(objectDeepKeys(data1));
  var keys = objectDeepKeys(data1).slice(0, 11);
  console.log(keys);

  // function sum(arr){
  //   const reducer = (sum, val) => sum + val;
  //   const initialValue = 0;
  //   return arr.reduce(reducer, initialValue);
  // }
  // console.log(sum(chairVotes));




  // d3.select("tbody")
  // .selectAll("tr")
  // .data(austinWeather)
  // .enter()
  // .append("tr")
  // .html(function(d) {
  //   return `<td>${d.date}</td><td>${d.low}</td><td>${d.high}</td>`;
  // });


  //Bubble Chart

  // var trace1 = {
  //   x: ['Lindsay Graham', 'Chuck Grassley','Jim Inhofe', 'Richard Shelby'],
  //   y: [1240075,1541036,820733,208744],
  //   text: ['A<br>size: 40', 'B<br>size: 60', 'C<br>size: 80', 'D<br>size: 100'],
  //   mode: 'markers',
  //   marker: {
  //     color: ['rgb(93, 164, 214)', 'rgb(255, 144, 14)',  'rgb(44, 160, 101)', 'rgb(255, 65, 54)'],
  //     size: [6.72941,9.26007,5.88166,13.35104]
  //   }
  // };

  // var trace2 = {
  //   x: ['Patrick Leahy', 'Jack Reed', 'Ron Wyden','Dione Feinstein'],
  //   y: [320467, 316898, 1952478, 11113364],
  //   text: ['A<br>size: 40', 'B<br>size: 60', 'C<br>size: 80', 'D<br>size: 100'],
  //   mode: 'markers',
  //   marker: {
  //     color: ['rgb(93, 164, 214)', 'rgb(255, 144, 14)',  'rgb(44, 160, 101)', 'rgb(255, 65, 54)'],
  //     size: [1.92243,2.23675,11.05119,60.19422]
  //   }
  // };

  // var data = [trace1, trace2];

  // var layout = {
  //   title: 'State total votes VS Candidate Vote',
  //   showlegend: false,
  //   height: 600,
  //   width: 600
  // };

  // Plotly.newPlot('USA_Map', data, layout);


  // //Bar Graph Data
  //   var topRcontributions = rankingContributions.slice(0, 10).reverse()
  //   console.log(topRcontributions)
  // var dataParse = JSON.parse(data1)
  // console.log(dataParse)
  // var top10 = data1.sort(function(a, b){return a.Variable1 <b.Variable1 ? 1 : -1;}).slice(0, 10);
  // console.log(top10)

  ////Bar Graph
  var trace1 = {
    x: ['Lindsay Graham(SC)', 'Chuck Grassley(IA)', 'Jim Inhofe(OK)', 'Richard Shelby(AL)'],
    y: [11873431, 9883101, 4646940, 4141799],
    type: 'bar',
    name: 'Chair Members $$'
  };

  var trace2 = {
    x: ['Diane Feinstein(CA)', 'Ron Wyden(OR)', 'Jack Reed(RI)', 'Patrick Leahy(VT)'],
    y: [16092233, 4408613, 13705548, 4940984, ],
    type: 'bar',
    name: 'Ranking Members $$'
  };

  var data = [trace1, trace2];

  var layout = {
    title: 'Chair and Ranking Member Contributions',
    showlegend: false
  };

  Plotly.newPlot('TotalContributions', data, layout, {
    displayModeBar: false
  });
  //Scatter Chart
  var trace1 = {
    x: [1335104, 926007, 672941, 588166],
    y: [4141799, 9883101, 11873431, 4646940],
    mode: 'markers',
    type: 'scatter',
    name: 'Chair V/$$',
  };

  var trace2 = {
    x: [1335104, 926007, 672941, 588166],
    y: [4141799, 9883101, 11873431, 4646940],
    mode: 'lines',
    type: 'scatter',
    name: 'Chair V/$$'
  };

  var trace3 = {
    x: [192243, 1105119, 6019422, 223675],
    y: [4940984, 13705548, 1602233, 4408613],
    mode: 'markers',
    type: 'scatter',
    name: 'Ranking V/$$'
  };

  var trace4 = {
    x: [192243, 1105119, 6019422, 223675],
    y: [4940984, 13705548, 1602233, 4408613],
    mode: 'lines',
    type: 'scatter',
    name: 'Ranking V/$$'
  };

  var data = [trace1, trace2, trace3, trace4];

  Plotly.newPlot('HighestContributions', data);




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

  Plotly.newPlot('PieChart', data, layout);

  //end of promise function
}).catch(function (error) {
  console.log(error);
  //end of error catching function
});

// var array = [4, 5, 6, 7, 8];
// var singleVal = 0;
// // Only change code below this line.

// singleVal = array.reduce(function (prev, cur) {
//   return prev + cur;
// });

// (function () {
//   return (singleVal);
// })();