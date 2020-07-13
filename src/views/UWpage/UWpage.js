import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Badge, Card, CardBody, CardHeader, Col, Row, Table } from "reactstrap";

import businessesData from "./UWData";

function BusinessesRow(props) {
  const businesses = props.businesses;
  const businessesLink = `/businesses/${businesses.id}`;

  const getBadge = (status) => {
    return status === "Active"
      ? "success"
      : status === "Inactive"
      ? "secondary"
      : status === "Pending"
      ? "warning"
      : status === "Banned"
      ? "danger"
      : "primary";
  };

  return (
    <tr key={businesses.id.toString()}>
      <th scope="row">
        <Link to={businessesLink}>{businesses.id}</Link>
      </th>
      <td>
        <Link to={businessesLink}>{businesses.name}</Link>
      </td>
      <td>{businesses.registered}</td>
      <td>{businesses.role}</td>
      <td>
        <Link to={businessesLink}>
          <Badge color={getBadge(businesses.status)}>{businesses.status}</Badge>
        </Link>
      </td>
    </tr>
  );
}

class Businesses extends Component {
  render() {
    const businessesList = businessesData.filter(
      (businesses) => businesses.id < 10
    );

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={6}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Businessess{" "}
                <small className="text-muted">example</small>
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope="col">id</th>
                      <th scope="col">name</th>
                      <th scope="col">registered</th>
                      <th scope="col">role</th>
                      <th scope="col">status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {businessesList.map((businesses, index) => (
                      <BusinessesRow key={index} businesses={businesses} />
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Businesses;
