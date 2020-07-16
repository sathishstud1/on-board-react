import React from "react";

class Radio extends React.Component {
    constructor(props) {
      super(props);
      this.state = {  
      };
    }

    /*ref={element => { 
      if (element) element.style.setProperty('margin-bottom', '-1rem', 'important'); 
    }}*/
    componentDidMount() {
      this.props.loadRefObjects(this.props.fieldId,this);
    }

    renderRadio = (fieldData, fieldId)=>{
      let arr = []
      Object.values(fieldData.values).map((value, _index) => {
        var ids = fieldId + _index;
        let val = fieldData.value;
        let checkFlag = false;
        if (val && val === fieldData.values[_index]) {
          checkFlag = true;
        }
        arr.push(<div><input className="custom-control-input"
                  type="radio"
                  onChange={(e) => {
                    this.props.changed(e);
                    this.props.parentChildHandler(e,fieldData.isDependent, fieldData.name);
                  }}
                  defaultValue={value}
                  name={fieldId}
                  id={ids}
                  ref={fieldId}
                  defaultChecked={checkFlag}
                  required={fieldData.required}/>
                  <label className="custom-control-label" for={ids}>{value} </label> </div> );      
      })
      return arr;
    }

    render() {  
        const fieldData = this.props.fieldData;
        const fieldId = this.props.fieldId;
        this.renderRadio(fieldData.values);      
        return (
            <div className={ fieldData.colWidth+ ' mb-3'} ref={fieldId+"div"}>
                <label className="d-block mb-3" >
                                    {fieldData.label}
                {fieldData.required?<span className="asterisk" style={{color:'red'}}> *</span>:null}</label>
                <div className="custom-control custom-radio pmd-radio">
                  {
                    this.renderRadio(fieldData, fieldId)
                  }                
                 <div class="invalid-feedback">
                          Please choose {fieldData.label}.
                  </div>
                </div>
            </div>
        ); 
    }
}
export default Radio;