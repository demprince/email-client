import React, { Component } from "react";

class NoMatch extends Component {
  render() {
    const { location } = this.props;

    return (
      <div className="container">
        <div className="alert alert-warning mt-5" role="alert">
          404: No page matches route: <b>{location.pathname}</b>
        </div>
      </div>
    );
  }
}

export default NoMatch;
