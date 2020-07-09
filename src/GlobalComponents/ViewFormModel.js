import React from 'react';

class ViewFormModel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let arr = this.props.data;
    let formfields = [];    
    Object.keys(arr).map((field, index) => {
      let fieldData = arr[field];
      let fieldId = fieldData.name;     
      switch (fieldData.type) {
        case('text'):
          formfields.push(
            <div className={'form-group ' + fieldData.colWidth}>
              <label htmlFor={fieldId}>{fieldData.label}</label> : 
              <label>{fieldData.value}</label>             
            </div>
          );
          break;
        case('textarea'):
          formfields.push(
            <div className={'form-group ' + fieldData.colWidth}>
              <label htmlFor={fieldId}>{fieldData.label}</label> : 
              <label>{fieldData.value}</label>             
            </div>
          );
          break;
        case('radiogroup'):
          formfields.push(
            <div className={'form-group ' + fieldData.colWidth}>
              <label className="d-block mb-3">{fieldData.label}</label>  
              <label>{fieldData.value}</label>
            </div>
          );
          break;
        case('checkbox'):
          formfields.push(
            <div className={'form-group ' + fieldData.colWidth}>
              <label className="d-block mb-3">{fieldData.label}</label>  
              <label>{fieldData.value==true?"Checked":"Unchecked"}</label>
            </div>
          );
          break;
        case('select'):
            formfields.push(
                <div className={'form-group ' + fieldData.colWidth}>
                    <label htmlFor={fieldId}>{fieldData.label}</label> : 
                    <label>{fieldData.selectedLabel}</label>
                </div>
            );

          break;        
        default:
          formfields.push(<br/>);
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
