// index.js
const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

fetchISSFlyOverTimes({ latitude: '49.26200', longitude: '-123.09230' }, (error, data) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }
  console.log("It worked! Passing data: ", data);
});

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