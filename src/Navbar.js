import React, { Component } from 'react';


class Navbar extends Component {

  render() {
    return (
      <nav class="navbar navbar-dark bg-dark">
        <a class="navbar-brand" href="#">Marketplace</a>
        <span class="navbar-text">
            Your Account: {this.props.account}
        </span>
      </nav>
    );
  }
}

export default Navbar;
