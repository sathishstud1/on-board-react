import React, { useState } from "react";

class CheckBox extends React.Component {
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
                <div class="form-check form-check-inline">
                    <input className="form-check-input"
                           type="checkbox" 
                           id={fieldId} 
                           defaultValue={fieldData.value}
                           onChange={this.props.changed}
                           defaultChecked={fieldData.value}
                           required={fieldData.required}/>
                    <label className="form-check-label">{fieldData.label}</label>
                    {fieldData.required?<span className="asterisk" style={{color:'red'}}> *</span>:null}
                    <div class="invalid-feedback">
                      Please choose {fieldData.label}.
                    </div>
                </div>                  
          </div>
        ); 
    }
}
export default CheckBox;