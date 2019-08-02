/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const request = require('request');

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
  const addressIp = `https://ipvigilante.com/${ip}`;
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
  })

}

module.exports = { fetchMyIP };
module.exports = { fetchCoordsByIP };