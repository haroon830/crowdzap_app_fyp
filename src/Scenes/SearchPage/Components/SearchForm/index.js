import * as React from 'react';
import SelectComponent from 'Components/SelectComponent';
import SingleHouse from 'Components/SingleHouse';
import SearchMap from '../SearchMap';
import './style.css'
import { Icon } from 'react-fa';
import Loader from 'react-loader-spinner'
import {connect} from "react-redux";
import {getListedProps, getQueryListedProps} from "Services/ListProperty";
import SearchBar from "Components/DashboardLayout/Components/Header/Components/SearchForm"
import PlaceHolder from "Components/Common/PlaceHolder";


class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resultTab: 'list',
      searching: false,
      searchData: null
    };
  }

  componentDidMount() {
    //if there is no data and tried is false
    if(!this.props.tried && !this.props.listedProps){
      this.props.getListedProps()
    }
  }

  changeResultTab = (tab) => {
    if (tab !== this.state.resultTab) {
      this.setState({
        resultTab: tab
      });
    }
  }
  resultList = () => {
    return (
      <div className="resultsList">
        <div className="row">
          {this.props.listedProps.map((data, index) => {
            return (
              <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6" key={index}>
                <SingleHouse data={data} admin={false}/>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
  resultMap = () => {
    return (
      <div className="resultsMap">
        <SearchMap />
      </div>
    );
  }

  searchResultList = () => {
    return (
      <div className="resultsList">
        <div className="row">
          {this.state.searchData.map((data, index) => {
            return (
              <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6" key={index}>
                <SingleHouse data={data} admin={false}/>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  searchData = (queryValue)=>{
    if(queryValue !== ""){
      this.setState({
        searching:true,
        searchData:null
      })
      this.props.getQueryListedProps(queryValue, this.searchDataCB)
    }else{
      this.setState({
        searching : false
      })
    }
  }

  searchDataCB = (data)=>{
    if(data.length>0){
        this.setState({
          searchData: data
      })
    }    
  }

  render() {
    let resultBody=null
    if(this.state.searching){
      //if user is searching and founded some data
      if(this.state.searchData){
        resultBody = this.searchResultList()
      }
    }else{
      if(this.props.listedProps){
        resultBody = this.state.resultTab === 'list' ? this.resultList() : this.resultMap()
      }
        //if listedProps null and also not in loading state
      if(!this.props.listedProps && !this.props.loading){
        resultBody = <PlaceHolder type="listedProperties"/>
      }
    }
    
    
    return (
      <div className="searchForm">
        <div className="filterBox">
          <div className="row form-group">
            <div className="col-xs-12 col-sm-8 col-md-6 yearOfBirth">
              <h4>Ongoing Projects</h4>
              <SearchBar search={this.searchData}/>
            </div>
          </div>
        </div>
        <div className="resultTable">
          <div className="resultTab">
            <ul>
              <li 
                className={this.state.resultTab === 'list' ? 'active' : ''}
                onClick={(e) => this.changeResultTab('list')}
              >
                <a><Icon name="th-list" /> Listing view</a>
              </li>
              <li
                className={this.state.resultTab === 'map' ? 'active' : ''}
                onClick={(e) => this.changeResultTab('map')}
              >
                <a><Icon name="map-o" /> Map view</a>
              </li>
            </ul>
          </div>
          <div className="resultBody">
            <Loader
                type="Grid" color="#00A9A4" height={80} width={80} visible={this.props.loading}
            />
            {resultBody}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.listedProps.loading,
  listedProps: state.listedProps.listedProperties,
  tried: state.listedProps.tried,
  filterBy: state.listedProps.filterBy
});
export default connect(
    mapStateToProps,
    { getListedProps, getQueryListedProps}
)(SearchForm);