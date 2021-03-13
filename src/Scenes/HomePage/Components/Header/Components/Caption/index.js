import * as React from 'react';
import './style.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTranslation, SupportedLanguage } from 'Services/Geo';

const mapStateToProps = (state) => ({
  lang: state.setting.lang,
});

class Caption extends React.Component {
  render() {
    return (
      <div className="homeCaption">
        <div className="homeTitle">{getTranslation(this.props.lang, 'Now it\'s easy to invest in Real Estate more than ever')}</div>
        <div className="homeSubtitle">
          {getTranslation(this.props.lang, 'With CrowdZap backed by Blockchain')}
        </div>
        <Link className="btn btn-black" to="/search">{getTranslation(this.props.lang, 'Learn More')}</Link>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Caption);