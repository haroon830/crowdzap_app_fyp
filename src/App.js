import React from "react";
import {Provider} from "react-redux";
import {Route,BrowserRouter as Router,Switch, Redirect } from "react-router-dom";
import LocalStore from "./config/localStore";
import jwt_decode from "jwt-decode"
import {setCurrentUser} from "./reducers/authReducer";
import store from "./store";
import {logoutUser} from "./services/Auth";
import Register from "./Components/Auth/Register";
import Login from "./Components/Auth/Login";

import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import DashboardMain from "./Components/Dashboard/Main";
//import ListedItemDetail from "./Components/Dashboard/ListedItemDetail";
import SettingsMain from "./Components/Settings/Main"
import WalletMain from "./Components/Wallet"
import AdminDashBoard from "./Components/AdminDashboard/Main";

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
    window.location.href = "./Login";
  }
}
function App() {
  return (
      <Provider store={store}>
        <Router>
          <Route exact path="/">
            <Redirect to="/Login" />
          </Route>
          <Route path="/Register" component={Register} />
          {/* <Route path="/Login" component={Login} /> */}
          {/* Dev */}
          <Route path="/Login" component={Login} />
          {/* <Route exact path="/" component={Auth} /> */}

          <Switch>

            <PrivateRoute exact path="/home" component={DashboardMain} />
            <PrivateRoute exact path="/wallet" component={WalletMain}/>
            <PrivateRoute exact path="/settings" component={SettingsMain} />
            <PrivateRoute exact path="/admin" component={AdminDashBoard}/>
            {/*<PrivateRoute exact path="/prop_detail/:id?" component={ListedItemDetail}/>*/}
          </Switch>
        </Router>

      </Provider>
  );
}
export default App;
