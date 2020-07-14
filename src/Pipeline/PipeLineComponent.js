import React, {Component} from "react";
import './pipe-line-component.scss';
import {Card, CardBody} from "reactstrap";
import CardHeader from "reactstrap/lib/CardHeader";

export class PipeLineComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pipelineData: [
        {value: 206, label: 'Submitted'},
        {value: 17, label: 'Manual Review'},
        {value: 0, label: 'Approved'},
        {value: 133, label: 'Soft Declined'},
        {value: 14, label: 'Counter Offer'},
        {value: 4, label: 'Withdrawn'},
        {value: 3, label: 'Declined'},
        {value: 0, label: 'Offer Expired'},
        {value: 7, label: 'Fraud Review'},
        {value: 42, label: 'Documentation'},
        {value: 16, label: 'Booked'},
        {value: 9, label: 'Booking Failed'},
      ]
    }
  }

  render() {

    return (
      <ul className="pipe-line position-relative w-100">
        {
          this.state.pipelineData.map(
            value => {
              return <li key={value.label} title={value.label} className="position-relative">
                {value.value}
                <label>
                  <span>{value.label}</span>
                </label>
              </li>
            }
          )
        }
      </ul>

      /*<Card>
        <CardBody>
          <h4 className="mb-2 border-bottom pb-4 text-muted">Status Pipeline</h4>

        </CardBody>
      </Card>*/
    );
  }
}
