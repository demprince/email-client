import React, { Component } from 'react';

class NoMatch extends Component {
    render() {
        const { match, location, history } = this.props;
        console.log(match, location, history);
        return (
            <div className="page">
                No page matches: <b>{location.pathname}</b>
            </div>
        )
    }
}

export default NoMatch;
