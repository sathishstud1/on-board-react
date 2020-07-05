import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Badge, Card, CardBody, CardHeader, Col, Row, Table } from "reactstrap";

import CustomerOnboard from "./ProductOnboard";
import productOnboardJson from "../../assets/data/productOnboard.json";

class Products extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardBody>
                <CustomerOnboard json={productOnboardJson} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Products;
