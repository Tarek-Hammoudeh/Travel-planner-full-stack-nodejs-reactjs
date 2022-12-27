import React from "react";

import { Row, Col, Container, FormGroup } from "react-bootstrap";

import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

const TrajectTimeline = (props) => {
  const [stopsData, setStopsData] = React.useState({ response: [] });


  React.useEffect(() => {
    fetch("http://localhost:3001/api/trajects/?station=" + props.from)
      .then((res) => res.json())
      .then((stopsData) => {
        setStopsData(stopsData);
      });
  }, [props.from]);
  let stopsList = [];

  const stopTimelineElement = () => {
   

    let stopsFrom = stopsData.response.indexOf(props.from[0]);
    let stopsTo = stopsData.response.indexOf(props.to[0]);
if(stopsFrom<stopsTo){
    for (let i = stopsFrom; i <= stopsTo; i++) {
      stopsList.push(stopsData.response[i]);
    }}else
    { for (let i = stopsFrom; i >= stopsTo; i--) {
      stopsList.push(stopsData.response[i]);
    }}
    console.log(stopsList);

    let stopItems = stopsList.map((stopItem) => {
      return (
     
       
        <VerticalTimelineElement position="left" 
          className="vertical-timeline-element--work"
          contentStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
          contentArrowStyle={{ borderRight: "7px solid  rgb(33, 150, 243)" }}
          date=""
          iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
          icon={""}
        >
          <h4 className="vertical-timeline-element-subtitle">{stopItem}</h4>
        </VerticalTimelineElement>
     
      );
    });

    return<div>{stopItems}</div> 
  };

  return (
    <div>
      <Container>
        <FormGroup>
    <Col>
      <Row>
        <h2
          class="row justify-content-center"
      style={{
        fontSize: "30px",
        fontWeight: "bold",
        color: "#08958A",
      }}
        >
          Timeline
        </h2>
      </Row>
      <VerticalTimeline>{stopTimelineElement()}</VerticalTimeline>
    </Col>
    </FormGroup>
    </Container>
    </div>


  );
};

export default TrajectTimeline;
