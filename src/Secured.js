import React, { Component } from 'react';
import UserInfo from './UserInfo';
import Logout from './Logout';
import Keycloak from 'keycloak-js';

class Secured extends Component {

  constructor(props) {
    super(props);
    this.state = { keycloak: null, authenticated: false };
  }

  componentDidMount() {
    const keycloak = Keycloak({
      url: process.env.REACT_APP_KEYCLOAK_URL,
      realm: process.env.REACT_APP_KEYCLOAK_REALM,
      clientId: process.env.REACT_APP_KEYCLOAK_CLIENTID
    });
    keycloak.init({onLoad: 'login-required'}).then(authenticated => {
      this.setState({ keycloak: keycloak, authenticated: authenticated })
    })
  }

  render() {
    if(this.state.keycloak) {
      if(this.state.authenticated) return (
        <div>
          <p>
            This is a Keycloak-secured component of your application. You shouldn't be able to see this
            unless you've authenticated with Keycloak.
          </p>
          <UserInfo keycloak={this.state.keycloak} />
          <Logout keycloak={this.state.keycloak} />
        </div>
      ); else return (<div>Unable to authenticate!</div>)
    }
    return (
      <div>Initializing Keycloak...</div>
    );
  }
}

export default Secured;
