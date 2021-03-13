import * as React from 'react';
import './Bootstrap/bootstrap.min.css';
import './style.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import HomePage from 'Scenes/HomePage';
import SearchPage from 'Scenes/SearchPage';
import WalletPage from 'Scenes/WalletPage';
import AuthorityContract from "Scenes/AuthorithyContractPage";
import CreateTokenizedAsset from "Scenes/TokenizingPropertyPage";
import Profiling from 'Scenes/Profiling'
import jwt_decode from "jwt-decode"
import MyHousePage from 'Scenes/MyhousePage';
import store from '../../Redux'
import LocalStore from "Config/localStore";
import {setCurrentUser} from "Redux/User";
import {logoutUser} from "Services/User";
import PrivateRoute from "./PrivateRoute";


const localStore = new LocalStore();
// Check for token to keep user logged in
if (localStore.getToken()) {
    // Set auth token header auth
    const token = localStore.getToken()
    // Decode token and get user info and exp
    const decoded = jwt_decode(token);
    // Set user and isAuthenticated
    store.dispatch(setCurrentUser(decoded));
    // Check for expired token
    const currentTime = Date.now() / 1000; // to get in milliseconds
    if (decoded.exp < currentTime) {
        // Logout user
        store.dispatch(logoutUser());
        // Redirect to login
        window.location.href = "/";
    }
}

function App(){
    return (
        <Router>
            <div className="globalContainer">
                <Switch>
                <Route exact={true} path="/" component={HomePage} />
                <PrivateRoute exact={true} path="/search/:action?" component={SearchPage} />
                <PrivateRoute exact={true} path="/wallet/:action?" component={WalletPage} />
                <PrivateRoute exact={true} path="/property/:id?" component={MyHousePage} />
                <PrivateRoute exact={true} path="/new_property" component={CreateTokenizedAsset} />
                <PrivateRoute exact={true} path="/authorityContract" component={AuthorityContract} />
                <PrivateRoute exact={true} path="/profiling/:action?" component={Profiling} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;