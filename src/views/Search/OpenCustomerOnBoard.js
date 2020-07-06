import React from "react";
import axios from "../../axios-instance";
import ViewCustomerOnboard from "../Customers/ViewCustomerOnboard";
import customerOnboardJson from "../../assets/data/cutomerOnboard.json";

class OpenCustomerOnBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
    this.appId = this.props.appId;
    this.json = customerOnboardJson;
    if (typeof this.appId != "undefined" && this.appId != "") {
      this.getJson();
    } else {
    this.setState({ loading: false });
    }
  }

  async getJson() {
    let postData = {
      appId:this.appId
    };
    return axios
      .post("/getJson" ,postData)
      .then((response) => {
        if(response.data.status){
            this.json = JSON.parse(response.data.data);
            this.setState({ loading: false });
        }      
      });
  }

  
  render() {
    if (this.state.loading) {
      return <div className='white-overlay'><span>Loading....</span></div>;
    }
    return (
      <ViewCustomerOnboard json={this.json}/>
    );
  }
}
export default OpenCustomerOnBoard;
