import * as React from 'react';
import './style.css';
import Dashboard from 'Components/DashboardLayout';
import SingleHouse from 'Components/SingleHouse';
import { useSelector, useDispatch } from 'react-redux';
import {getListedProps} from "Services/ListProperty";


function MyHousePage(props) {
  const dispatch = useDispatch()
  const listedProps = useSelector(state => state.listedProps.listedProperties)

  React.useEffect(()=>{
    dispatch(getListedProps())
  }, []
  )
    return (
        <Dashboard>
          <div className="dashboardTitle">
            <h3>Listed Property</h3>
          </div>
          <div className="main">
            {listedProps && listedProps.map((data, index) => {
              return (
                  <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4" key={index}>
                    <SingleHouse data={data} adminPage={true}/>
                  </div>
              );
            })}
          </div>
        </Dashboard>
    );
}

export default MyHousePage;