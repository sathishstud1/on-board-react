import React, { useState } from "react";

class Input extends React.Component {
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
                <input className="form-control"
                    type={fieldData.type}
                    required={fieldData.required}
                    id={fieldId}
                    name={fieldId}
                    ref={fieldId}
                    onChange={this.props.changed}
                    defaultValue={fieldData.value}/>
                <div class="invalid-feedback">
                    Please choose {fieldData.label}.
                </div>
            </div>
        ); 
    }
}
export default Input;