import React from 'react';
import FormModel from './FormModel';

class CreatePage extends React.Component {
  constructor(props) {
    super(props);
    this.reqFields = [];
    this.recreateArray = [];
    this.defaultValues = {};
    this.currentPageId = 0;
  }

  componentDidMount() {
    this.props.loadPageDefaults(this.reqFields,this.recreateArray,this.defaultValues, this.currentPageId);
  }

  render() {    
    this.reqFields = [];
    this.recreateArray = [];
    let items = [];
    let recreateCount = 1;
    let page = this.props.Page;
    let formModelCount = 0;
    let countryName = "US";
    this.currentPageId = this.props.currentPageId;
      //items.push(<h1>{page.PageTitle}</h1>);
      let categoryList = page.CategoryList;
      //Category List
      Object.keys(categoryList).map((categoryIndex, index) => {
        let category = categoryList[index];
        items.push(<h4 key={"category"+this.currentPageId+index} className="mt-3 text-muted">{category.categoryTitle}</h4>);
        let sectionList = category.sectionList;
        //Section List
        Object.keys(sectionList).map((sectionIndex, index) => {
          let section = sectionList[index];
          items.push(<h6 key={"section"+this.currentPageId+index} className="mt-4">{section.sectionName}</h6>);
          let linesList = section.linesList;
          //Lines List
          Object.keys(linesList).map((lineIndex, index) => {
            let line = linesList[index];
            let arr = [];
            let fields = line.fields;
            //Fields List
            Object.keys(fields).map((fieldIndex, index) => {
              var fieldData = fields[index];
              if(fieldData.required){
                this.reqFields.push(fieldData.name);
              }
              if(fieldData.name==="country" && fieldData.value){
                countryName = fieldData.value;
              }
              if(fieldData.type=="button"){
                if(fieldData.name==""){
                  fieldData.clicked = this.props.searchSSN;
                }else if(fieldData.name=="save"){
                  fieldData.clicked = this.props.saveform;
                }
                else if(fieldData.name=="exit"){
                  fieldData.clicked = this.props.exitform;
                }
              }else{
                if(fieldData.type==="DatePicker"){
                  this.defaultValues[fieldData.name] = (new Date()).getTime();
                }else if(fieldData.type=="select"){
                  this.defaultValues[fieldData.name+"_selectedLabel"] = fieldData.selectedLabel;
                  this.defaultValues[fieldData.name] = fieldData.value;
                }else{
                  this.defaultValues[fieldData.name] = fieldData.value;
                }
              }
              arr.push(fieldData);
            });//Fields End
            if(arr.length!=0){
              items.push(<FormModel data={arr}
                                    key={"formModel"+this.currentPageId+formModelCount}
                                    uniqueId = ""
                                    changed={this.props.changed}
                                    dateChanged = {this.props.dateChanged}
                                    parentChildHandler = {this.props.parentChildHandler}
                                    loadRefObjects={this.props.loadRefObjects}
                                    countryName={countryName}
                                    /*stateOptions={this.props.stateOptions}*//>);
              formModelCount ++;
            }
          });//Lines End
          if(section.recreate!=null && section.recreate){
            let refVal = 'recreate'+this.props.PageId+recreateCount;
            recreateCount = recreateCount + 1;
            this.recreateArray.push(refVal);

              items.push(<div contentEditable='true'
                              id={refVal}
                              key={refVal}
                              ref={refVal}
                              suppressContentEditableWarning={true}>
                                {this.props.addrecreateDiv(refVal)}
                          </div>);
             // items.push(<button onClick={()=>this.props.addElements(linesList, refVal)} style={mystyle}
              //type="button" >{section.recreatelabel}</button>);

              items.push(
                <button onClick={()=>this.props.addElements(linesList, refVal)}
                        className="btn btn-primary mr-3"                      
                        type="button"
                        key={"recreateBtn"+refVal}>
                  {section.recreatelabel}
                </button>
                );

              items.push(<br key={"br"+refVal}/>);
          }
        });//Sections End
      });//Category End

    return (
      <div>
        {items}
      </div>

    );
  }
}
export default CreatePage;
