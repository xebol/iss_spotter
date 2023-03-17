// const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

// fetchISSFlyOverTimes({ longitude: -112.84184, lat: 49.69349 }, (error, data) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }
//   console.log('Response', data);
// });


// fetchCoordsByIP('75.156.150.9', (error, data) => {
//   if (error) {
//     console.log('error', error);
//     return
//   }
//   console.log('data', data);
// });
// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }
//   console.log('It worked! Returned IP:' , ip);
// });



const { nextISSTimesForMyLocation } = require('./iss');

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!

  passTimes.forEach( (element) => { 
    console.log(`Next pass at ${new Date(element.risetime)} for ${element.duration} seconds!`)
  })
});