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
import ParentChildActions from './ParentChildActions';
import states from '../assets/data/Dropdowns/states.json';

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
    this.refObjects = {};
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onChangeDateHandler = this.onChangeDateHandler.bind(this);
    this.loadRefObjects = this.loadRefObjects.bind(this);
  }

  Alert(openModel, alertMsg, headerInfo ){
    this.setState({openModel:openModel, alertMsg:alertMsg,headerInfo:headerInfo});
  }

  parentChildHandler = (e,dependent,fieldName) =>{
    if(dependent){
      const isValidationReq = ParentChildActions.honorActions(fieldName, 
                                                              e.target.id, 
                                                              e.target.value, 
                                                              dependent, 
                                                              this.refObjects, 
                                                              states,
                                                              ReactDOM );
      if(isValidationReq){
        const ext = e.target.id.replace(fieldName, "");
        const childId = dependent.dependentName + ext;
        let req =  this.reqFields[this.state.currentPageId];
        for(let i=0;i<req.length;i++){
          if(childId===req[i]){
            req.pop(childId);
          }
        }
        let addedReq =  this.addedReqFields[this.state.currentPageId];
        for(let i=0;i<addedReq.length;i++){
          if(childId===addedReq[i]){
            addedReq.pop(childId);
          }
        }        
      }
    }   
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
                            loadRefObjects = {this.loadRefObjects}
                            parentChildHandler= {this.parentChildHandler}
                            uniqueId ={arr.length}
                            remove={()=>this.removeElement(lines,refVal,removeId)}/>);   

    let processFields = ProcessFields.addFields(lines, removeId);
    
    this.addedFields = [...this.addedFields,...processFields.allFields];
    let newJsonValues = {};
    Object.assign(newJsonValues, this.state.jsonValues, processFields.defaultValues);     
    this.recreateLines[refVal][removeId] = processFields.addedLines;
    this.setState({[refVal]:arr,jsonValues:newJsonValues});
    
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

    const refKeys = Object.keys(this.refObjects);
    for(let i =0;i<refKeys.length;i++){
      if(refKeys[i].endsWith(removeId)){
        delete this.refObjects[refKeys[i]];
      }
    }  
  };

  onChangeDateHandler = function (e, id) {
    if(e && e!==""){
      this.state.jsonValues[id] = ''+e.getTime();
    }
  }

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
    this.reqFields.splice(currentPageId, 0, reqFields); 
    this.addedReqFields.splice(currentPageId, 0, []); 
    this.state.recreateArray = [...this.state.recreateArray, ...recreateArray];
    Object.assign(this.defaultValues, this.defaultValues, defaultValues);
  }

  loadRefObjects = (fieldID, obj)=>{   
    this.refObjects[fieldID] = obj;
  }

  closeModal = (info)=>{
    this.Alert(false,'', '');
    if(info==="Success"){      
      this.props.history.push({
        pathname: '/newcustomer',
        json: this.props.json
      });
    }
  }

  saveform = () => {          
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

    const cloneJson = JSON.parse(JSON.stringify(this.props.json));
    let customeOnboardNewJson = createJson.create(this.state.jsonValues, this.state.recreateArray,
      this.recreateLines, cloneJson);

    let URL = '/save-app-details';
    if(this.state.isUpdate){
      URL = '/update-app-details';
    }
    axios.post(URL, customeOnboardNewJson)
      .then(response => {
        if(response.data.status){
          this.Alert(true,response.data.message, 'Success');
        }else{
          this.Alert(true,response.data.message, 'Error');
        }        
      })
      .catch(error => {
        this.props.history.push({
          pathname: '/error',
          errorObj: error,
          curr_loc: this.props.location.pathname
        });
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
                  loadRefObjects = {this.loadRefObjects}
                  changed={this.onChangeHandler}
                  dateChanged = {this.onChangeDateHandler}
                  addElements={this.addElements}
                  addrecreateDiv={this.addrecreateDiv}
                  parentChildHandler= {this.parentChildHandler}
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
          {tabs.length>1?tabs:null}
        </div>
        <div >{items} </div>
        <div className="text-right float-right">
          {btns}
        </div>
        <br/>
        <div className="border-bottom">
        {tabs.length>1?tabs:null}
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