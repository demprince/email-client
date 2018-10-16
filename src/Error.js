import React, { Component } from 'react';

class Error extends Component {
    render() {
        return (
            <div className="container">
                <div className="alert alert-warning mt-5" role="alert">
                    {this.props.data}
                </div>
            </div>
        )
    }
}

export default Error;
