import React from 'react';
import SideNav from "@trendmicro/react-sidenav"
import {NavIcon, NavItem, NavText, Toggle} from "@trendmicro/react-sidenav"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faWallet, faHome, faIdCard, faUser  } from '@fortawesome/free-solid-svg-icons'
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

export default class Sidebar extends React.Component {
    render() {
        return (
            <SideNav
            onSelect={(selected) => {
                // Add your code here
                const to = '/' + selected;
                    if (this.props.location.pathname !== to) {
                        this.props.history.push(to);
                    }
            }}
            className="navbar"
            >
            <SideNav.Toggle />
            <SideNav.Nav defaultSelected="home">
                <NavItem eventKey="home" >
                    <NavIcon>
                        <FontAwesomeIcon size="2x" icon={faHome}/>
                    </NavIcon>
                    <NavText>
                        Home
                    </NavText>
                </NavItem>
                <NavItem eventKey="wallet">
                    <NavIcon>
                    <FontAwesomeIcon size="2x" icon={faWallet}/>
                    </NavIcon>
                    <NavText>
                        Wallet
                    </NavText>        
                </NavItem>
                <NavItem eventKey="settings">
                    <NavIcon>
                    <FontAwesomeIcon size="2x" icon={faIdCard}/>
                    </NavIcon>
                    <NavText>
                        Setting
                    </NavText>        
                </NavItem>
                <NavItem eventKey="admin">
                    <NavIcon>
                        <FontAwesomeIcon size="2x" icon={faUser}/>
                    </NavIcon>
                    <NavText>
                        Admin Dashboard
                    </NavText>
                </NavItem>
            </SideNav.Nav>
        </SideNav>
        );
    }
}