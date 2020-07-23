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

    getStates = (country)=>{
      let options = [];            
              let statesList = states[country];
              statesList.map((stateKey, key) => {
                let state = statesList[key];
                options.push(<option value={state.value}>{state.label}</option>);           
              });
      return options;
    }
    
    getCountries = ()=>{
      let options = [];      
      countries.countries.map((cntry, key) => {
        let country = countries.countries[key];

         if (typeof country.available != 'undefined' && country.available != null) {
            options.push(<option value={country.abbreviation}>{country.country}</option>);
          } else {
            options.push(<option value={country.abbreviation} disabled>{country.country}</option>);
          }
            
      })

      return options;
    }

    getOptions = (optList)=>{
      let options = [];
            optList.map((optIndex, key) => {
              let opt = optList[key];
              options.push(<option value={opt.value}>{opt.label}</option>);
              
            });
      return options;
    }

    render() {  
          const fieldData = this.props.fieldData;
          const fieldId = this.props.fieldId;
          const link = fieldData.link;
          const countryName = this.props.countryName;
          let options = [];
          if (link === "countries") {

            options = this.getCountries();

          } else if (link === "states") {

            options = this.getStates(countryName);

          } else if (link === "self") {       

            options = this.getOptions(fieldData.options);  
          }          

        return (
            <div className={ fieldData.colWidth+ ' mb-3'} ref={fieldId+"div"}>
                <label htmlFor={fieldId}>{fieldData.label}</label>
                {fieldData.required?<span className="asterisk" style={{color:'red'}}> *</span>:null}
                <select ref={fieldId}
                        id={fieldId}
                        key={fieldId}
                        defaultValue={fieldData.value}
                        onChange={(e) => {
                          this.props.changed(e);
                          this.props.parentChildHandler(e,fieldData.isDependent, fieldData.name);
                        }}
                        className="form-control">
                    {options}
                </select>
              </div>
        ); 
    }
}
export default Select;