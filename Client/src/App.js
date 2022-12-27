import React from "react";
// google map components
import Map from './Map';
// Bootstrap css nodig voor het stylen van bootstrap componenten.
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
// Ipmorteren van benodigde bootstrap elementen.
import { Container, Row, Col, Form } from "react-bootstrap";
import 'react-bootstrap-typeahead/css/Typeahead.css';
import VertrekBesteming from "./VertrekBesteming";



function App() {
  return (
    <div>
      <Container>
        <Row>
          <Col>
            <Form>

              <Form.Group className="DateTimePicker" controlId="formDateTimePicker">

                {/* vertrek en besteming component  */}
                <VertrekBesteming />

              </Form.Group>

            </Form>

          </Col>

        </Row>


        <div >

          &nbsp;
          <Map />

        </div>

        <Form.Group>

        </Form.Group>

      </Container>








    </div>




  );
}
export default App;
