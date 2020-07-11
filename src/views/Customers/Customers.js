import React, { Component } from 'react';
import { Card, CardBody, Col, Row} from 'reactstrap';
import CustomerOnboard from "../../GlobalComponents/Onboard";
import customerOnboardJson from "../../assets/data/customerOnboard.json";

class Customers extends Component {

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardBody>
                <CustomerOnboard json={customerOnboardJson} isUpdate={false}/>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Customers;
