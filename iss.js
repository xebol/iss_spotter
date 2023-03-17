const request = require('request');


const fetchMyIP = (callback) => {

  const API = 'https://api.ipify.org?format=json';
  request(API, (error, response, body) => {
    if (error) {
      callback(error);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response ${body}`;
      callback(Error(msg), null);
    }
    const data = JSON.parse(body);
    callback(null, data.ip);
  });
};


const fetchCoordsByIP = (ip, callback) => {

  const url = `http://ipwho.is/${ip}`;
  request(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    const data = JSON.parse(body);
    const coords = {
      longitude: data.longitude,
      latitude: data.latitude
    };
    callback(null, coords);
  });

};


const fetchISSFlyOverTimes = function(coords, callback) {

  const url = `https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;
  request(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    };
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching ISS pass times: ${body}`;
      callback(Error(msg), null);
    };

    const data = JSON.parse(body);
    const riseTimedata = data.response;

    callback(null, riseTimedata);
  });
};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error1, ip) => {
    if (error1) {
      return callback(error1);
    }
    fetchCoordsByIP(ip, (error2, coords) => {
      if (error2) {
        return callback(error2);
      }
      fetchISSFlyOverTimes(coords, (error3, data) => {
        if (error3) {
          return callback(error3);
        }
        callback(null, data)
      })
    });
  });
};


module.exports = { nextISSTimesForMyLocation };