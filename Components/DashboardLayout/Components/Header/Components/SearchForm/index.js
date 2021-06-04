import * as React from 'react';
import './style.css';

import { Icon } from 'react-fa';

function SearchForm(props){
  const [queryValue, setQueryValue] = React.useState("")

    return (
      <div className="search">
        <input type="text" onChange={(e)=>{setQueryValue(e.target.value)}} placeholder="Search by city" />
        <Icon  name="search" onClick={
          ()=>{
            props.search(queryValue)
          }
        } />
      </div>
    );
}

export default SearchForm;