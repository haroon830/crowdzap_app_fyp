import * as React from 'react';
import './style.css';
import { Icon } from 'react-fa';
import { Link } from 'react-router-dom';


class LeftSide extends React.Component {
  toggleActive = (e) => {
    if (this.props.isExpand) {
      e.preventDefault();
    }
    const target = e.currentTarget;
    if (this.props.isExpand && target.parentElement) {
      target.parentElement.classList.toggle('active');
    }
  }
  render() {
    return (
      <div className={`leftSide slimScroll${this.props.isExpand ? ' expanded' : ' minimized'}`}>
        <nav className="leftNav scrollable bigNav">
          <ul>
            <li><Link to="/search">
              <Icon className="navIcon" name="compass" />
              <span className="navLabel">Search</span>
            </Link></li>
            <li><Link to="/new_property">
              <Icon className="navIcon" name="plus-circle" />
              <span className="navLabel">Add Property</span>
            </Link></li>
            <li className="hasSub hasSubActive">
              <Link to="/property/mylisting" onClick={this.toggleActive}>
                <Icon className="navIcon icon-home" name="home" />
                <span className="navLabel">Properties</span>
                <Icon className="closeIcon arrowRight" name="angle-left" />
                <Icon className="openIcon arrowRight" name="angle-down" />
              </Link>
              <ul className="colors secondUl">
                <li><Link to="/property/mylisting">
                  My listing<Icon name="circle-o" className="icon-right" />
              </Link></li>
                <li><Link to="/property/mywishlist">
                  My wishlist<Icon name="circle-o" className="icon-right" />
                </Link></li>
                <li><Link to="/property/myviewing">
                  My viewing<Icon name="circle-o" className="icon-right" />
                </Link></li>
              </ul>
            </li>
            <li>
                <Link to="/authorityContract">
                <Icon className="navIcon" name="circle-o" />
                <span className="navLabel">Contract</span>
                </Link>
            </li>
            <li className="hasSub hasSubActive">
              <Link to="/advice/buying" onClick={this.toggleActive}>
                <Icon className="navIcon" name="comments" />
                <span className="navLabel">Advice</span>
                <Icon className="closeIcon arrowRight" name="angle-left" />
                <Icon className="openIcon arrowRight" name="angle-down" />
                {/* <span className="badge bg-yellow">5</span> */}
              </Link>
              <ul className="colors secondUl">
                <li><Link to="/advice/buying">
                  Buying<Icon name="circle-o" className="icon-right" />
                </Link></li>
                <li><Link to="/advice/selling">
                  Selling<Icon name="circle-o" className="icon-right" />
                </Link></li>
                <li><Link to="/advice/design">
                  Design<Icon name="circle-o" className="icon-right" />
                </Link></li>
                <li><Link to="/advice/renovations">
                  Renovations<Icon name="circle-o" className="icon-right" />
                </Link></li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default LeftSide;
