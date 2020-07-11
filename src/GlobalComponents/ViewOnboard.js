import React from 'react';
import ReactDOM from 'react-dom';
import CreateViewPage from './CreateViewPage';
import Onboard from './Onboard';
import PageNavigation from './PageNavigation';

class ViewOnboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
                onClick={() => {
                    PageNavigation.changePage(i, this.PageLength, "ShowPage", "previousBtn", "nextBtn", this, ReactDOM);
                    this.setState({currentPageId: i});
                                  
                }}
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
              onClick={() => {
                  const pageId = PageNavigation.previousPage(this.state.currentPageId, this.PageLength, "ShowPage", "previousBtn", "nextBtn", this, ReactDOM);
                  this.setState({currentPageId: pageId});               
              }}
              type="button">
        Previous</button>
    );
    btns.push(
      <button className="btn btn-primary"
              key='nextPage'
              ref="nextBtn"
              onClick={() => {
                  const pageId = PageNavigation.nextPage(this.state.currentPageId, this.PageLength, "ShowPage", "previousBtn", "nextBtn", this, ReactDOM);
                  this.setState({currentPageId: pageId});                
              }}
              type="button">
        Next</button>
    );
    return (
      <div>
          {this.state.isEdit? <Onboard json={this.props.json} isUpdate={true}/>:
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

export default ViewOnboard;