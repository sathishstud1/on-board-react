import React, {Component} from 'react';
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from 'reactstrap';
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import {verifyGoogleLogin} from "../../../store/authentication/acions";
import GoogleLogin from 'react-google-login';

class Register extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      disableCreatAccount: true,
      disableGoogleRegistration: true,
      currentTab: 1,
      roleForGoogle: '',
      form: {
        username: '',
        role: '',
        email: '',
        password: '',
        repeatPassword: '',
      }
    }
    this.updateFormValue = this.updateFormValue.bind(this);
    this.getRolesOptions = this.getRolesOptions.bind(this);
  }

  getRolesOptions() {
    return this.props.rolesList.map(role => <option value={Object.keys(role)[0]}
                                                    key={Object.keys(role)[0]}>{Object.keys(role)[0]}</option>)
  }

  updateFormValue(controlName, controlValue) {
    const form = this.state.form;
    form[controlName] = controlValue;
    const disableCreatAccount = Object.values(form).filter(value => value.trim().length === '').length > 0;
    this.setState({form, disableCreatAccount});
  }

  toggle() {

  }

  render() {
    const props = this.props;
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9">

              <Card className="mx-4">
                <CardBody className="p-4">

                  <h4>
                    Register
                    <Link to="/login">
                      <button className="btn btn-link float-right">Back To Login</button>
                      <div className="clearfix"></div>
                    </Link>
                  </h4>

                  <Nav tabs
                       className="flex-nowrap border-bottom-0"
                       style={{overflowX: 'auto', overflowY: 'hidden'}}>
                    <NavItem>
                      <NavLink className={this.state.currentTab === 0 ? 'active text-center' : 'text-center'}
                               onClick={() => this.setState({currentTab: 0})}>
                        With Email
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink className={this.state.currentTab === 1 ? 'active text-center' : 'text-center'}
                               onClick={() => this.setState({currentTab: 1})}>
                        With Google
                      </NavLink>
                    </NavItem>

                    <NavItem>
                      <NavLink className={this.state.currentTab === 2 ? 'active text-center' : 'text-center'}
                               onClick={() => this.setState({currentTab: 2})}>
                        With Facebook
                      </NavLink>
                    </NavItem>

                  </Nav>

                  <TabContent activeTab={this.state.currentTab}>
                    <TabPane tabId={0}>

                      <Form>

                        <p className="text-muted">Create your account with Email</p>
                        <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-user"></i> <span className="text-danger">*</span>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input type="text"
                                 onChange={(event) => this.updateFormValue(event.target.id, event.target.value)}
                                 id="username"
                                 defaultValue={this.state.form.username}
                                 placeholder="Username"
                                 autoComplete="off"/>
                        </InputGroup>
                        <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-shield"></i> <span className="text-danger">*</span>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input type="select"
                                 onChange={(event) => this.updateFormValue(event.target.id, event.target.value)}
                                 id="role"
                                 defaultValue={this.state.form.role}
                                 autoComplete="off"
                                 name="select">
                            <option value="">Select Role</option>
                            {this.getRolesOptions()}
                          </Input>
                        </InputGroup>
                        <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>@ <span className="text-danger">*</span></InputGroupText>
                          </InputGroupAddon>
                          <Input type="text"
                                 onChange={(event) => this.updateFormValue(event.target.id, event.target.value)}
                                 id="email"
                                 defaultValue={this.state.form.email}
                                 placeholder="Email"
                                 autoComplete="off"/>
                        </InputGroup>
                        <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-lock"></i> <span className="text-danger">*</span>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input type="password"
                                 onChange={(event) => this.updateFormValue(event.target.id, event.target.value)}
                                 id="password"
                                 defaultValue={this.state.form.password}
                                 placeholder="Password"
                                 autoComplete="off"/>
                        </InputGroup>
                        <InputGroup className="mb-4">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-lock"></i> <span className="text-danger">*</span>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input type="password"
                                 onChange={(event) => this.updateFormValue(event.target.id, event.target.value)}
                                 id="repeatPassword"
                                 defaultValue={this.state.form.repeatPassword}
                                 placeholder="Repeat password"
                                 autoComplete="off"/>
                        </InputGroup>
                        <p className="text-muted">
                          Please provide required <span className="text-danger">*</span> information to create an
                          Account
                        </p>
                        <Button color="success"
                                disabled={this.state.disableCreatAccount}
                                block>Create Account</Button>
                      </Form>

                    </TabPane>
                    <TabPane tabId={1}>
                      <Form style={{minHeight: '372px'}}>
                        <p className="text-muted">Create your account with Google</p>
                        <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-shield"></i> <span className="text-danger">*</span>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input type="select"
                                 onChange={
                                   (event) => {
                                     const disableGoogleRegistration = event.target.value.trim().length === 0;
                                     this.setState({roleForGoogle: event.target.value, disableGoogleRegistration});
                                   }
                                 }
                                 id="role"
                                 defaultValue={this.state.roleForGoogle}
                                 autoComplete="off"
                                 name="select">
                            <option value="">Select Role</option>
                            {this.getRolesOptions()}
                          </Input>
                        </InputGroup>
                        <p className="text-muted">
                          Please Select a role to Register with Google
                        </p>

                        <GoogleLogin
                          className="float-right"
                          clientId="1020592783279-dib7nfhpbecp4gluf277pkj072shfqaj.apps.googleusercontent.com"
                          buttonText="Register with Google"
                          theme="dark"
                          disabled={this.state.disableGoogleRegistration}
                          onSuccess={googleLoginResponse => props.verifyGoogleLogin(googleLoginResponse, props.history)}
                          cookiePolicy={'single_host_origin'}
                        />

                      </Form>
                    </TabPane>

                    <TabPane tabId={2}>
                      <Form style={{minHeight: '372px'}}>
                        <p className="text-muted">Create your account with Facebook</p>
                        <h4 className="text-warning">Under Development</h4>
                      </Form>
                    </TabPane>
                  </TabContent>

                </CardBody>
              </Card>
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
    rolesList: state.role.rolesList,
  };
}

const mapDispatchToProps = dispatch => ({
  verifyGoogleLogin: (googleLoginResponse, history) => dispatch(verifyGoogleLogin(googleLoginResponse, history))
})

export default connect(mapStateToProps, mapDispatchToProps)(Register)
