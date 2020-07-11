import React, { Component } from "react";
import { Card, CardBody, Col, Row } from "reactstrap";
import Onboard from "../../GlobalComponents/Onboard";
import importJson from "../../assets/data/businessOnboard.json";

class Business extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardBody>
                <Onboard json={importJson} isUpdate={false} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Business;
