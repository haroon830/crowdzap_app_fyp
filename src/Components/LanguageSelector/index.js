import * as React from 'react';
import './style.css';
import { connect } from 'react-redux';
import { changeLanguage } from 'Redux/Setting';
import { getTranslation, SupportedLanguage } from 'Services/Geo';

const mapStateToProps = (state) => ({
  lang: state.setting.lang
});
const mapDispatchToProps = (dispatch) => ({
  changeLanguage: (lang) => {
    dispatch(changeLanguage(lang));
  }
});
class LanguageSelector extends React.Component {
  changeLanguage = (lang) => {
    if (this.props.lang !== lang) {
      this.props.changeLanguage(lang);
    }
  }
  render() {
    return (
      <div className="languageSelector">
        <span className="langText">{getTranslation(this.props.lang, 'Language')}: </span>
        <ul>
          <li
            className={this.props.lang === SupportedLanguage.en ? ' active' : ''}
            onClick={(e) => this.changeLanguage(SupportedLanguage.en)}
          >
            <span className="flag uk" />
          </li>
          <li
            className={this.props.lang === SupportedLanguage.vn ? ' active' : ''}
            onClick={(e) => this.changeLanguage(SupportedLanguage.vn)}
          >
            <span className="flag vn" />
          </li>
        </ul>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LanguageSelector);