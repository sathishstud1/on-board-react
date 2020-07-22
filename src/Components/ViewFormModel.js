import React from 'react';
import DatePicker from "react-datepicker/es";

class ViewFormModel extends React.Component { 

  render() {
    let arr = this.props.data;
    let formfields = [];    
    Object.keys(arr).map((field, index) => {
      let fieldData = arr[field];
      let fieldId = fieldData.name;     
      switch (fieldData.type) {
        case('text'):
          formfields.push(
            <div className={'form-group ' + fieldData.colWidth} key={"viewText"+fieldId}>
              <label htmlFor={fieldId}>{fieldData.label}</label> : 
              <label>{fieldData.value}</label>             
            </div>
          );
          break;
        case('textarea'):
          formfields.push(
            <div className={'form-group ' + fieldData.colWidth} key={"viewTextArea"+fieldId}>
              <label htmlFor={fieldId}>{fieldData.label}</label> : 
              <label>{fieldData.value}</label>             
            </div>
          );
          break;
        case('radiogroup'):
          formfields.push(
            <div className={'form-group ' + fieldData.colWidth} key={"viewRadio"+fieldId}>
              <label htmlFor={fieldId}>{fieldData.label}</label> : 
              <label>{fieldData.value}</label>
            </div>
          );
          break;
        case('checkbox'):
          formfields.push(
            <div className={'form-group ' + fieldData.colWidth} key={"viewCheckBox"+fieldId}>
              <label htmlFor={fieldId}>{fieldData.label}</label>  : 
              <label>{fieldData.value===true?"Checked":"Unchecked"}</label>
            </div>
          );
          break;
        case('select'):
            formfields.push(
                <div className={'form-group ' + fieldData.colWidth} key={"viewSelect"+fieldId}>
                    <label htmlFor={fieldId}>{fieldData.label}</label> : 
                    <label>{fieldData.selectedLabel}</label>
                </div>
            );

          break; 
        case('DatePicker'): 
          let dateVal = new Date();
          if(fieldData.value && fieldData.value!=='' && !isNaN(fieldData.value)){
            dateVal = new Date(parseInt(fieldData.value));
          }
          formfields.push(
            <div className={'form-group ' + fieldData.colWidth} key={"viewDatePicker"+fieldId}>
                <label htmlFor={fieldId}>{fieldData.label}</label> :                 
                <DatePicker selected = {dateVal} disabled={true}/>
            </div>
          );   
          break;            
        default:
          formfields.push(
            <div className='col-md-4 mb-3' key={"viewdefault"+fieldId}>
              <label htmlFor={fieldId}>{fieldData.label}</label> : 
              <label>{fieldData.value}</label>                
            </div>
           
          );
      }
    });

    return (
      <div className="form-row mb-3">
        {formfields}
      </div>
    );
  }
}

export default ViewFormModel;
