// index.js

const { nextISSTimesForMyLocation } = require('./iss');

nextISSTimesForMyLocation((error, passTimes) => {
  console.time('Getting Results');
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  translateDate(passTimes);
  console.timeEnd('Getting Results');
  // console.log(passTimes);
});

const translateDate = function(dateObj) {
  for (let timeStamp of dateObj) {
    const date = new Date(0);
    date.setUTCSeconds(timeStamp.risetime);
    console.log(`Next pass at ${date} for ${timeStamp.duration} seconds!`);
  }

}


// const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

// fetchISSFlyOverTimes({ latitude: '49.26200', longitude: '-123.09230' }, (error, data) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }
//   console.log("It worked! Passing data: ", data);
// });

// fetchCoordsByIP('162.245.144.188', (error, data) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }
  
//   console.log("It worked! Returned Coords:", data);
// });

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });