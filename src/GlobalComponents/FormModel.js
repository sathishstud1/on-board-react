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
            <div className={'form-group ' + fieldData.colWidth}>
              <label htmlFor={fieldId}>{fieldData.label}</label>
              <input className="form-control"
                     type={fieldData.type}
                     required={fieldData.required}
                     id={fieldId}
                     name={fieldId}
                     ref={fieldId}
                     onChange={this.props.changed}
                     defaultValue={fieldData.value}/>
            </div>
          );
          break;
        case('textarea'):
          formfields.push(
            <div className={'form-group ' + fieldData.colWidth}>
              <label htmlFor={fieldId}>{fieldData.label}</label>
              <textarea className="form-control"
                        defaultValue={fieldData.value}
                        required={fieldData.required}
                        id={fieldId}
                        name={fieldId}
                        ref={fieldId}
                        onChange={this.props.changed}/>
            </div>
          );
          break;
        case('radiogroup'):
          formfields.push(
            <div className={'form-group ' + fieldData.colWidth}>
              <label className="d-block mb-3">{fieldData.label}</label>
              {
                Object.values(fieldData.values).map((value, _index) => {
                  var ids = fieldId + _index;
                  let val = fieldData.value;
                  let checkFlag = false;
                  if (val && val === fieldData.values[index]) {
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
                             defaultChecked={checkFlag}/>
                      <label className="form-check-label"
                             for={ids}>
                        {value}
                      </label>
                    </div>
                  )
                })
              }
            </div>
          );
          break;
        case('select'):
          var link = fieldData.link;
          var options = [];
          if (link == "countries") {
            countries.countries.map((cntry, key) => {
              let country = countries.countries[key];
              if (typeof country.isSelected != 'undefined' && country.isSelected != null) {
                options.push(<option value={country.abbreviation}
                                     selected>{country.country}</option>);
              } else if (typeof country.available != 'undefined' && country.available != null) {
                options.push(<option value={country.abbreviation}>{country.country}</option>);
              } else {
                options.push(<option value={country.abbreviation}
                                     disabled>{country.country}</option>);
              }

            })
          } else if (link == "states") {
            let statesList = states.US;
            statesList.map((stateKey, key) => {
              let state = statesList[key];
              options.push(<option value={state.value}>{state.label}</option>);
            });
          } else if (link == "self") {
            var optList = fieldData.options;
            optList.map((optIndex, key) => {
              let opt = optList[key];
              options.push(<option value={opt.value}>{opt.label}</option>);
            });
          }
          if (typeof fieldData.dependent != 'undefined' && fieldData.dependent) {
            formfields.push(
              <div className={'form-group ' + fieldData.colWidth}>
                <label htmlFor={fieldId}>{fieldData.label}</label>
                <select ref={fieldId}
                        id={fieldId}
                        onChange={this.props.changed}
                        className="form-control">
                  {this.props.stateOptions[fieldId]}
                </select>
              </div>
            );
          } else {
            formfields.push(
              <div className={'form-group ' + fieldData.colWidth}>
                <label htmlFor={fieldId}>{fieldData.label}</label>
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
                        className="btn btn-primary mt-2"
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
                        className="btn btn-primary mt-2"
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
      <div className="form-row mb-3">
        {formfields}
      </div>
    );
  }
}

export default FormModel;
