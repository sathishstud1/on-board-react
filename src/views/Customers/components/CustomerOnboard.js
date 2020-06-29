import React from 'react';
import RecreateForm from './RecreateForm';
import validator from '../components/Validation';
import createJson from '../components/CreateNewJson';
import CreatePage from '../components/CreatePage';
import axios from 'axios';
import ReactDOM from 'react-dom';
import {withRouter} from 'react-router';
import states from "../../../assets/data/Dropdowns/states.json";
import {Redirect} from "react-router-dom";


class CustomerOnboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customerOnboardJson: this.props.json,
      recreateArray: [],
      jsonValues: {},
      stateOptions: {},
      redirect: false,
      currentPageId: 0
    };
    this.verifyUser();
    this.recreateLines = {};
    this.defaultValues = {};
    this.reqFields = [];
    this.addedReqFields = [];
    this.addedFields = [];
    this.PageLength = 0;
    this.PageList = [];
    this.defaultStates = [];
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }

  async verifyUser() {
    let postData = {
      id_token: localStorage.getItem('login_session_token')
    };
    axios.post('http://localhost:8080/verifyGoogleLogin', postData)
      .then(response => {
        if (response.data.status) {
          this.setState({redirect: false});
        } else {
          this.setState({redirect: true});
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  addElements = (lines, refVal) => {
    let prev;
    if (!this.state[refVal]) {
      this.state[refVal] = [];
    } else {
      prev = this.state[refVal];
      this.state[refVal] = [];
    }
    let arr = [];
    if (prev) {
      arr.push(...prev);
    }
    let divId = refVal + arr.length;
    let removeId = arr.length;
    this.state.stateOptions["state"+removeId] = this.defaultStates;
    arr.push(<RecreateForm data={lines}
                            stateOptions ={this.state.stateOptions}
                            changed={this.onChangeHandler} 
                            uniqueId ={arr.length}
                            remove={()=>this.removeElement(lines,refVal,removeId)}/>);   

    let processFields = validator.addFields(lines, removeId);
    this.addedReqFields = [...this.addedReqFields,...processFields.reqFields];
    this.addedFields = [...this.addedFields,...processFields.allFields];
    let prevJsonvalues = this.state.jsonValues;
    let newJsonValues = {};
    Object.assign(newJsonValues, prevJsonvalues, processFields.defaultValues);     
    this.recreateLines[refVal][removeId] = processFields.addedLines;
    this.state[refVal].push(arr);
    this.state.jsonValues = newJsonValues;     
    this.setState({[refVal]:arr,jsonValues:newJsonValues});
  };

  removeElement = (lines, refVal, removeId) => {
    let arr = [];
    for (let i = 0; i < this.state[refVal].length; i++) {
      if (removeId != i) {
        arr.push(this.state[refVal][i]);
      } else {
        arr.push(null);
      }
    }
    this.state[refVal].push(arr);
    this.setState({[refVal]: arr});
    let processFields = validator.removeFields(lines, removeId, this.addedReqFields, this.addedFields, this.state.jsonValues);
    this.addedReqFields = [...processFields.reqFields];
    this.addedFields = [...processFields.allFields];
    Object.assign(this.state.jsonValues, this.state.jsonValues, processFields.defaultValues);
    delete this.recreateLines[refVal][removeId];
    delete this.state.stateOptions["state"+removeId];
  };

  onChangeHandler = function (e) {
    e.persist();
    if (e.target.type == "radio") {
      this.state.jsonValues[e.target.name] = e.target.value;
    } else if(e.target.type=="select-one"){
      let selectId = e.target.id;
      if(selectId.indexOf("country")>=0){
        var stateId = "state"+selectId.replace("country", "");
        let state = this.getStates(e.target.value);

        var stateProperty = {...this.state.stateOptions}
        stateProperty[stateId] = state;
        this.state.stateOptions = stateProperty;
        this.setState({stateOptions:stateProperty});
        
        console.log(this.state.stateOptions)
      }      
      this.state.jsonValues[e.target.id] = e.target.value;   
    } else {
      this.state.jsonValues[e.target.id] = e.target.value;
    }
  }

  getStates = (country) => {
    let statesList = states[country];
    let options = [];
    statesList.map((stateKey, key) => {
      let state = statesList[key];
      options.push(<option value={state.value}>{state.label}</option>);
    });
    return options;
  }

  searchSSN = () => {
  }
  exitform = () => {
    alert('exit')
  }

  addrecreateDiv = (refVal) => {
    return this.state[refVal];
  }

  loadPageDefaults = (reqFields, recreateArray, defaultValues) => {
    this.reqFields = [...this.reqFields, ...reqFields];
    this.state.recreateArray = [...this.state.recreateArray, ...recreateArray];
    Object.assign(this.defaultValues, this.defaultValues, defaultValues);
  }

  changePage = (pageId) => {
    for (let i = 0; i < this.PageLength; i++) {
      ReactDOM.findDOMNode(this.refs["ShowPage" + i]).style.display = 'none';
    }
    ReactDOM.findDOMNode(this.refs["ShowPage" + pageId]).style.display = 'block';
    ReactDOM.findDOMNode(this.refs["previousBtn"]).style.display = 'block';
    ReactDOM.findDOMNode(this.refs["nextBtn"]).style.display = 'block';
    if (pageId == (this.PageLength - 1)) {
      ReactDOM.findDOMNode(this.refs["nextBtn"]).style.display = 'none';
    }
    if (pageId == 0) {
      ReactDOM.findDOMNode(this.refs["previousBtn"]).style.display = 'none';
    }
    this.CurrentPageId = pageId;
    this.setState({currentPageId: pageId});
  }

  nextPage = () => {

    if (this.CurrentPageId == (this.PageLength - 1)) {
      return;
    }
    ReactDOM.findDOMNode(this.refs["previousBtn"]).style.display = 'block';
    this.CurrentPageId = this.CurrentPageId + 1;
    if (this.CurrentPageId == (this.PageLength - 1)) {
      ReactDOM.findDOMNode(this.refs["nextBtn"]).style.display = 'none';
    }

    for (let i = 0; i < this.PageLength; i++) {
      ReactDOM.findDOMNode(this.refs["ShowPage" + i]).style.display = 'none';
    }
    ReactDOM.findDOMNode(this.refs["ShowPage" + this.CurrentPageId]).style.display = 'block';
  }

  previousPage = () => {
    if (this.CurrentPageId == 0) {
      return;
    }
    ReactDOM.findDOMNode(this.refs["nextBtn"]).style.display = 'block';

    this.CurrentPageId = this.CurrentPageId - 1;
    if (this.CurrentPageId == 0) {
      ReactDOM.findDOMNode(this.refs["previousBtn"]).style.display = 'none';
    }
    for (let i = 0; i < this.PageLength; i++) {
      ReactDOM.findDOMNode(this.refs["ShowPage" + i]).style.display = 'none';
    }
    ReactDOM.findDOMNode(this.refs["ShowPage" + this.CurrentPageId]).style.display = 'block';
  }

  saveform = () => {
    let customeOnboardNewJson = createJson.create(this.state.jsonValues, this.state.recreateArray,
      this.recreateLines, this.state.customerOnboardJson);
    console.log(customeOnboardNewJson)
    //let validateFields = [...this.reqFields,...this.addedReqFields];
    //let isValid = validator.validateForm(validateFields, this.state.jsonValues);

    axios.post('/save-app-details', customeOnboardNewJson)
      .then(response => {
        alert(response.data.message);
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentDidMount() {
    let linesobj ={};
    Object.keys(this.state.recreateArray).map((recreateIndex, index) => {
      linesobj[this.state.recreateArray[index]] = {};
      Object.assign(this.recreateLines, this.recreateLines, linesobj);
    });
    let statesList = states.US;
    this.defaultStates = [];
        statesList.map((stateKey, key) =>{
           let state = statesList[key];
           this.defaultStates.push(<option value={state.value}>{state.label}</option>);
        }); 
    this.state.stateOptions["state"] = this.defaultStates;
    this.setState({ jsonValues: this.defaultValues });
  }

  renderPage = (Page, PageId, PageLength) => {
    let refId = 'ShowPage' + PageId;
    let divstyle = {
      display: 'none'
    }
    if (PageId == 0) {
      divstyle = {}
    }
    return <div ref={refId}
                key={'createPage' + PageId}
                style={divstyle}>
      <CreatePage Page={Page}
                  PageLength={PageLength}
                  PageId={PageId}
                  stateOptions={this.state.stateOptions}
                  loadPageDefaults={this.loadPageDefaults}
                  changed={this.onChangeHandler}
                  addElements={this.addElements}
                  addrecreateDiv={this.addrecreateDiv}
                  searchSSN={this.searchSSN}
                  saveform={this.saveform}
                  exitform={this.exitform}/>
    </div>;
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to='/'/>;
    }
    let items = [];
    let tabs = [];
    let btns = [];
    let pages = this.props.json.PageList;
    this.PageList = [];
    this.CurrentPageId = 0;
    this.PageLength = 0;
    //Pages
    Object.keys(pages).map((pageIndex, index) => {
      this.PageList.push(pages[index]);
    });
    this.PageLength = this.PageList.length;
    for (let i = 0; i < this.PageLength; i++) {
      let tabId = 'pagebtn' + i;
      let className  = 'btn btn-outline-light rounded-0 text-dark';
      if(this.state.currentPageId === i){
        className = className + ' active';
      }
      tabs.push(
        <button className={className}
                onClick={() => this.changePage(i)}
                id={tabId}
                type="button">
          {this.PageList[i].PageTitle}
        </button>
      );

      items.push(
        this.renderPage(this.PageList[i], i, this.PageLength)
      );
    }
    btns.push(
      <button ref="previousBtn"
              className="btn btn-primary mr-3"
              key='previousPage'
              onClick={() => this.previousPage()}
              type="button">
        Previous</button>
    );
    btns.push(
      <button className="btn btn-primary"
              key='nextPage'
              ref="nextBtn"
              onClick={() => this.nextPage()}
              type="button">
        Next</button>
    );
    return (
      <div>
        <div className="border-bottom">
          {tabs}
        </div>
        <div>{items} </div>
        <div className="text-right float-right">
          {btns}
        </div>
        <div className="clearfix"></div>
      </div>

    );
  }
}

export default withRouter(CustomerOnboard);
