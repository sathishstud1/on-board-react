import React from 'react';
import RecreateForm from './RecreateForm';
import ProcessFields from './ProcessFields';
import createJson from './CreateNewJson';
import CreatePage from './CreatePage';
import PageNavigation from './PageNavigation';
import axios from '../axios-instance';
import ReactDOM from 'react-dom';
import {withRouter} from 'react-router';
import Validation from './Validation';
import OpenModal from './OpenModal';

class Onboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recreateArray: [],
      jsonValues: {},
      currentPageId: 0,
      isUpdate: this.props.isUpdate,
      openModel:false,
      alertMsg:'',
      headerInfo:''
    };
    this.recreateLines = {};
    this.defaultValues = {};
    this.reqFields = [];
    this.addedReqFields = [];
    this.addedFields = [];
    this.PageLength = 0;
    this.PageList = [];
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }

  Alert(openModel, alertMsg, headerInfo ){
    this.setState({openModel:openModel, alertMsg:alertMsg,headerInfo:headerInfo});
  }

  addElements = (lines, refVal) => {
    let arr = [];
    if (!this.state[refVal]) {
      this.state[refVal] = [];
    } else {
      arr = this.state[refVal];
      this.state[refVal] = [];
    }
    
    let removeId = arr.length;
    arr.push(<RecreateForm data={lines}
                            changed={this.onChangeHandler} 
                            uniqueId ={arr.length}
                            remove={()=>this.removeElement(lines,refVal,removeId)}/>);   

    let processFields = ProcessFields.addFields(lines, removeId);
    
    this.addedFields = [...this.addedFields,...processFields.allFields];
    let newJsonValues = {};
    Object.assign(newJsonValues, this.state.jsonValues, processFields.defaultValues);     
    this.recreateLines[refVal][removeId] = processFields.addedLines;
    this.setState({[refVal]:arr,jsonValues:newJsonValues});
    
    //this.addedReqFields = [...this.addedReqFields,...processFields.reqFields];   
    let newReqFileds = [...this.addedReqFields[this.state.currentPageId],...processFields.reqFields];
    this.addedReqFields.splice(this.state.currentPageId, 0, newReqFileds);
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
    let processFields = ProcessFields.removeFields(lines, removeId, this.addedReqFields[this.state.currentPageId], this.addedFields, this.state.jsonValues);
    let newReqFileds = [...processFields.reqFields];
    this.addedReqFields.splice(this.state.currentPageId, 0, newReqFileds);
    this.addedFields = [...processFields.allFields];
    let newJsonValues = {};
    Object.assign(newJsonValues, this.state.jsonValues, processFields.defaultValues);  
    this.setState({[refVal]: arr, jsonValues:newJsonValues});
    delete this.recreateLines[refVal][removeId];
  };

  onChangeHandler = function (e) {
    e.persist();
    if (e.target.type == "radio") {
      this.state.jsonValues[e.target.name] = e.target.value;
    } else if(e.target.type=="select-one"){     
      this.state.jsonValues[e.target.id] = e.target.value;
      this.state.jsonValues[e.target.id+"_selectedLabel"] = e.target.options[e.target.selectedIndex].text;  
    }if (e.target.type == "checkbox") {
      this.state.jsonValues[e.target.id] = e.target.checked;
    } else {
      this.state.jsonValues[e.target.id] = e.target.value;
    }
  }

  searchSSN = () => {
  }

  exitform = () => {
    alert('exit')
  }

  addrecreateDiv = (refVal) => {
    return this.state[refVal];
  }

  loadPageDefaults = (reqFields, recreateArray, defaultValues, currentPageId) => {
    //this.reqFields = [...this.reqFields, ...reqFields];
    this.reqFields.splice(currentPageId, 0, reqFields); 
    this.addedReqFields.splice(currentPageId, 0, []); 
    this.state.recreateArray = [...this.state.recreateArray, ...recreateArray];
    Object.assign(this.defaultValues, this.defaultValues, defaultValues);
  }

  closeModal = (info)=>{
    this.Alert(false,'', '');
    if(info==="Success"){
      window.location.reload(false);
    }
  }

  saveform = () => {
    let customeOnboardNewJson = createJson.create(this.state.jsonValues, this.state.recreateArray,
      this.recreateLines, this.props.json);
    let validateFields = [];
    for(let i=0;i<this.PageLength;i++){
      let valfields = [...this.reqFields[i],...this.addedReqFields[i]];
      validateFields = [...validateFields,...valfields];
    }    
    let isValid = Validation.validateForm(validateFields, this.state.jsonValues);
    if(!isValid){
      var forms = document.getElementsByClassName('needs-validation-'+this.state.currentPageId);
      Array.prototype.filter.call(forms, function(form) {
        form.classList.add('was-validated');
      });
      return;
    }
    let URL = '/save-app-details';
    if(this.state.isUpdate){
      URL = '/update-app-details';
    }
    axios.post(URL, customeOnboardNewJson)
      .then(response => {
        this.Alert(true,response.data.message, 'Success');
      })
      .catch(error => {
        this.Alert(true,error, 'Error');
      });
  }

  componentDidMount() {
    let linesobj ={};
    Object.keys(this.state.recreateArray).map((recreateIndex, index) => {
      linesobj[this.state.recreateArray[index]] = {};
      Object.assign(this.recreateLines, this.recreateLines, linesobj);
    });   
    this.setState({ jsonValues: this.defaultValues });
    if(this.state.currentPageId==0){
      ReactDOM.findDOMNode(this.refs["previousBtn"]).style.display = 'none';
    }
    if(this.PageLength==1){
      ReactDOM.findDOMNode(this.refs["previousBtn"]).style.display = 'none';
      ReactDOM.findDOMNode(this.refs["nextBtn"]).style.display = 'none';
    }
  }

  validatePage = ()=>{
    var forms = document.getElementsByClassName('needs-validation-'+this.state.currentPageId);
    Array.prototype.filter.call(forms, function(form) {
       form.classList.add('was-validated');
    });
    let validateFields = [];
    if(this.addedReqFields[this.state.currentPageId]){
      validateFields = [...this.reqFields[this.state.currentPageId],...this.addedReqFields[this.state.currentPageId]];
    }else{
      validateFields = [...this.reqFields[this.state.currentPageId]];
    }
    
    let isValid = Validation.validateForm(validateFields, this.state.jsonValues);
    return isValid;
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
                  loadPageDefaults={this.loadPageDefaults}
                  changed={this.onChangeHandler}
                  addElements={this.addElements}
                  addrecreateDiv={this.addrecreateDiv}
                  searchSSN={this.searchSSN}
                  saveform={this.saveform}
                  exitform={this.exitform}
                  currentPageId={PageId}/>
    </div>;
  }

  render() {   
    let items = [];
    let tabs = [];
    let btns = [];
    let pages = this.props.json.PageList;
    this.PageList = [];
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
                onClick={() => {
                  if(this.validatePage()){
                    PageNavigation.changePage(i, this.PageLength, "ShowPage", "previousBtn", "nextBtn", this, ReactDOM);
                    this.setState({currentPageId: i});
                  }                  
                }}
                id={tabId}
                type="button">
          {this.PageList[i].PageTitle}
        </button>
      );

      items.push(
        <form className={"needs-validation-"+i} novalidate >{this.renderPage(this.PageList[i], i, this.PageLength)}</form>
      );
    }
    btns.push(
        <button ref="previousBtn"
                className="btn btn-primary mr-3"
                key='previousPage'
                onClick={() => {
                  if(this.validatePage()){
                    const pageId = PageNavigation.previousPage(this.state.currentPageId, this.PageLength, "ShowPage", "previousBtn", "nextBtn", this, ReactDOM);
                    this.setState({currentPageId: pageId});
                  }
                 
                }}
                type="button">
          Previous</button>
    );    
    btns.push(
      <button className="btn btn-primary"
              key='nextPage'
              ref="nextBtn"
              onClick={() => {
                if(this.validatePage()){
                  const pageId = PageNavigation.nextPage(this.state.currentPageId, this.PageLength, "ShowPage", "previousBtn", "nextBtn", this, ReactDOM);
                  this.setState({currentPageId: pageId});
                }
                
              }}
              type="button">
        Next</button>
    );
    return (
      <div>
        <div className="border-bottom">
          {tabs}
        </div>
        <div >{items} </div>
        <div className="text-right float-right">
          {btns}
        </div>
        <div className="clearfix"></div>
        <OpenModal isOpenModal={this.state.openModel} 
                   msg={this.state.alertMsg} 
                   headerInfo = {this.state.headerInfo}
                   closeModal = {this.closeModal}/>
      </div>

    );
  }
}
export default withRouter(Onboard);