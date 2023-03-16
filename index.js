const { fetchMyIP, fetchCoordsByIP } = require('./iss');


fetchCoordsByIP('75.156.150.9', (error, data) => {
  if (error) {
    console.log('error', error);
    return
  }
  console.log('data', data);
});
// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }
//   console.log('It worked! Returned IP:' , ip);
// });