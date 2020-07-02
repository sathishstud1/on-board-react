import React from 'react';
import ReactDOM from 'react-dom';
import CreateViewPage from '../../GlobalComponents/CreateViewPage';
import CustomerOnboard from './CustomerOnboard';

class ViewCustomerOnboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customerOnboardJson: this.props.json,
      redirect: false,
      currentPageId: 0,
      isEdit:false
    };
    this.PageLength = 0;
    this.PageList = [];
  }

  editClicked = ()=>{
    this.setState({isEdit:true});
  }

  changePage = (pageId) => {
    for (let i = 0; i < this.PageLength; i++) {
      ReactDOM.findDOMNode(this.refs["ShowPage" + i]).style.display = 'none';
    }
    ReactDOM.findDOMNode(this.refs["ShowPage" + pageId]).style.display = 'block';
    ReactDOM.findDOMNode(this.refs["previousBtn"]).style.display = 'block';
    ReactDOM.findDOMNode(this.refs["nextBtn"]).style.display = 'block';
    if (pageId == (this.PageLength - 1)) {
      ReactDOM.findDOMNode(this.refs["nextBtn"]).style.display = 'none';
    }
    if (pageId == 0) {
      ReactDOM.findDOMNode(this.refs["previousBtn"]).style.display = 'none';
    }
    this.CurrentPageId = pageId;
    this.setState({currentPageId: pageId});
  }

  nextPage = () => {

    if (this.CurrentPageId == (this.PageLength - 1)) {
      return;
    }
    ReactDOM.findDOMNode(this.refs["previousBtn"]).style.display = 'block';
    this.CurrentPageId = this.CurrentPageId + 1;
    if (this.CurrentPageId == (this.PageLength - 1)) {
      ReactDOM.findDOMNode(this.refs["nextBtn"]).style.display = 'none';
    }

    for (let i = 0; i < this.PageLength; i++) {
      ReactDOM.findDOMNode(this.refs["ShowPage" + i]).style.display = 'none';
    }
    ReactDOM.findDOMNode(this.refs["ShowPage" + this.CurrentPageId]).style.display = 'block';
  }

  previousPage = () => {
    if (this.CurrentPageId == 0) {
      return;
    }
    ReactDOM.findDOMNode(this.refs["nextBtn"]).style.display = 'block';

    this.CurrentPageId = this.CurrentPageId - 1;
    if (this.CurrentPageId == 0) {
      ReactDOM.findDOMNode(this.refs["previousBtn"]).style.display = 'none';
    }
    for (let i = 0; i < this.PageLength; i++) {
      ReactDOM.findDOMNode(this.refs["ShowPage" + i]).style.display = 'none';
    }
    ReactDOM.findDOMNode(this.refs["ShowPage" + this.CurrentPageId]).style.display = 'block';
  }  

  componentDidMount() {    
  }

  renderPage = (Page, PageId, PageLength) => {
    let refId = 'ShowPage' + PageId;
    let divstyle = {
      display: 'none'
    }
    if (PageId == 0) {
      divstyle = {}
    }
    return <div ref={refId}
                key={'createPage' + PageId}
                style={divstyle}>
      <CreateViewPage Page={Page}
                  PageLength={PageLength}
                  PageId={PageId}/>
    </div>;
  }

  render() {
    /*if (this.state.redirect) {
      return <Redirect to='/'/>;
    }*/
    let items = [];
    let tabs = [];
    let btns = [];
    let pages = this.props.json.PageList;
    this.PageList = [];
    this.CurrentPageId = 0;
    this.PageLength = 0;
    //Pages
    Object.keys(pages).map((pageIndex, index) => {
      this.PageList.push(pages[index]);
    });
    this.PageLength = this.PageList.length;
    for (let i = 0; i < this.PageLength; i++) {
      let tabId = 'pagebtn' + i;
      let className  = 'btn btn-outline-light rounded-0 text-dark';
      if(this.state.currentPageId === i){
        className = className + ' active';
      }
      tabs.push(
        <button className={className}
                onClick={() => this.changePage(i)}
                id={tabId}
                type="button">
          {this.PageList[i].PageTitle}
        </button>
      );

      items.push(
        this.renderPage(this.PageList[i], i, this.PageLength)
      );
    }
    btns.push(
      <button ref="previousBtn"
              className="btn btn-primary mr-3"
              key='previousPage'
              onClick={() => this.previousPage()}
              type="button">
        Previous</button>
    );
    btns.push(
      <button className="btn btn-primary"
              key='nextPage'
              ref="nextBtn"
              onClick={() => this.nextPage()}
              type="button">
        Next</button>
    );
    return (
      <div>
          {this.state.isEdit? <CustomerOnboard json={this.props.json}/>:
            <div>
                <button className="btn btn-primary"
                    key='nextPage'
                    ref="nextBtn"
                    onClick={() => this.editClicked()}
                    type="button"
                    style={{float:'right'}}>
                Edit</button>
                <div className="border-bottom">
                    {tabs}
                </div>
                <div>{items} </div>
                <div className="text-right float-right">
                    {btns}
                </div>
                <div className="clearfix"></div>
            </div>
          }
         
      </div>

    );
  }
}

export default ViewCustomerOnboard;
