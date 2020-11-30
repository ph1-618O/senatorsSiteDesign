//scratchPad
//The purpose of scratchPad it to hold useful functioning code that may apply in other situations

//
d3.csv("../static/data/consolidated_Chairs.csv").then(function (chairsData) {
    console.log(chairsData);
    console.log(chairsData[0]);
    console.log(chairsData[0].Candidate);
});
console.log('csv');




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
            var chairLastName = files[0].Last_Name;
            var chairParty = files[0].Party;
            var chairVotes = files[0].Candidate_Votes;

            //Reformatting JSON from CSV to a complex object/dictionary
            //object deep keys gets the keys out of a complex object of arrays
            function objectDeepKeys(obj) {
                return Object.keys(obj).filter(key => obj[key] instanceof Object).map(key => objectDeepKeys(obj[key]).map(k => `${key}.${k}`)).reduce((x, y) => x.concat(y), Object.keys(obj))
            }

            // console.log(objectDeepKeys(data1));
            var keys = objectDeepKeys(data1).slice(0, 11);
            console.log(keys);

            //Getting sum total of all chair votes
            function sum(obj) {
                return Object.keys(obj).reduce((sum, key) => sum + parseFloat(obj[key] || 0), 0);
            }

            console.log(`sum chair votes:${sum(chairVotes)}`);

            //Getting top 10 highest votes of chair votes
            //This returns an array of indexes
            function indexValue(o, n) {
                var keys = Object.keys(o);
                keys.sort(function (a, b) {
                    return o[b] - o[a];
                })
                //console.log(keys);
                return keys.slice(0, n);
            }

            //Getting array of indexes with max votes
            console.log('indexes of the highest values');
            // console.log(indexValue(chairVotes, 10));
            var indexList = indexValue(files[0].Candidate_Votes, 10)


            function getData(listJSON, indexList) {
                var matchedData = [];
                for (var i = 0; i < indexList.length; i++) {
                    matchedData.push(listJSON[indexList[i]]);
                }
                return matchedData;
            }
            var maxVotes = getData(files[0].Candidate_Votes, indexList);
            console.log(`Votes : ${maxVotes}`);
            var maxVoteNames = getData(files[0].Candidate, indexList);
            console.log(`Names : ${maxVoteNames}`);
            var maxVoteState = getData(files[0].State_Abbrv, indexList);
            console.log(`StatesAbbr : ${maxVoteState}`);
            var maxVoteCommittee = getData(files[0].Committee, indexList);
            console.log(`Committees : ${maxVoteCommittee}`);
            var maxVoteContrib = getData(files[0].Contributions, indexList);
            console.log(`Contrib/Votes : ${maxVoteContrib}`);
            var maxVoteLast = getData(files[0].Last_Name, indexList);
            console.log(`Contrib/Votes : ${maxVoteLast}`);
            var maxVoteFirst = getData(files[0].First_Name, indexList);
            console.log(`Contrib/Votes : ${maxVoteFirst}`);
            //Creating Max Votes complex object
            //Combines one array from two
            // const votersTableData = function(arr, arr2){
            //   var pushObj =[];
            //   arr.map(function(key, value){
            //   pushObj.push([key, arr2[value]]);
            // });
            //   return pushObj;
            // }
            // tableData = votersTableData(maxVoteLast, maxVotes);
            // console.log(votersTableData(maxVoteLast, maxVotes));

            const votersData = function (arr, arr2, arr3, arr4, arr5, arr6) {
                var pushObj = [];
                arr.map(function (key, value) {
                    pushObj.push([key, arr2[value], arr3[value], arr4[value], arr5[value], arr6[value]]);
                });
                return pushObj;
            }

            console.log(votersData(maxVoteLast, maxVoteFirst, maxVotes, maxVoteContrib, maxVoteCommittee, maxVoteState));
            var maxVotesData = votersData(maxVoteLast, maxVoteFirst, maxVotes, maxVoteContrib, maxVoteCommittee, maxVoteState);
            console.log(maxVotesData);
            console.log(maxVotesData[0]);

            //Print out values for each array at index 0
            maxVotesData[0].forEach(function (entry) {
                console.log(entry);
            });

            const printArrDetail = function (arr) {
                for (var i = 0; i < arr.length; i++) {
                    arr[i].forEach(function (entry) {
                        console.log(entry);
                    });
                }
            }

            // printArrDetail(maxVotesData);

            console.log(maxVotesData[0][0]);

            d3.select('tbody')
                .selectAll('tr')
                .data(maxVotesData)
                .enter()
                .append('tr')
                .html(function (d) {
                    for (var i = 0; i < d.length; i++) {
                        let pushHtml = {};
                        pushHtml.push(`<td>${d.i.i}</td>`)
                    }
                    return pushHtml;
                })

            // const arrayToObj = function(arr, arr2){
            //   var resultObj = {};
            //   arr.forEach((arr, i) => resultObj[arr] = arr2[i]);
            //   return resultObj;
            // }

            // var tableData = arrayToObj(maxVoteLast, maxVotes);
            // console.log(tableData);

            // var tableData = arrayToObj(maxVoteFirst, tableData)
            // console.log(tableData);

            // d3.select("tbody")
            // .selectAll("tr")
            // .data(austinWeather)
            // .enter()
            // .append("tr")
            // .html(function(d) {
            //   return `<td>${d.date}</td><td>${d.low}</td><td>${d.high}</td>`;
            // });


            //Max Votes Table
            // d3.select("tbody")
            // .selectAll("tr")
            // .data(austinWeather)
            // .enter()
            // .append("tr")
            // .html(function(d) {
            //   return `<td>${d.date}</td><td>${d.low}</td><td>${d.high}</td>`;
            // });

            // function createTable(data, columns){
            //   var table = d3.select('body').append('table');
            //   var thead = table.append('thead');
            //   var tbody = table.append('tbody');

            //   thead.append('tr')
            //     .selectAll('th')
            //     .data(columns).enter()
            //     .append("th scope='col'")
            //     .text(function(column){return column;});

            //   var rows = tbody.selectAll('tr')
            //     .data(data)
            //     .enter()
            //     .append('tr');

            //   var cells = rows.selectAll('td')
            //     .data(function(row){
            //       return columns.map(function(column){
            //         return {column: column, value: row[column]};
            //       });
            //     })
            //     .enter()
            //     .append('td')
            //     .text(function(d){return d.value;});

            //     return table;

            // }
            // createTable(data, ['column1', 'column2'])

            var totalChairVotes = files[0].Total_Votes;
            var stateChairs = files[0].State;
            var chairsCommittee = files[0].Committee;
            var chairContributions = files[0].Contributions;

            // let chairArr = [chairNames, chairVotes, chairVotes, stateChairs, chairsCommittee];
            // const chair = {
            //   chairNames,
            //   chairLastName,
            //   chairVotes,
            //   totalChairVotes,
            //   stateChairs,
            //   chairsCommittee,
            //   chairContributions
            // };
            //Names, Last Name Ranking


            //Getting Ranking Voting Data
            var rankingNames = files[1].Candidate;
            var rankingLastName = files[1].Last_Name;
            var rankingParty = files[1].Party;
            var rankingVotes = files[1].Candidate_Votes;
            console.log(`sum:${sum(rankingVotes)}`);
            var totalRankingVotes = files[1].Total_Votes;
            var stateRanking = files[1].State;
            var rankingCommittee = files[1].Committee;
            var rankingContributions = files[1].Contributions;

            // let rankingArr = [rankingNames, rankingLastName, rankingVotes, totalRankingVotes, stateRanking, rankingCommittee, rankingContributions];

            // const ranking = {
            //   rankingNames,
            //   rankingLastName,
            //   rankingVotes,
            //   totalRankingVotes,
            //   stateRanking,
            //   rankingCommittee
            // };





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