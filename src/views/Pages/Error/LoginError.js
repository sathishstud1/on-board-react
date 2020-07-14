import React, { Component } from 'react';
import { Button, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

class Page404 extends Component {
  /*
  <InputGroup className="input-prepend">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="fa fa-search"></i>
                  </InputGroupText>
                </InputGroupAddon>
                <Input size="16" type="text" placeholder="What are you looking for?" />
                <InputGroupAddon addonType="append">
                  <Button color="info">Search</Button>
                </InputGroupAddon>
              </InputGroup>
  */
  render() {
    const errorObj = this.props.location.errorObj;
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <div className="clearfix">
                <h1 className="float-left display-3 mr-4">{errorObj.response.status}</h1>
                <h4 className="pt-3">Oops! There is some issue.</h4>
                <p className="text-muted float-left">{errorObj.message}</p>
                <p className="text-muted float-left">Error Occured at: {errorObj.response.data.timestamp}</p>
               
              </div>
              <div className="clearfix">
                <p className="pt-3">To Login: <a href="/login">Click Here</a></p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Page404;
