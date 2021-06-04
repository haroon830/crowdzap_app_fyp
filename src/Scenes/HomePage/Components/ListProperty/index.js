import * as React from 'react';
import './style.css';
import {connect} from 'react-redux'
import Loader from 'react-loader-spinner'
import {getListedProps} from "Services/ListProperty";
import PlaceHolder from 'Components/Common/PlaceHolder'
import SingleHouse from 'Components/SingleHouse';

class ListProperty extends React.Component{
  componentDidMount() {
    this.props.getListedProps()
  }

  listedProperties () {
    return(
        <>
          {this.props.listedProps.map((data, index) => {
              return (
                  <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4" key={index}>
                    <SingleHouse data={data} admin={false}/>
                  </div>
              );
          })}
        </>
    )
  }

  render() {
    let display = null
    if(this.props.tried && this.props.listedProps) {
      display=  this.listedProperties()
    }
    if(this.props.tried && !this.props.loading && !this.props.listedProps){
      display = <PlaceHolder type="listedProperties"/>
    }
    return (
      <div className="listProperty">
        <div className="row listPropertyHeader">
          <h3>Recently Listed Properties</h3>
          <h5>Fusce risus metus, placerat in consectetur eu, porttitor a est sed sed dolor lorem cras adipiscing</h5>
        </div>
        <div className="row listPropertyContent">
          <div style={{paddingLeft:"40%"}}>
            <Loader
                type="Grid" color="#00A9A4" height={80} width={80} visible={this.props.loading}
            />
          </div>
          {
            display
          }
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
    { getListedProps}
)(ListProperty)