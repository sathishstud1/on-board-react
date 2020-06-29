import React, {Component} from 'react';
import SearchAppjson from "../../assets/data/SearchApps.json";
import axios from "axios";

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Card,
  CardBody,
  Col,
  Form,
  FormGroup,
  Input,
  Row,
  Table,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  ListGroup,
  ListGroupItem,
} from 'reactstrap';
import ReactPaginate from 'react-paginate';

function SearchRow(props) {
  const search = props.search
  const columnIds  = props.columnIds;
  const searchLink = `/search/${search._id}`;
  let rowtds = [];
  for(var i=0;i<columnIds.length;i++){
    rowtds.push(<td>{search[columnIds[i]]}</td>);
  }
  return (
    <tr key={search._id.toString()}>
      <th scope="row">
        <button className="btn btn-link p-0 m-0"
                type="button"
                onClick={() => {
                  props.toggle(search);
                }}>{search._id}</button>
      </th>      
      {rowtds}   
    </tr>
  )
}

class Search extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      modal: false,
      selectedSearchItem: null,
      searchBy: "_id",
      searchCondition: "",
      searchByValue: "",
      globalSearch: "",
      searches: [],
      masterSearchData: [],
      searchData: [],
      OriginalSearchData:[],
      searchDetails: [],
      pageSize: 5,
      showPaginationDropdown: false,
      currentPage: 0,
    }
    this.getSearchPageData = this.getSearchPageData.bind(this);
    this.setSearchBy = this.setSearchBy.bind(this);
    this.setSearchCondition = this.setSearchCondition.bind(this);
    this.setSearchByValue = this.setSearchByValue.bind(this);
    this.applySearchByFilter = this.applySearchByFilter.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.togglePaginationDropdown = this.togglePaginationDropdown.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.handleGlobalSearch = this.handleGlobalSearch.bind(this);
    this.searchStrings = [];
    this.searchTypes  = [];
    this.columnLabels = [];
    this.columnIds = [];
    //this.getSearchPageData();
  }

  getSearchPageData() {
    fetch('./assets/data/search-data.json')
      .then((res) => res.json())
      .then((searchData) => {
        /** -- Clone Search Data for future reference --
         *  -- this data should not applied with any filters, --
         *  -- on reset / clear filter this data will utilized --
         * */
        const masterSearchData = JSON.parse(JSON.stringify(searchData));
        this.setState({searchData, masterSearchData});
      });
  }

  toggleModal(selectedSearchItem) {
    this.setState({selectedSearchItem, modal: !this.state.modal});
  }

  togglePaginationDropdown(pageSize) {
    if (pageSize) {
      const pageCount = Math.ceil(this.state.searchData.length / pageSize);
      if (this.state.currentPage > (pageCount - 1)) {
        this.setState(
          {
            pageSize,
            currentPage: pageCount - 1,
            showPaginationDropdown: !this.state.showPaginationDropdown
          }
        );
      } else {
        this.setState({pageSize, showPaginationDropdown: !this.state.showPaginationDropdown});
      }
    } else {
      this.setState({showPaginationDropdown: !this.state.showPaginationDropdown});
    }
  }

  handlePageClick(data) {
    let selected = data.selected;
    this.setState({currentPage: data.selected});
  }

  handleGlobalSearch(event) {
    this.setState({searchByValue: ''});
    const globalSearch = event.target.value;
    this.setState({globalSearch});
    if (globalSearch.toString().trim().length > 0) {
        const searchData = this.state.OriginalSearchData.filter(data => {
        const keys = Object.keys(data);
        let isReferenceFound = false;
        keys.forEach(key => {
          if (data[key].toString().toLowerCase().indexOf(globalSearch.toString().toLowerCase()) >= 0) {
            isReferenceFound = true;
          }
        })
        return isReferenceFound;
      });
      this.setState({searchData});
    } else {
      const searchData = JSON.parse(JSON.stringify(this.state.OriginalSearchData));
      this.setState({searchData});
    }
  }

  setSearchBy(searchBy) {
    this.setState({searchBy});
  }

  setSearchCondition(searchCondition) {
    this.setState({searchCondition});
  }

  setSearchByValue(searchByValue) {
    /*if (this.state.searchBy === 'id' && this.state.searchByValue.trim().length > 0) {
      if (!isNaN(searchByValue)) {
        const convertedNumber = Number(searchByValue);
        this.setState({searchByValue});
      }
    } else {
      
    }*/
    this.setState({searchByValue});
  }

  applySearchByFilter() {
    this.setState({globalSearch: ''});

    if (this.state.searchByValue.toString().trim().length > 0) {
      let searchValue = this.state.searchByValue;
      let searchCriteria = this.state.searchBy;
      let searchCondition = this.state.searchCondition;

      if(searchCondition==null || typeof searchCondition =='undefined'){
        searchCondition = "=";
      }

      if(searchCriteria==null || typeof searchCriteria =='undefined'){
        searchCriteria = "_id";
      }else{
        searchCriteria = this.searchStrings[searchCriteria];
      }
      let isInteger = false;
      
      if(this.searchTypes[searchCriteria]=='number'){
        isInteger = true;
      }

      let postData = {
        searchValue: searchValue,
        searchCondition:searchCondition,
        searchCriteria:searchCriteria,
        columnIds: this.columnIds,
        isInteger: isInteger
      };
      axios
        .post("/searchAppData", postData)
        .then((response) => {
          if(response.data.status){
            let searchRes  = response.data.data;
            searchRes = [{"firstname":"Nagaga","appId":100051,"_id":100051,"ssn":"123456789","lastname":"ahhaha"}
            ,{"firstname":"Oscra","appId":100052,"_id":100052,"ssn":"83794839034","lastname":"White"}
            ,{"firstname":"","appId":100053,"_id":100053,"ssn":"","lastname":""}
            ,{"firstname":"Oscra","appId":100052,"_id":100052,"ssn":"83794839034","lastname":"White"}
            ,{"firstname":"Oscra","appId":100052,"_id":100052,"ssn":"83794839034","lastname":"White"}
            ,{"firstname":"Oscra","appId":100052,"_id":100052,"ssn":"83794839034","lastname":"White"}
            ,{"firstname":"Oscra","appId":100052,"_id":100052,"ssn":"83794839034","lastname":"White"}
            ,{"firstname":"Oscra","appId":100052,"_id":100052,"ssn":"83794839034","lastname":"White"}
            ,{"firstname":"Oscra","appId":100052,"_id":100052,"ssn":"83794839034","lastname":"White"}
            ,{"firstname":"Oscra","appId":100052,"_id":100052,"ssn":"83794839034","lastname":"White"}
            ,{"firstname":"Oscra","appId":100052,"_id":100052,"ssn":"83794839034","lastname":"White"}
            ,{"firstname":"Oscra","appId":100052,"_id":100052,"ssn":"83794839034","lastname":"White"}];
            this.setState({searchData: searchRes, OriginalSearchData: searchRes});
            //this.renderTable(response.data.data);
          }else{
            alert(response.data.message);
          } 
          
        })
        .catch((error) => {
          console.log(error);
        });
        
    } else {
      const searchData = JSON.parse(JSON.stringify(this.state.masterSearchData));
      this.setState({searchData});
    }
  }

  render() {
    let searchOpts = [];
    let searchCondOpts = [];
    let tabHeaders = [];
    this.searchStrings = SearchAppjson.searchStrings;
    this.searchTypes  = SearchAppjson.searchTypes;
    let sectionList = SearchAppjson.sectionList;
    Object.keys(sectionList).map((sectionIndex, index) => {
      let section = sectionList[index];
      if (typeof section.isSearch != "undefined" && section.isSearch) {
        let fields = section.fields;
        Object.keys(fields).map((fieldIndex, index) => {
          let field = fields[index];  

          if(field.name ==="searchCriteria"){
            let options = field.options;
            options.map((optKey, key) => {
              let opt = options[key];
              searchOpts.push( <option value={opt.value}>{opt.label}</option>);
            });                    
          }
          if(field.name ==="searchCondition"){
            let options = field.options;
            options.map((optKey, key) => {
              let opt = options[key];
              searchCondOpts.push( <option value={opt.value}>{opt.label}</option>);
            });
          }
        });
      }
      if (typeof section.isTable != "undefined" && section.isTable) {
        this.columnLabels = section.ColumnLabels;
        this.columnIds = section.ColumnIds;

        tabHeaders.push(<th className="border-dark" scope="col">APP ID </th>);
        this.columnLabels.map((headdKey, key) => {
          tabHeaders.push(<th className="border-dark" scope="col">{this.columnLabels[index]} </th>);
        });      
      }   
    });

    const pageCount = Math.ceil(this.state.searchData.length / this.state.pageSize);
    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={12}>
            <Card>
              <CardBody>
                <h4>Search By</h4>
                <Form className="row">
                  <FormGroup className="col-md-3 offset-md-1">
                    <Input autoComplete="off"
                           type="select"
                           name="searchBy"
                           id="searchBy"
                           onChange={e => this.setSearchBy(e.target.value)}
                           value={this.state.searchBy}
                           placeholder="Search By">
                      {searchOpts}
                    </Input>
                  </FormGroup>

                  <FormGroup className="col-md-3">
                    <Input autoComplete="off"
                           type="select"
                           name="condition"
                           id="condition"
                           onChange={e => this.setSearchCondition(e.target.value)}
                           value={this.state.searchCondition}
                           placeholder="Select Condition">
                     {searchCondOpts}
                    </Input>
                  </FormGroup>

                  <FormGroup className="col-md-3">
                    <Input autoComplete="off"
                           type="text"
                           name="Search Value"
                           id="searchByValue"
                           onChange={e => this.setSearchByValue(e.target.value)}
                           value={this.state.searchByValue}
                           placeholder="Value"/>
                  </FormGroup>

                  <div className="col-md-2">
                    <Button type="button"
                            onClick={this.applySearchByFilter}>Search</Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col lg={12}>
            <Card>
              <CardBody>
                {/* ___________________ Global Search ___________________ */}
                <FormGroup className="col-md-3 float-left">
                  <Input autoComplete="off"
                         type="text"
                         name="Search Value"
                         id="globalSearch"
                         onChange={this.handleGlobalSearch}
                         value={this.state.globalSearch}
                         placeholder="Global Search"/>
                </FormGroup>

                <div>
                  {/* ___________________ Pagination ___________________ */}
                  <div className="d-inline-block ml-2 float-right">
                    <ReactPaginate
                      previousLabel={'<'}
                      nextLabel={'>'}
                      breakLabel={'...'}
                      pageCount={pageCount}
                      marginPagesDisplayed={2}
                      pageRangeDisplayed={2}
                      forcePage={this.state.currentPage}
                      pageLinkClassName="page-link btn btn-link rounded-0"
                      previousLinkClassName="page-link btn btn-link rounded-0"
                      nextLinkClassName="page-link btn btn-link rounded-0"
                      breakLinkClassName="page-link btn btn-link rounded-0"
                      activeClassName="active"
                      pageClassName="page-item"
                      previousClassName="page-item"
                      breakClassName="page-item"
                      nextClassName="page-item"
                      disabledClassName="disabled"
                      containerClassName="pagination text-right"
                      onPageChange={this.handlePageClick}
                    />
                  </div>

                  {/* ___________________ Show Dropdown ___________________ */}
                  <Dropdown group
                            className="float-right"
                            isOpen={this.state.showPaginationDropdown}
                            size="sm"
                            toggle={() => this.togglePaginationDropdown(null)}>
                    <DropdownToggle caret
                                    className="p-2 bg-white">
                      Show
                      <span className="font-weight-bold ml-2 mr-2">
                        {this.state.pageSize > 9 ? this.state.pageSize : ('0' + this.state.pageSize)}
                      </span>
                    </DropdownToggle>
                    <DropdownMenu>
                      <ListGroup>
                        <ListGroupItem active={this.state.pageSize == 5}
                                       tag="a"
                                       onClick={() => this.togglePaginationDropdown(5)}
                                       action>5</ListGroupItem>
                        <ListGroupItem tag="a"
                                       onClick={() => this.togglePaginationDropdown(10)}
                                       active={this.state.pageSize == 10}
                                       action>10</ListGroupItem>
                        <ListGroupItem tag="a"
                                       onClick={() => this.togglePaginationDropdown(15)}
                                       active={this.state.pageSize == 15}
                                       action>15</ListGroupItem>
                        <ListGroupItem tag="a"
                                       onClick={() => this.togglePaginationDropdown(20)}
                                       active={this.state.pageSize == 20}
                                       action>20</ListGroupItem>
                      </ListGroup>
                    </DropdownMenu>
                  </Dropdown>


                </div>

                <Table responsive
                       striped
                       className="border">
                  <thead className="bg-dark border-dark">
                  <tr>
                    {tabHeaders}
                  </tr>
                  </thead>
                  <tbody>
                  {
                    this.state.searchData
                      .slice(
                        this.state.currentPage * this.state.pageSize,
                        (this.state.currentPage + 1) * this.state.pageSize
                      )
                      .map((search, index) =>
                        <SearchRow key={index}
                                   toggle={this.toggleModal}
                                   search={search} columnIds = {this.columnIds}/>
                      )
                  }
                  </tbody>
                </Table>

              </CardBody>
            </Card>
          </Col>
        </Row>
        <Modal isOpen={this.state.modal}
               toggle={() => this.toggleModal(null)}
               backdrop={true}
               keyboard={true}>
          <ModalHeader toggle={() => this.toggleModal(null)}>Modal title</ModalHeader>
          <ModalBody>
            <pre>{JSON.stringify(this.state.selectedSearchItem, null, 2)}</pre>
          </ModalBody>
          <ModalFooter>
            <Button color="primary"
                    onClick={() => this.toggleModal(null)}>Do Something</Button>{' '}
            <Button color="secondary"
                    onClick={() => this.toggleModal(null)}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

export default Search;
