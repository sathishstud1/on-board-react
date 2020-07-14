import React, { useState } from "react";

class TextArea extends React.Component {
    constructor(props) {
      super(props);
      this.state = {    
      };
    }
    render() {  
        const fieldData = this.props.fieldData;
        const fieldId = this.props.fieldId;
        return (
            <div className={ fieldData.colWidth+ ' mb-3'}>
              <label htmlFor={fieldId}>{fieldData.label}</label>
              {fieldData.required?<span className="asterisk" style={{color:'red'}}> *</span>:null}
              <textarea className="form-control"
                        defaultValue={fieldData.value}
                        required={fieldData.required}
                        id={fieldId}
                        name={fieldId}
                        ref={fieldId}
                        onChange={this.props.changed}/>
              <div class="invalid-feedback">
                Please choose {fieldData.label}.
              </div>
            </div>
        ); 
    }
}
export default TextArea;