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
    callback(null, data);
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
    const coord = { 
      longitude: data.longitude,
      latitude: data.latitude
    }
    callback(null, coord);
  });

};






module.exports = { fetchMyIP, fetchCoordsByIP };