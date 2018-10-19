import React, { Component } from "react";

import "./MessageListItem.css";

class MessageListItem extends Component {
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
        <div className="message-title">{this.props.data.title}</div>
        <div className="message-subject">{this.props.data.subject}</div>
        <div
          className="btn btn-secondary message-more"
          onClick={this.handleChange}
        >
          More
        </div>
      </div>
    );
  }
}

export default MessageListItem;
