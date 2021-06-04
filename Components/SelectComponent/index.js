import * as React from 'react';
import './style.css';


class SelectComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showList: false,
      itemSelected: 0
    };
  }
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }
  handleClickOutside = (e) => {
    if (
      this.wrapperRef &&
      !this.wrapperRef.contains(e.target) &&
      this.state.showList
    ) {
      this.showToggle();
    }
  }
  showToggle = () => {
    if (this.state.showList) {
      document.removeEventListener('mousedown', this.handleClickOutside);
    } else {
      document.addEventListener('mousedown', this.handleClickOutside);
    }
    this.setState({
      showList: !this.state.showList
    });
  }

  doSelect = (index) => {
    this.setState({
      itemSelected: index
    });
    this.props.setValue(index)
    this.showToggle();
  }

  render() {
    return (
      <div
        ref={(div) => { this.wrapperRef = div; }}
        className={'selectComponent' + (this.state.showList ? ' active' : '')}
      >
        <div className="form-control dropdown-toggle" onClick={this.showToggle}>
          <span className="dropdown-label">{this.props.listItem[this.state.itemSelected]}</span>
          <span className="caret" />
        </div>
        <ul className={`dropdown-menu dropdown-select${this.props.switchTop ? ' switchTop' : ''}`}>
          {this.props.listItem.map((item, index) => {
            return (
              <li key={index} onClick={e => { this.doSelect(index); }}>
                <a>{item}</a>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default SelectComponent;