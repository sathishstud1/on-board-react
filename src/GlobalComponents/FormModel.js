import React from 'react';
import countries from "../assets/data/Dropdowns/countries.json";
import states from "../assets/data/Dropdowns/states.json";

class FormModel extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    let arr = this.props.data;
    let formfields = [];    
    
    Object.keys(arr).map((field, index) => {
      let fieldData = arr[field];
      let fieldId = fieldData.name + this.props.uniqueId;
      /*if (fieldData.type != "button") {
        formfields.push(<label style={mystyle}>{fieldData.label}</label>);
      }*/
      switch (fieldData.type) {
        case('text'):
          formfields.push(
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
          break;
        case('textarea'):
          formfields.push(
            <div className={ fieldData.colWidth+ ' mb-3'}>
              <label htmlFor={fieldId}>{fieldData.label}</label>
              {fieldData.required?<span className="asterisk" style={{color:'red'}}> *</span>:null}
              <textarea className="form-control"
                        defaultValue={fieldData.value}
                        required={fieldData.required}
                        id={fieldId}
                        name={fieldId}
                        ref={fieldId}
                        onChange={this.props.changed}/>
              <div class="invalid-feedback">
                Please choose {fieldData.label}.
              </div>
            </div>
          );
          break;
        case('radiogroup'):
          formfields.push(
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
          break;
        case('checkbox'):         
        formfields.push(
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
        break;
        case('select'):
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
          if (typeof fieldData.dependent != 'undefined' && fieldData.dependent) {
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
          }

          break;
        case('button'):
          if (fieldData.name == "searchBtn") {
            formfields.push(
              <div className={'my-auto ' + fieldData.colWidth}>
                <button onClick={this.props.searchHandler}
                        className="btn btn-primary mr-3"
                        id={fieldId}
                        type={fieldData.type}>
                  {fieldData.label}
                </button>
              </div>
            );
          } else {
            formfields.push(
              <div className={'my-auto ' + fieldData.colWidth}>
                <button onClick={fieldData.clicked}
                        className="btn btn-primary mr-3"
                        id={fieldId}
                        type={fieldData.type}>
                  {fieldData.label}
                </button>
              </div>
            );
          }

          break;
        default:
          formfields.push(<br/>);
      }
    });

    return (
      <div className="form-row">
        {formfields}
      </div>
    );
  }
}
//{this.props.stateOptions[fieldId]}
export default FormModel;
