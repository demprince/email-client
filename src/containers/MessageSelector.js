import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import MessageListItem from "components/MessageListItem";
import "./MessageSelector.css";

class MessageSelector extends Component {
  render() {
    const { history } = this.props;

    const messages = this.props.data.map(function(item, idx) {
      return <MessageListItem key={idx} data={item} history={history} />;
    });

    return (
      <div className="page message-selector">
        <h1 className="title">Available messages:</h1>
        <div className="message-list">{messages}</div>
      </div>
    );
  }
}

export default withRouter(MessageSelector);
