import React, { Component } from 'react';
import { Route, NavLink, Switch } from "react-router-dom";

class MessageHTML extends Component {
    render() {
        return (
            <div className="page">
                <h1>HTML message</h1>
                <p>Content</p>
            </div>
        )
    }
}

class MessagePlainText extends Component {
    render() {
        return (
            <div className="page">
                <h1>Plain text message</h1>
                <p>Content</p>
            </div>
        )
    }
}

const MessagePreview = ({ match }) => {
    return (
        <div className="page">
            <h1>Message preview</h1>
            <div className="nav">
                <NavLink exact to={match.url} activeClassName="active">HTML</NavLink>
                <NavLink exact to={match.url + "/plain"} activeClassName="active">Plain</NavLink>
            </div>

            <Switch>
                <Route exact path={match.url} component={MessageHTML} />
                <Route exact path={match.url + "/plain"} component={MessagePlainText} />
            </Switch>
        </div>
    )
}

export default MessagePreview;
