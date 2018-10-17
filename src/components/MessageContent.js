import React, { Component } from 'react';

class MessageContent extends Component {
    render() {
        const html = {
            __html: this.props.data.replace('\n', '<br/>')
        };
        return (
            <div className={this.props.isPlain ? 'pre-wrap preview-panel' : 'preview-panel'} dangerouslySetInnerHTML={html} />
        );
    }
}

export default MessageContent;
