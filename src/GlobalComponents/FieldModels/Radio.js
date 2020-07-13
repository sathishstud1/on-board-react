import React, { useState } from "react";

class Radio extends React.Component {
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
                <label className="d-block mb-3">{fieldData.label}
                {fieldData.required?<span className="asterisk" style={{color:'red'}}> *</span>:null}</label>
                {
                  Object.values(fieldData.values).map((value, _index) => {
                    var ids = fieldId + _index;
                    let val = fieldData.value;
                    let checkFlag = false;
                    if (val && val === fieldData.values[_index]) {
                      checkFlag = true;
                    }
                    return (
                      <div className="form-check form-check-inline">
                        <input className="form-check-input"
                              type="radio"
                              onChange={this.props.changed}
                              defaultValue={value}
                              name={fieldId}
                              id={ids}
                              ref={fieldId}
                              defaultChecked={checkFlag}
                              required={fieldData.required}/>
                        <label className="form-check-label"
                              for={ids}>
                          {value}
                        </label>
                       
                      </div>
                    )
                  })
                }
                 <div class="invalid-feedback">
                          Please choose {fieldData.label}.
                  </div>
              </div>
        ); 
    }
}
export default Radio;