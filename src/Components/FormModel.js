import React from "react";
import Input from "./FieldModels/Input";
import TextArea from "./FieldModels/TextArea";
import Select from "./FieldModels/Select";
import Radio from "./FieldModels/Radio";
import CheckBox from "./FieldModels/CheckBox";
import Button from "./FieldModels/Button";
import DatePick from "./FieldModels/DatePicker";

class FormModel extends React.Component {
  render() {
    let arr = this.props.data;
    let formfields = [];

    Object.keys(arr).map((field, index) => {
      let fieldData = arr[field];
      let fieldId = fieldData.name + this.props.uniqueId;      
      switch (fieldData.type) {
        case "text":
          formfields.push(
            <Input
              key={"inputField"+fieldId}
              fieldData={fieldData}
              fieldId={fieldId}
              changed={this.props.changed}
              parentChildHandler= {this.props.parentChildHandler}
              loadRefObjects={this.props.loadRefObjects}
            />
          );
          break;
        case "textarea":
          formfields.push(
            <TextArea
              fieldData={fieldData}
              fieldId={fieldId}
              key={"textAreaField"+fieldId}
              changed={this.props.changed}
            />
          );
          break;
        case "radiogroup":
          formfields.push(
            <Radio
              fieldData={fieldData}
              fieldId={fieldId}
              key={"radioField"+fieldId}
              changed={this.props.changed}
              parentChildHandler= {this.props.parentChildHandler}
              loadRefObjects={this.props.loadRefObjects}
            />
          );
          break;
        case "checkbox":
          formfields.push(
            <CheckBox
              fieldData={fieldData}
              fieldId={fieldId}
              key={"checkboxField"+fieldId}
              changed={this.props.changed}
              parentChildHandler= {this.props.parentChildHandler}
              loadRefObjects={this.props.loadRefObjects}
            />
          );
          break;
        case "select":
          formfields.push(
            <Select
              fieldData={fieldData}
              fieldId={fieldId}
              key={"selectField"+fieldId}
              changed={this.props.changed}
              parentChildHandler= {this.props.parentChildHandler}
              loadRefObjects={this.props.loadRefObjects}
              countryName={this.props.countryName}
            />
          );
          break;
        case "button":
          if (fieldData.name === "searchBtn") {
            formfields.push(
              <Button
                fieldData={fieldData}
                fieldId={fieldId}
                key={"buttonField"+fieldId}
                clicked={this.props.searchHandler}
              />
            );
          } else {
            formfields.push(
              <Button
                fieldData={fieldData}
                fieldId={fieldId}
                clicked={fieldData.clicked}
                key={"buttonField"+fieldId}
              />
            );
          }
          break;
        case "DatePicker":
          formfields.push(
            <DatePick
              fieldData={fieldData}
              fieldId={fieldId}
              key={"datePicker"+fieldId}
              dateChanged={this.props.dateChanged}
              loadRefObjects={this.props.loadRefObjects}
              parentChildHandler= {this.props.parentChildHandler}
            />
          );
          break;
        default:
          formfields.push(
            <div className="col-md-4 mb-3" key={"defaultField"+fieldId}>
              <label htmlFor={fieldId}>{fieldData.label}</label>
              <input
                className="form-control"
                type="text"
                id={fieldId}
                name={fieldId}
                ref={fieldId}
                defaultValue={fieldData.value}
                readOnly={true}
              />
            </div>
          );
      }
    });

    return <div className="form-row">{formfields}</div>;
  }
}
//{this.props.stateOptions[fieldId]}
export default FormModel;
