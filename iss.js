// iss.js 
const request = require('request');

/**
 * Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
 * Input:
 *   - A callback with an error or results. 
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly-over times as an array (null if error):
 *     [ { risetime: <number>, duration: <number> }, ... ]
 */ 
const nextISSTimesForMyLocation = function(callback) {
  // empty for now
  const address = "https://api.ipify.org/?format=json";
  request(address, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const data = JSON.parse(body).ip;
    console.log(data);
    fetchCoordsByIP(data, callback);
  })
};

const fetchCoordsByIP = function(ip, callback) {
  const ipAddress = `https://ipvigilante.com/json/${ip}`;
  request(ipAddress, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching Coordinates by IP provided. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const { latitude, longitude } = JSON.parse(body).data;
    console.log({ latitude, longitude });
    fetchISSFlyOverTimes({ latitude, longitude }, callback);
  })
};

const fetchISSFlyOverTimes = function(coords, callback) {
  const apiISS = `http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`;
  request(apiISS, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching ISS passes data. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const passes = JSON.parse(body).response;
    callback(null,passes);
  })
};



/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
/*
const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  const address = "https://api.ipify.org/?format=json";
  request(address, (error, response, body) => {

    // inside the request callback ...
    // error can be set if invalid domain, user is offline, etc.
    if (error) {
      callback(error, null);
      return;
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    // if we get here, all's well and we got the data
    const data = JSON.parse(body).ip;
    callback(null, data);

    // if (response.statusCode === 200) {
    //   const data = JSON.stringify(body);
    //   callback(error, data);
    // } else {

    // }
  });
};

const fetchCoordsByIP = function(ip, callback) {
  const addressIp = `https://ipvigilante.com/json/${ip}`;
  request(addressIp, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    // if we get here, all's well and we got the data
    let datas = {};
    datas["latitude"] = JSON.parse(body).data.latitude;
    datas["longitude"] = JSON.parse(body).data.longitude;
    callback(null, datas);
  });

};

  *
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 *
const fetchISSFlyOverTimes = function(coords, callback) {
  // ...
  const apiRequest = `http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`;
  request(apiRequest, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching ISS passes data. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const passes = JSON.parse(body).response;
    callback(null,passes);
  })
};
*/

// module.exports = { fetchMyIP };
// module.exports = { fetchCoordsByIP };
// module.exports = { fetchISSFlyOverTimes };
module.exports = { nextISSTimesForMyLocation };