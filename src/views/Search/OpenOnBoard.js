import React from "react";
import axios from "../../axios-instance";
import ViewOnboard from "../../Components/ViewOnboard";

class OpenOnBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
    this.appId = this.props.appId;
    if (typeof this.appId !== "undefined" && this.appId !== "") {
      this.getJson();
    } else {
      this.setState({ loading: false });
    }
  }

  async getJson() {
    let postData = {
      appId: this.appId,
    };
    let URL = '/getJson';
    if(this.props.isAppInfo){
      URL = '/getAppInfoJson';
    }
    return axios
      .post(URL, postData)
      .then((response) => {
        if (response.data.status) {
          this.json = JSON.parse(response.data.data);
          this.setState({ loading: false });
        } else {
          console.log(response.data.message);
        }
      })
      .catch((error) => {
        this.props.history.push({
          pathname: "/error",
          errorObj: error,
          curr_loc: this.props.location.pathname,
        });
      });
  }

  render() {
    if (this.state.loading) {
      return (
        <div className="white-overlay">
          <span>Loading....</span>
        </div>
      );
    }
    return <ViewOnboard json={this.json} isAppInfo={this.props.isAppInfo}/>;
  }
}
export default OpenOnBoard;
