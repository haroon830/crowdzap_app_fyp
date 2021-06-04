import * as React from 'react';
import './style.css';
import {Icon} from "react-fa";
import Polls from "./Components/Polls";
import CreateNewPoll from "./Components/CreatePoll";
import Dashboard from "Components/DashboardLayout";

class AuthorityContract extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resultTab: 'polls'
    };
  }
  changeResultTab = (tab) => {
    if (tab !== this.state.resultTab) {
      this.setState({
        resultTab: tab
      });
    }
  }
  render() {
    return (
        <div className="AgentPage">
          <Dashboard>
            <div className="agentWrapper">
              <div className="dashboardTitle">
                <h3>Authority Contract</h3>
                <h5>Handle all minting and distribution process</h5>
              </div>
              <div className="searchAgentForm">
                <div className="resultTab">
                  <ul>
                    <li
                        className={this.state.resultTab === 'polls' ? 'active' : ''}
                        onClick={(e) => this.changeResultTab('polls')}
                    >
                      <a><Icon name="map-o" /> Polls</a>
                    </li>
                    <li
                        className={this.state.resultTab === 'new_poll' ? 'active' : ''}
                        onClick={(e) => this.changeResultTab('new_poll')}
                    >
                      <a><Icon name="th-list" /> Create New Poll</a>
                    </li>
                  </ul>
                </div>
                <div className="resultBody">
                  {this.state.resultTab === 'polls' ? <Polls/> : <CreateNewPoll/>}
                </div>
              </div>
            </div>
          </Dashboard>
        </div>
    );
  }
}

export default AuthorityContract;