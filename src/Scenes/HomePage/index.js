import * as React from 'react';
import './style.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import ListProperty from './Components/ListProperty';

class HomePage extends React.Component {
  render() {
    return (
      <div className="homePage">
        <div className="headerWrapper">
          <Header />
        </div>
        <div className="bodyWrapper">
          <ListProperty />
        </div>
        <div className="footerWrapper">
          <Footer />
        </div>
      </div>
    );
  }
}

export default HomePage;