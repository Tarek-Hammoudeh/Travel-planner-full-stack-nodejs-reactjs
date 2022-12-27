import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Container, Row, Col, Form } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import DateTime from "./DateTimepicker";
import SwitchButton from "./SwitchButton";
import RoutePlanner from "./RoutePlanner";
import logo from "./images/ovapp-logo.png"

function VertrekBesteming(props) {
  const [data, setData] = React.useState({ stations: [] });
  const [routeVisble, setRouteVisble] = React.useState(false);
  // Variabelen om de waarde van de input velden in op te slaan.
  const [selectedFrom, setSelectedFrom] = React.useState([]);
  const [selectedTo, setSelectedTo] = React.useState([]);
  const [isClickedPlannerButton, setIsClickedPlannerButton] =
    React.useState(false);

  const [hours, setHours] = React.useState();
  const [minutes, setMinutes] = React.useState();

  React.useEffect(() => {
    setRouteVisble(false);
  }, [selectedFrom, selectedTo]);

  // Verkrijgen van de data van de backend (In dit geval bestaande stations)
  React.useEffect(() => {
    fetch("http://localhost:3001/api/stations")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  },[] );

  const handleSwitchButtonClick = (e) => {
    e.preventDefault();
    setSelectedFrom(selectedTo);
    setSelectedTo(selectedFrom);
  };

  return (
    <div className="VertrekBesteming">
      <Container>
        <Row>
          <Col>
            <h1 className="text-center" style={{
              fontSize: "50px",
              fontWeight: "bold",
              color: "#08958A",
            }}>
              <img src={logo} className="logo" alt="" />
              
            </h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form>
              {/* Form element 1 --> invoer gewenste opstap en tijd */}
              <Form.Group className="mb-3" controlId="formBasicEmail">
                {/* Opstap locatie */}
                <Form.Label
                  style={{
                    fontSize: "30px",
                    fontWeight: "bold",
                    color: "#08958A",
                  }}
                >
                  Vertrekstation
                </Form.Label>
                <Typeahead
                  id="from"
                  onChange={setSelectedFrom}
                  options={data.stations}
                  placeholder="Van ..."
                  selected={selectedFrom}
                  limit="4"
                />
              </Form.Group>
              <Form.Group>
                <div class="col text-center">
                  <SwitchButton onClick={handleSwitchButtonClick} />
                </div>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label
                  style={{
                    fontSize: "30px",
                    fontWeight: "bold",
                    color: "#08958A",

                  }}
                >
                  Aankomststation
                </Form.Label>
                <Typeahead
                  id="to"
                  onChange={setSelectedTo}
                  options={data.stations}
                  placeholder="Naar ..."
                  selected={selectedTo}
                />
                <Form.Label
                  style={{
                    fontSize: "30px",
                    fontWeight: "bold",
                    color: "#08958A",
                  }}
                >
                  Gewenste vertrektijd
                </Form.Label>
              </Form.Group>
              <DateTime
                onChangeHours={setHours}
                onChangeMinutes={setMinutes}
                isClickedPlannerButtonState={isClickedPlannerButton}
                onChangeDateTime={setIsClickedPlannerButton}
              />
              <Row
                style={{
                  fontSize: "30px",
                  fontWeight: "bold",
                  color: "#08958A",
                }}
              >
                <RoutePlanner
                  from={selectedFrom}
                  to={selectedTo}
                  hours={hours}
                  minutes={minutes}
                  isClickedPlannerButtonState={isClickedPlannerButton}
                  onChangeDateTime={setIsClickedPlannerButton}
                  
                />
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default VertrekBesteming;
