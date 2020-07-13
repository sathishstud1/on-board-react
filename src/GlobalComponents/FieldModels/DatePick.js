import React, { Component } from "react";
import { Row } from "reactstrap";
import DatePicker from "react-datepicker/es";
import "react-datepicker/dist/react-datepicker.min.css";

class DatePicker extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      selectedDate: new Date(),
      file: null,
    };
    this.setSelectedDate = this.setSelectedDate.bind(this);
    this.setFile = this.setFile.bind(this);
  }

  setSelectedDate(selectedDate) {
    this.setState({ selectedDate });
  }

  setFile(event) {
    this.setState();
  }

  render() {
    return (
      <div className="animated fadeIn bureau">
        <Row>
          <DatePicker
            onChange={this.setSelectedDate}
            todayButton="Today"
            selected={this.state.selectedDate}
          />
        </Row>
      </div>
    );
  }
}

module.exports = DatePicker;
