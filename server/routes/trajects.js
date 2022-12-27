// Importing stuff we need to make an express router.
const express = require("express"); // express module
const router = express.Router(); // router module
const fs = require("fs"); // file read/write actions

// retrieving all data (needed for more calls, so we get that here).
let raw = fs.readFileSync(__dirname + "/../data.json");
const data = JSON.parse(raw);

/**
 * Method: GET
 * Request: "/api/trajects/:station"
 * Description: Gets all possible trajects from given station.
 */
router.get("/api/trajects/", (req, res) => {
  const requestedStation = req.query.station;

  let stops = [];
  // check wether given station is one of the stops in a traject, if so add to response.
  data.trajects.map((traject) => {
    traject.stops.map((stop) => {
      stops.push(stop.station);
    });
  });

  // setting a response and sending to the client.
  let response = {
    response: stops,
  };
  res.send(response);
});

// Exporting the module so it can be used in the index.
module.exports = router;
