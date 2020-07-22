import React from "react";

class CheckBox extends React.Component {
    constructor(props) {
      super(props);
      this.state = {    
      };
    }   
    
    componentDidMount() {
      this.props.loadRefObjects(this.props.fieldId,this);
    }

    render() {  
        const fieldData = this.props.fieldData;
        const fieldId = this.props.fieldId;
        return (
            <div className={ fieldData.colWidth+ ' mb-3'} ref={fieldId+"div"}>             
                <div className="form-check form-check-inline">
                    <input className="form-check-input"
                           type="checkbox" 
                           id={fieldId} 
                           defaultValue={fieldData.value}
                           onChange={(e) => {
                            this.props.changed(e);
                            this.props.parentChildHandler(e,fieldData.isDependent,fieldData.name);
                          }}
                           defaultChecked={fieldData.value}
                           required={fieldData.required}/>
                    <label className="form-check-label">{fieldData.label}</label>
                    {fieldData.required?<span className="asterisk" style={{color:'red'}}> *</span>:null}
                    <div className="invalid-feedback">
                      Please choose {fieldData.label}.
                    </div>
                </div>                  
          </div>
        ); 
    }
}
export default CheckBox;