import React from "react";
import Validation from '../Validation';
import ReactDOM from 'react-dom';

class Input extends React.Component {
    constructor(props) {
      super(props);
      this.state = {  
        message:""
      };
    }

    validate = (e, isReq, type, label, thisObj)=>{
       const isValid =  Validation.isValid(e.target.value, isReq, type);
       let message = "";
       if(!isValid){
            message =  Validation.setMessage(isReq, type, label);
            setTimeout(function(){ 
                ReactDOM.findDOMNode(thisObj.refs[thisObj.props.fieldId]).value='';
            }, 3000);
       }else{
            this.props.changed(e);
       }
       this.setState({message});       
    } 

    render() {  
        const fieldData = this.props.fieldData;
        const fieldId = this.props.fieldId;
        let validationType = "";
        if(fieldData.validation){
            validationType = fieldData.validation;
        }      
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
                    onKeyUp={(e) => {
                        if(fieldData.required){
                            this.validate(e, fieldData.required, validationType, fieldData.label, this)
                        }else{
                            this.props.changed(e);
                        }
                      }}
                    defaultValue={fieldData.value}/>
                <div class="invalid-feedback">
                    Please choose {fieldData.label}.
                </div>
                <div style={{width: '100%', marginTop: '0.25rem',fontSize: '80%',color: '#f86c6b'}}>
                    {this.state.message}
                </div>
            </div>
        ); 
    }
}
export default Input;