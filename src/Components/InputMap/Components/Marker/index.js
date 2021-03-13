import * as React from 'react';
import './style.css';

class MiniHouse extends React.Component {
  render() {
    return (
      <div className={'markerWrapper' + (this.props.$hover ? ' hover' : '')}>
        <div className="markerArrow" />
        <div className="markerIcon" />
      </div>
    );
  }
}

export default MiniHouse;