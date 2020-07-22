import React from 'react';
import ViewFormModel from './ViewFormModel';

class CreateViewPage extends React.Component { 
  render() {   
    this.reqFields = [];
    this.recreateArray = [];
    let items = [];
    let page = this.props.Page;
    let formModelCount = 0;
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
              if(fieldData.type!=="button"){
                arr.push(fieldData);
              }
              
            });//Fields End
            if(arr.length!==0){
              items.push(<ViewFormModel data={arr} key={"formModel"+this.currentPageId+formModelCount}/>);
              formModelCount ++;
            }
          });//Lines End
          
        });//Sections End
      });//Category End

    return (
      <div>
        {items}
      </div>

    );
  }
}
export default CreateViewPage;
