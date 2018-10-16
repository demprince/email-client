import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { Button } from "reactstrap";
import './MessageSelector.css';

class Message extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange() {
        this.props.history.push(`/email/${this.props.data.id}`);
    }

    render() {
        return (
            <div className="message">
                <div className="message__title">{this.props.data.title}</div>
                <div className="message__subject">{this.props.data.subject}</div>
                <Button className="message__more" onClick={this.handleChange}>More</Button>
            </div>
        )
    }
}

class MessageSelector extends Component {
    render() {
        const { history } = this.props;

        const messages = this.props.data.map(function (item, idx) {
            return <Message
                key={idx}
                data={item}
                history={history}
            />
        })

        return (
            <div className="page message-selector">
                <h1 className="title">Available messages:</h1>
                <div className="message-list">
                    {messages}
                </div>
            </div>
        )
    }
}

export default withRouter(MessageSelector);
