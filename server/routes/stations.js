// Importing stuff we need to make an express router.
const express = require('express'); // express module
const router = express.Router(); // router module
const fs = require('fs'); // file read/write actions

// retrieving all data (needed for more calls, so we get that here).
let raw = fs.readFileSync(__dirname + "/../data.json");
const data = JSON.parse(raw);
/**
 * Method: GET
 * Request: "/api/stations"
 * Description: This request returns a list of all unique stations within the system.
 */
router.get("/api/stations", (req, res) => {
  // filter all unique stations from all stops per traject.
  let stations = [];
  data.trajects.map((traject) => {
    traject.stops.map((stop) => {
      if(stations.indexOf(stop.station) === -1) {
        stations.push(stop.station);
      }
    });
  });

  // testing value of stations in the console.
  console.log(stations);
  // sending the stations back to the client in a json format.
  let response = { "stations": stations };
  res.send(response);
});
// Exporting the module so it can be used in the index.
module.exports = router;