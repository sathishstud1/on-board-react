import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Badge, Card, CardBody, CardHeader, Col, Row, Table } from "reactstrap";

import productsData from "./ProductsData";

function ProductRow(props) {
  const product = props.product;
  const productLink = `/products/${product.id}`;

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
    <tr key={product.id.toString()}>
      <th scope="row">
        <Link to={productLink}>{product.id}</Link>
      </th>
      <td>
        <Link to={productLink}>{product.name}</Link>
      </td>
      <td>{product.registered}</td>
      <td>{product.role}</td>
      <td>
        <Link to={productLink}>
          <Badge color={getBadge(product.status)}>{product.status}</Badge>
        </Link>
      </td>
    </tr>
  );
}

class Products extends Component {
  render() {
    const productList = productsData.filter((product) => product.id < 10);

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={6}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Products{" "}
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
                    {productList.map((product, index) => (
                      <ProductRow key={index} product={product} />
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

export default Products;
