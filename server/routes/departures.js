// station parameter
// vertrektijd parameter
// map trajects, map stops, map departures
// filter departures vanaf vertrektijd parameter = response

// Importing stuff we need to make an express router.
const express = require("express"); // express module
const router = express.Router(); // router module
const fs = require("fs"); // file read/write actions

// retrieving all data (needed for more calls, so we get that here).
let raw = fs.readFileSync(__dirname + "/../data.json");
const data = JSON.parse(raw);

/**
 * Description: Gets all departures from given station.
 */

router.get("/api/departures/", (req, res) => {
  const reqStation = req.query.station;
  const reqHours = req.query.hours;
  const reqMinutes = req.query.minutes;

  let departures = [];

  data.trajects.map((traject) => {
    traject.stops.map((stop) => {
      if (stop.station === reqStation) {
        stop.departures.map((hours) => {
          if (hours.hours == reqHours) {
            departures.push(hours);
          }
        });
      }
    });
  });

  // console.log("Lijst met vertrektijden", reqStation, departures);

  // setting a response and sending to the client.
  let response = { departures: departures };

  res.send(response);
});

// Exporting the module so it can be used in the index.
module.exports = router;
