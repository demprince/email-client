import React, { Component } from 'react';
import { withRouter } from "react-router-dom";

class Error extends Component {
    render() {
        return (
            <div className="container">
                <div className="alert alert-warning mt-5" role="alert">
                    {this.props.location.state.message}
                </div>
            </div>
        )
    }
}

export default withRouter(Error);
