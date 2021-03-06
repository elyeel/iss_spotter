const request = require('request-promise-native');

const fetchMyIP = function() {
  return request("https://api.ipify.org/?format=json");
};

const fetchCoordsByIP = function(body) {
  const ip = JSON.parse(body).ip;
  return request(`https://ipvigilante.com/json/${ip}`);
};

const fetchISSFlyOverTimes = function(body) {
  const {latitude, longitude} = JSON.parse(body).data;
  const apiISS = `http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`;
  return request(apiISS);
}

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };