import React from 'react';
import FormModel from './FormModel';

class RecreateForm extends React.Component {  

  render() {
    let arr = this.props.data;
    let formfield = [];
    let uniqueId = this.props.uniqueId;   

    Object.keys(arr).map((line, index) => {
      let lineData = arr[index].fields;
      formfield.push(<FormModel data={lineData} 
                                key={"recreateForm-FormModel-"+uniqueId+index}
                                uniqueId = {uniqueId}
                                changed={this.props.changed}
                                loadRefObjects = {this.props.loadRefObjects}
                                parentChildHandler= {this.props.parentChildHandler}
                     /*stateOptions={this.props.stateOptions}*//>);
    });
    
    return (
      <div>
          {formfield}
          <div className="form-row mb-3"><button onClick={this.props.remove} 
                  type="button" 
                  className="btn btn-primary mr-3">Remove</button></div>
      </div>
    );
  }
}
export default RecreateForm;