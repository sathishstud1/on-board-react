import React, { Component } from "react";
import { Card, CardBody, CardHeader, Col, Row } from "reactstrap";
import PageLayout from "./PageLayout";
import importJson from "../../assets/data/businessOnboard.json";

class Business extends Component {
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

export default Business;
