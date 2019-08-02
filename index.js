// index.js
const { fetchMyIP, fetchCoordsByIP } = require('./iss');

fetchCoordsByIP('162.245.144.188', (error, data) => {
  console.log(error, data);
  // console.log(data);
}); 

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });