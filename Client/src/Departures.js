import React from "react";
import { Container, FormGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Row, Col } from "react-bootstrap";
import "react-bootstrap-typeahead/css/Typeahead.css";
import {} from "@ant-design/icons/lib/components/twoTonePrimaryColor";

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import { Button } from "@mui/material";
import TrajectTimeline from "./TrajectTimeline";

const Departures = (props) => {
  const [isClickedDepartureTime, setIsClickedDepartureTime] =
    React.useState(false);
  const [departureData, setDepartureData] = React.useState({ departures: [] });

  React.useEffect(() => {
    fetch(
      "http://localhost:3001/api/departures/" +
        "?station=" +
        props.from[0] +
        "&hours=" +
        props.hours +
        "&minutes=" +
        props.minutes
    )
      .then((res) => res.json())
      .then((departureData) => {
        setDepartureData(departureData);
      });
  }, [props.from, props.hours, props.minutes]);

  const timeTableBuilder = () => {
    const list = departureData.departures.flatMap((departure) =>
      departure.minutes.map(
        (minute) =>
          `${String(departure.hours).padStart(2, "0")}:${String(
            minute
          ).padStart(2, "0")}`
      )
    );

    const listItems = list.map((listItem) => {
      return (
     
        <ListItem disablePadding
       >
         <center> <ListItemButton     class="row justify-content-center"

    
          
          onClick={() => setIsClickedDepartureTime(true)}>
            <Button 
    style={{
      fontSize: "30px",
      fontWeight: "bold",
      color: "#08958A",
    }} 
            ><center> {listItem}</center> </Button>
          </ListItemButton></center>
        </ListItem>
      );
    });
    return listItems;
  };

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
            &nbsp;
              <h2
               
                style={{
                  fontSize: "30px",
                  fontWeight: "bold",
                  color: "#08958A",
                }}
              >
                Select een vertrektijd
              </h2>
            </Row>
          </Col>
        </FormGroup>
        <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
          <nav aria-label="departure list">
            <List>{timeTableBuilder()}</List>
          </nav>
        </Box>

        <Col>
          {isClickedDepartureTime && (
            <TrajectTimeline from={props.from} to={props.to} />
          )}
        </Col>
      </Container>
    </div>
  );
};

export default Departures;
