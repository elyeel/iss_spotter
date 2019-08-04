const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss_promised');

const translateDate = function(dateObj) {
  for (let timeStamp of dateObj) {
    const date = new Date(0);
    date.setUTCSeconds(timeStamp.risetime);
    console.log(`Next pass at ${date} for ${timeStamp.duration} seconds!`);
  }
}

fetchMyIP()
  .then(fetchCoordsByIP)
  .then(fetchISSFlyOverTimes)
  .then(body => {
    const passes = JSON.parse(body).response;
    translateDate(passes);
    })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });