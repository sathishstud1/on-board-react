import React, { useState } from "react";

class Button extends React.Component {
    constructor(props) {
      super(props);
      this.state = {    
      };
    }     

    render() {  
        const fieldData = this.props.fieldData;
        const fieldId = this.props.fieldId;
        return (
            <div className={'my-auto ' + fieldData.colWidth}>
                <button onClick={this.props.clicked}
                        className="btn btn-primary mr-3"
                        id={fieldId}
                        type={fieldData.type}>
                  {fieldData.label}
                </button>
              </div>
        ); 
    }
}
export default Button;