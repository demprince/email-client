import React, { Component } from 'react';
import './MessageSelector.css';

class Message extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange() {
        this.props.selectMessage(this.props.data);
    }

    render() {
        return (
            <div className="Message">
                <p className="message__title">{this.props.data.title}</p>
                <p className="message__subject">{this.props.data.subject}</p>
                <button className="message__more" onClick={this.handleChange}>More</button>
            </div>
        )
    }
}

class MessageSelector extends Component {
    render() {
        const { selectMessage } = this.props;
        const messages = this.props.data.map(function (item, idx) {
            return <Message
                key={idx}
                data={item}
                className={item.selected ? 'selected' : ''}
                selectMessage={selectMessage}
            />
        })
        return (
            <div className="page">
                <h1>Message selector</h1>
                <div className="MessageSelector">
                    {messages}
                </div>
            </div>
        )
    }
}

export default MessageSelector;
