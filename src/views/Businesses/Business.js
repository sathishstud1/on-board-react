import React, { Component } from "react";
import { Card, CardBody, Col, Row } from "reactstrap";
import PageLayout from "../../GlobalComponents/Onboard";
import importJson from "../../assets/data/businessOnboard.json";

class View extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardBody>
                <PageLayout json={importJson} isUpdate={false} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default View;
