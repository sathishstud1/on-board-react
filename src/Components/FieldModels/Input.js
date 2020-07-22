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

    componentDidMount() {
        this.props.loadRefObjects(this.props.fieldId,this);
      }

    validate = (e, isReq, type, label, dependent, name, thisObj)=>{
       const isValid =  Validation.isValid(e.target.value, isReq, type);
       let message = "";
       if(!isValid){
            message =  Validation.setMessage(isReq, type, label);
            setTimeout(function(){ 
                ReactDOM.findDOMNode(thisObj.refs[thisObj.props.fieldId]).value='';
            }, 2000);
       }else{
            this.props.changed(e);
            this.props.parentChildHandler(e, dependent, name);
       }
       this.setState({message});       
    }

    getReqInputTag = (fieldData, fieldId)=>{
        let arr = [];
        arr.push(<span className="asterisk" style={{color:'red'}} key={"req"+fieldId}> *</span>);
        let validation = "";
        if(fieldData.validation){
            validation = fieldData.validation;
        }
        if(fieldData.validationType && fieldData.validationType==="onblur"){
            arr.push(<input className="form-control"
                            type={fieldData.type}
                            required={fieldData.required}
                            id={fieldId}
                            name={fieldId}
                            ref={fieldId} 
                            key={fieldId}                   
                            onBlur={(e) => {
                                this.validate(e, fieldData.required, validation, fieldData.label, fieldData.isDependent, fieldData.name, this)
                            }}
                            defaultValue={fieldData.value}/>);
        }else{
            arr.push(<input className="form-control"
                            type={fieldData.type}
                            required={fieldData.required}
                            id={fieldId}
                            name={fieldId}
                            ref={fieldId}  
                            key={fieldId}                  
                            onKeyUp={(e) => {
                                this.validate(e, fieldData.required, validation, fieldData.label, fieldData.isDependent, fieldData.name, this)
                            }}
                            defaultValue={fieldData.value}/>);
        }
        return arr;
    }

    getInputTag = (fieldData, fieldId)=>{
        return <input className="form-control"
                        type={fieldData.type}
                        required={fieldData.required}
                        id={fieldId}
                        name={fieldId}
                        ref={fieldId}                    
                        onChange={(e) => {
                            this.props.changed(e);
                            this.props.parentChildHandler(e,fieldData.isDependent, fieldData.name);
                          }}
                        defaultValue={fieldData.value}/>
    }

    renderInput = (fieldData, fieldId) =>{
        if(fieldData.required){
            return this.getReqInputTag(fieldData, fieldId);
        }else{
            return this.getInputTag(fieldData, fieldId);
        }
    }

    render() {  
        const fieldData = this.props.fieldData;
        const fieldId = this.props.fieldId;        
        return (
            <div className={ fieldData.colWidth+ ' mb-3'} ref={fieldId+"div"}>
                <label htmlFor={fieldId}>{fieldData.label}</label>
                    {this.renderInput(fieldData, fieldId)}                
                <div className="invalid-feedback">
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