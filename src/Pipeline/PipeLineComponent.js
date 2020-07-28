import React, {Component} from "react";
import './pipe-line-component.scss';

export class PipeLineComponent extends Component {
  render() {
    return (
      <ul className="pipe-line position-relative w-100">
        {
          this.props.pipelineData.map(
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
    );
  }
}
