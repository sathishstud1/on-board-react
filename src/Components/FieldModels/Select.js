import React from "react";
import countries from "../../assets/data/Dropdowns/countries.json";
import states from "../../assets/data/Dropdowns/states.json";

class Select extends React.Component {
    constructor(props) {
      super(props);
      this.state = {    
      };
    }     

    render() {  
          const fieldData = this.props.fieldData;
          const fieldId = this.props.fieldId;
          var link = fieldData.link;
          let value = fieldData.value;
          let isSelected = true;
          var options = [];
          if (link == "countries") {
            if(value){
              isSelected = false;
            }
            countries.countries.map((cntry, key) => {
              let country = countries.countries[key];
              
              if(isSelected){
                if(typeof country.isSelected != 'undefined' && country.isSelected != null){
                  options.push(<option value={country.abbreviation} selected>{country.country}</option>);
                }else if (typeof country.available != 'undefined' && country.available != null) {
                  options.push(<option value={country.abbreviation}>{country.country}</option>);
                } else {
                  options.push(<option value={country.abbreviation} disabled>{country.country}</option>);
                }
              }else{
                if(value && value==country.abbreviation){
                  options.push(<option value={country.abbreviation} selected>{country.country}</option>);
                }else if (typeof country.available != 'undefined' && country.available != null) {
                  options.push(<option value={country.abbreviation}>{country.country}</option>);
                } else {
                  options.push(<option value={country.abbreviation} disabled>{country.country}</option>);
                }
              }
              
            })
          } else if (link == "states") {
            let countryList  = states.countries;
            
            countryList.map((countryKey, index) => {
              let countryObj = countryList[index];
              let statesList = states[countryObj.value];
              options.push(<option value={countryObj.value} disabled>Country: {countryObj.label}</option>);
              statesList.map((stateKey, key) => {
                let state = statesList[key];
                if(value && value==state.value){
                  options.push(<option value={state.value} selected>{state.label}</option>);
                }else{
                  options.push(<option value={state.value}>{state.label}</option>);
                }                
              });
            });            
          } else if (link == "self") {
            var optList = fieldData.options;
            optList.map((optIndex, key) => {
              let opt = optList[key];
              if(value && value==opt.value){
                options.push(<option value={opt.value} selected>{opt.label}</option>);
              }else{
                options.push(<option value={opt.value}>{opt.label}</option>);
              }
              
            });
          }
          /*if (typeof fieldData.dependent != 'undefined' && fieldData.dependent) {
            formfields.push(
              <div className={ fieldData.colWidth+ ' mb-3'}>
                <label htmlFor={fieldId}>{fieldData.label}</label>
                {fieldData.required?<span className="asterisk" style={{color:'red'}}> *</span>:null}
                <select ref={fieldId}
                        id={fieldId}
                        onChange={this.props.changed}
                        className="form-control"
                        >
                          {options}
                </select>
              </div>
            );
          } else {
            formfields.push(
              <div className={ fieldData.colWidth+ ' mb-3'}>
                <label htmlFor={fieldId}>{fieldData.label}</label>
                {fieldData.required?<span className="asterisk" style={{color:'red'}}> *</span>:null}
                <select ref={fieldId}
                        className="form-control"
                        id={fieldId}
                        onChange={this.props.changed}
                        >
                  {options}
                </select>
              </div>
            );
          }*/

        return (
            <div className={ fieldData.colWidth+ ' mb-3'}>
                <label htmlFor={fieldId}>{fieldData.label}</label>
                {fieldData.required?<span className="asterisk" style={{color:'red'}}> *</span>:null}
                <select ref={fieldId}
                        id={fieldId}
                        onChange={this.props.changed}
                        className="form-control">
                    {options}
                </select>
              </div>
        ); 
    }
}
export default Select;