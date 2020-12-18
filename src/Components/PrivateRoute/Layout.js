import React from 'react';
import Sidebar from "../PrivateRoute/SideNavBar";
// import Nav from "./Nav";
import PropTypes from "prop-types";

function Layout(props) {
    return (
        <div className="mainPanel">
            <Sidebar history={props.history} location={props.location} />
            <div >
              {props.children}
            </div>
        </div>
    );
}
Layout.propTypes = {
    accountsFetchTried: PropTypes.bool.isRequired
};
export default Layout