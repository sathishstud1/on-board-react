import React, { Component } from "react";
import { Row } from "reactstrap";
import DatePicker from "react-datepicker/es";
import "react-datepicker/dist/react-datepicker.min.css";

class Bureau extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      selectedDate: new Date(),
      file: null,
    };
    this.setSelectedDate = this.setSelectedDate.bind(this);
  }

  setSelectedDate(selectedDate) {
    this.setState({ selectedDate });
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

export default Bureau;
