import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import {verifyGoogleLogin} from "../../../store/authentication/acions";
import {connect} from "react-redux";
import GoogleLogin from "react-google-login";
import axios from "../../../axios-instance";

class Login extends Component {

  async verifyToken(tokenId) {
    let postData = {
      id_token: tokenId,
    };
    axios
      .post("/verifyGoogleLogin", postData)
      .then((response) => {
        if (response.data.status) {
          this.props.history.push("/dashboard");
        }
      })
      .catch((error) => {
        this.props.history.push({
          pathname: '/error_page',
          errorObj: error,
        });
      });
  }

  verifyProfile(profileObj) {
      if (this.props.profileObj && this.props.profileObj.tokenId) {
        this.verifyToken(this.props.profileObj.tokenId);
      }  
  }
  render() {
    this.verifyProfile(this.props.profileObj);
    
    const props = this.props;
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="Username" autoComplete="username" />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" placeholder="Password" autoComplete="current-password" />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <a href={'./dashboard'} className="btn btn-primary px-4">Login</a>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">Forgot password?</Button>
                        </Col>
                        <Col xs="12" className="text-center mt-4">
                          <GoogleLogin
                            clientId="1020592783279-dib7nfhpbecp4gluf277pkj072shfqaj.apps.googleusercontent.com"
                            buttonText="Login with Google"
                            theme="dark"
                            onSuccess={googleLoginResponse => props.verifyGoogleLogin(googleLoginResponse, props.history, '/dashboard')}
                            cookiePolicy={'single_host_origin'}
                          />
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.</p>
                      <Link to="/register">
                        <Button color="primary" className="mt-3" active tabIndex={-1}>Register Now!</Button>
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.authentication.isAuthenticated,
    profileObj: state.authentication.profileObj
  };
}

const mapDispatchToProps = dispatch => ({
  verifyGoogleLogin: (googleLoginResponse, history, path) => dispatch(verifyGoogleLogin(googleLoginResponse, history, path))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
