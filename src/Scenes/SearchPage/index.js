import * as React from 'react';
import './style.css';
import Dashboard from '../../Components/DashboardLayout';
import SearchForm from './Components/SearchForm';

class SearchPage extends React.Component{
  render() {
    return (
      <div className="searchPage">
        <Dashboard>
          <div className="dashboardTitle">
            <h3>Filter your result</h3>
          </div>
          <div className="searchFormWrapper">
            <SearchForm />
          </div>
        </Dashboard>
      </div>
    );
  }
}

export default SearchPage;