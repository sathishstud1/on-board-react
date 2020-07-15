import React, { Component } from "react";
import { Card, CardBody, Col, Row } from "reactstrap";
import PageLayout from "../../Components/Onboard";

class RouteCustomer extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardBody>
                <PageLayout json={this.props.location.json} isUpdate={false} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default RouteCustomer;
