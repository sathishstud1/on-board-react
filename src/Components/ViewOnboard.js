import React from 'react';
import ReactDOM from 'react-dom';
import CreateViewPage from './CreateViewPage';
import Onboard from './Onboard';
import PageNavigation from './PageNavigation';

const Bureau = React.lazy(() => import("../views/Business Bureau/Bureau"));

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
    if (PageId === 0) {
      divstyle = {}
    }
    return <div ref={refId}
                key={'createPage' + PageId}
                style={divstyle}>
      <CreateViewPage Page={Page}
                  PageLength={PageLength}
                  PageId={PageId}
                  currentPageId={PageId}/>
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
    //let className  = 'btn btn-outline-light rounded-0 text-dark';
    let tabStyle = {backgroundColor: '#20a8d8', 
                    borderColor: '#20a8d8',
                    paddingTop: '1%',
                    float: 'left', 
                    fontSize: '18px', 
                    cursor: 'pointer',
                    paddingRight: '2%',
                    paddingLeft: '2%'}
    let currtabStyle = {}

    for (let i = 0; i < this.PageLength; i++) {
      let tabId = 'pagebtn' + i;
      //let tabStyle = className;
      
      currtabStyle = Object.assign({}, tabStyle);
      
      if(this.state.currentPageId === i){
        currtabStyle ['borderBottom'] = '2px solid white';
      }
      tabs.push(
        <li >
          <a style={currtabStyle}
                  onClick={() => {
                      PageNavigation.changePage(i, this.PageLength, "ShowPage", "previousBtn", "nextBtn", this, ReactDOM);
                      this.setState({currentPageId: i});
                                    
                  }}
                  id={tabId}
                  key={tabId}
                  >            
            <span style={{color:'white'}}>{this.PageList[i].PageTitle}</span>
          </a>
        </li>
      );

      items.push(
        this.renderPage(this.PageList[i], i, this.PageLength)
      );
    }     

    const pageId = this.PageLength;

    currtabStyle = Object.assign({}, tabStyle);
      
    if(this.state.currentPageId === pageId){
      currtabStyle ['borderBottom'] = '2px solid white';
    }

      tabs.push(
        <li >
          <a style={currtabStyle}
                onClick={() => {
                  PageNavigation.changePage(pageId, this.PageLength, "ShowPage", "previousBtn", "nextBtn", this, ReactDOM);
                  this.setState({currentPageId: pageId});
                }}
                id="bureauId"
                key={"bureauId"}
                type="button">
          <span style={{color:'white'}}>Bureau</span>
          </a>
        </li>
      );
      items.push(<div ref={'ShowPage' + pageId}
                      key={'createPage' + pageId}
                      style={{display: 'none'}}>
                  <Bureau tin={800914632} id={200030}/>
                </div>);
      this.PageLength = pageId +1;

    btns.push(
      <div style={{display: 'inline-block'}}><button ref="previousBtn"
              className="btn btn-primary mr-3"
              key='previousPage'
              onClick={() => {
                  const pageId = PageNavigation.previousPage(this.state.currentPageId, this.PageLength, "ShowPage", "previousBtn", "nextBtn", this, ReactDOM);
                  this.setState({currentPageId: pageId});               
              }}
              type="button"
              style={{display: 'inline-block'}}>
        Previous</button></div>
    );
    btns.push(
      <div style={{display: 'inline-block'}}><button className="btn btn-primary mr-3"
              key='nextPage'
              ref="nextBtn"
              onClick={() => {
                  const pageId = PageNavigation.nextPage(this.state.currentPageId, this.PageLength, "ShowPage", "previousBtn", "nextBtn", this, ReactDOM);
                  this.setState({currentPageId: pageId});                
              }}
              type="button"
              >
        Next</button></div>
    );
    return (
      <div>
          {this.state.isEdit? <Onboard json={this.props.json} isUpdate={true}/>:
            <div style={{boxSizing: 'border-box', 
            boxShadow: '0 10px 16px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19)'}}>
                <button className="btn btn-primary"
                    key='nextPage'
                    ref="nextBtn"
                    onClick={() => this.editClicked()}
                    type="button"
                    style={{float:'right', padding: '.5%',fontSize: '20px'}}>
                Edit</button>
                <ul style={{backgroundColor: '#20a8d8',
                    height:'7vh', 
                          borderRadius: '.3rem .3rem 0 0',
                          listStyleType:'none'}}>
                    {tabs.length>1?tabs:null}
              </ul>
                <div style={{paddingRight: '2%',paddingLeft: '2%',paddingBottom: '5%'}}>{items} </div>
                <div className="text-right float-right" style={{width: '20%'}}>
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
