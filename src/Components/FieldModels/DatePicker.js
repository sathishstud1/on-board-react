import React, { Component } from "react";
import DatePicker from "react-datepicker/es";
import "react-datepicker/dist/react-datepicker.min.css";

class DatePick extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      selectedDate: new Date()
    };
    this.selectedValue = new Date();
  }
  componentDidMount() {
    this.setState({selectedDate:  this.selectedValue });
    this.props.loadRefObjects(this.props.fieldId,this);
  }

  getYear = (date)=>{
    return date.getYear();
  }

  getMonth = (date)=>{
    return date.getMonth();
  }

  render() {
    const fieldData = this.props.fieldData;
    const fieldId = this.props.fieldId;
    const year = (new Date()).getFullYear();
    let years = [];
    if(fieldData.order && fieldData.order==="desc"){
      years = Array.from(new Array(fieldData.totalyears),( val, index) =>  year - index);
    }else{
      years = Array.from(new Array(fieldData.totalyears),( val, index) =>  index + year);
    }
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];

    if(fieldData.value && fieldData.value!=='' && !isNaN(fieldData.value)){
      this.selectedValue = new Date(parseInt(fieldData.value));
    }
    return (     
      <div className={ fieldData.colWidth+ ' mb-3'} ref={fieldId+"div"}>
        <label htmlFor={fieldId}>{fieldData.label} <label style={{color:'grey'}}>(MM/DD/YYYY)</label></label>
        {fieldData.required?<span className="asterisk" style={{color:'red'}}> *</span>:null}
        <br/>
        <DatePicker className={fieldData.colWidth+" form-control"}
            renderCustomHeader={({
              date,
              changeYear,
              changeMonth,
              decreaseMonth,
              increaseMonth,
              prevMonthButtonDisabled,
              nextMonthButtonDisabled
            }) => (
              <div
                style={{
                  margin: 10,
                  display: "flex",
                  justifyContent: "center"
                }}
              >
                <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                  {"<"}
                </button>
                <select
                  value={years[this.getYear(date)]}
                  onChange={({ target: { value } }) => changeYear(value)}
                >
                  {years.map(option => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>

                <select
                  value={months[this.getMonth(date)]}
                  onChange={({ target: { value } }) =>
                    changeMonth(months.indexOf(value))
                  }
                >
                  {months.map(option => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>

                <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                  {">"}
                </button>
              </div>
            )}
            className="form-control"
            required={fieldData.required}
            id={fieldId}
            name={fieldId}
            ref={fieldId}
            onChange={(event)=>{
              if(event && years.includes(event.getFullYear())){
                this.props.dateChanged(event,fieldId);
                this.setState({selectedDate: event });
              }else{
                this.props.dateChanged(new Date(),fieldId);
                this.setState({selectedDate: new Date() });
              } 
              this.props.parentChildHandler(event,fieldData.isDependent,fieldData.name);           
            }}          
            selected = {this.state.selectedDate}
          />
        <div className="invalid-feedback">
          Please choose {fieldData.label}.
        </div>
    </div>
    );
  }
}

export default DatePick;
