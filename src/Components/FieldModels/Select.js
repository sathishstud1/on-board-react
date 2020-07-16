import React from "react";
import countries from "../../assets/data/Dropdowns/countries.json";
import states from "../../assets/data/Dropdowns/states.json";

class Select extends React.Component {
    constructor(props) {
      super(props);
      this.state = {    
      };
    }

    componentDidMount() {
      this.props.loadRefObjects(this.props.fieldId,this);
    }

    getStates = (value, country)=>{
      let options = [];
            /*let countryList  = states.countries;            
            countryList.map((countryKey, index) => {
              let countryObj = countryList[index];
              let statesList = states[countryObj.value];
              options.push(<option value={countryObj.value} disabled>Country: {countryObj.label}</option>);
              statesList.map((stateKey, key) => {
                let state = statesList[key];
                if(fieldData.value && fieldData.value==state.value){
                  options.push(<option value={state.value} selected>{state.label}</option>);
                }else{
                  options.push(<option value={state.value}>{state.label}</option>);
                }                
              });
            });*/
            let statesList = states[country];
              //options.push(<option value={countryObj.value} disabled>Country: {countryObj.label}</option>);
              statesList.map((stateKey, key) => {
                let state = statesList[key];
                if(value && value==state.value){
                  options.push(<option value={state.value} selected>{state.label}</option>);
                }else{
                  options.push(<option value={state.value}>{state.label}</option>);
                }                
              });
      return options;
    }
    
    getCountries = (value)=>{
      let options = [];
      let isSelected = true;
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

      return options;
    }

    getOptions = (value, optList)=>{
      let options = [];
            optList.map((optIndex, key) => {
              let opt = optList[key];
              if(value && value==opt.value){
                options.push(<option value={opt.value} selected>{opt.label}</option>);
              }else{
                options.push(<option value={opt.value}>{opt.label}</option>);
              }
              
            });
      return options;
    }

    render() {  
          const fieldData = this.props.fieldData;
          const fieldId = this.props.fieldId;
          var link = fieldData.link;
          var options = [];
          if (link == "countries") {

            options = this.getCountries(fieldData.value);

          } else if (link == "states") {

            options = this.getStates(fieldData.value,"US");

          } else if (link == "self") {       

            options = this.getOptions(fieldData.value, fieldData.options);  
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
            <div className={ fieldData.colWidth+ ' mb-3'} ref={fieldId+"div"}>
                <label htmlFor={fieldId}>{fieldData.label}</label>
                {fieldData.required?<span className="asterisk" style={{color:'red'}}> *</span>:null}
                <select ref={fieldId}
                        id={fieldId}
                        onChange={(e) => {
                          this.props.changed(e);
                          this.props.parentChildHandler(e,fieldData.isDependent, fieldData.name);
                        }}
                        //onChange={this.props.changed}
                        className="form-control">
                    {options}
                </select>
              </div>
        ); 
    }
}
export default Select;