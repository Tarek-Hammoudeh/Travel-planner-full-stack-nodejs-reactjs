import React from "react";
import { Container, FormGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Row, Col } from "react-bootstrap";
import "react-bootstrap-typeahead/css/Typeahead.css";
import {} from "@ant-design/icons/lib/components/twoTonePrimaryColor";
import Departures from "./Departures";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

const RoutePlanner = (props) => {
  const [myStops, setMyStops] = React.useState([]);
  const [data, setData] = React.useState({ stations: [] });

  React.useEffect(() => {
    fetch("http://localhost:3001/api/stations")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  },[] );


  let stops = [];
  let filterFrom = data.stations.indexOf(props.from[0]);
  let filterTo = data.stations.indexOf(props.to[0]);
  if (filterFrom < filterTo) {
    for (let i = filterFrom; i < filterTo; i++) {
      i !== filterFrom && stops.push(data.stations[i]);
    }
  }
  else {
    for (let i = filterFrom; i > filterTo; i--) {
      i !== filterFrom && stops.push(data.stations[i]);
    }
  }

  function planner() {
    props.onChangeDateTime(true);
  }


  function saveStorag() {
    if (stops.length !== 0) {
      localStorage.setItem("Start", JSON.stringify(props.from))
      localStorage.setItem("End", JSON.stringify(props.to))
      localStorage.setItem("Stop", JSON.stringify(stops))
    }
  }

  function removeStorage() {
    localStorage.clear();
  }

  function showStop() {
    let stop = JSON.parse(localStorage.getItem("Stop"));
    let start = JSON.parse(localStorage.getItem("Start"));
    let end = JSON.parse(localStorage.getItem("End"));
    return (
      <div>
        <center>
          <h2>Uw laatste Traject is:</h2>
        </center>
        &nbsp;
        <center>
          <h3>Start Station is : &nbsp; {start}</h3>
        </center>
        <center>
          <h2>Tussen Stops zijn:</h2>
        </center>
        <center>
        <ol style={{ listStyleType: 'upper-roman' }}>
            <li> {stop}</li>
            
          </ol>
          
         
         
        </center>
        <center>
          <h3>Ende Station is : &nbsp; {end}</h3>
        </center>
        
      </div>
    );
  }

  return (
    <div
      class="row justify-content-center"
      style={{
        fontSize: "30px",
        fontWeight: "bold",
        color: "#08958A",
      }}
    >
      <Container>
        <FormGroup>
          <Col>
            <Row>
              <h2
                style={{
                  fontSize: "30px",
                  color: "#08958A",
                }}
              >
                Gewenste route
              </h2>
              <button
                type="button"
                class="btn btn-primary btn-lg"
                onClick={planner}
              >
                Plan Uw Route Hier
              </button>
              {props.isClickedPlannerButtonState && (
                <Departures
                  from={props.from}
                  to={props.to}
                  hours={props.hours}
                  minutes={props.minutes}
                />
              )}
              &nbsp; &nbsp;
              <button
                type="button"
                class="btn btn-primary btn-lg"
                onClick={saveStorag}
              >
                Save Route
              </button>
              &nbsp;
              <button
                type="button"
                class="btn btn-primary btn-lg"
                onClick={(e) => setMyStops(showStop)}
              >
                Show saved route
              </button>
              <ListItem>              {myStops}
</ListItem>
              &nbsp;
              <button
                type="button"
                class="btn btn-primary btn-lg"
                onClick={removeStorage}
              >
                Removed saved route
              </button>
            </Row>
          </Col>
        </FormGroup>
      </Container>
    </div>
  );
};

export default RoutePlanner;
