// Including needed dependencies.
const express = require("express");
const cors = require("cors");

// Configuring the used port for the api.
const PORT = process.env.PORT || 3001;

// initializing the app.
const app = express();

// Implementing cors to be able to reach the frontend.
app.use(cors());

// implementing the routers.
const stationsRouter = require("./routes/stations");
const trajectRouter = require("./routes/trajects");
const departuresRouter = require("./routes/departures");

app.use(stationsRouter);
app.use(trajectRouter);
app.use(departuresRouter);

// On every request do this.
app.use((req, res, next) => {
  console.log("Time: ", Date.now());
  next();
});

// starting the app.
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
