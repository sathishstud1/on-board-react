import React, { Component } from "react";
import {  Card, CardBody, Col, Row } from "reactstrap";

import ProductOnboard from "../../GlobalComponents/Onboard";
import productOnboardJson from "../../assets/data/productOnboard.json";

class Products extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardBody>
                <ProductOnboard json={productOnboardJson} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Products;
