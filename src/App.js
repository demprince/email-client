import React, { Component } from 'react';
import { Route, NavLink, Switch } from "react-router-dom";
import MessageSelector from './MessageSelector';
import MessagePreview from './MessagePreview';
import NoMatch from './NoMatch';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      messages: [
        { title: "Some title 1", subject: "Some subject 1", id: 0 },
        { title: "Some title 2", subject: "Some subject 2", id: 1 },
        { title: "Some title 3", subject: "Some subject 3", id: 2 },
        { title: "Some title 4", subject: "Some subject 4", id: 3 }
      ],
      selectedMessageId: -1
    };
    this.handleSelectedMessage = this.handleSelectedMessage.bind(this); //bind context to handleSelectedMessage handler
  }

  handleSelectedMessage(message) {
    this.setState({
      selectedMessageId: message.id
    });

    console.log(this.state.selectedMessageId);
  }

  // fetchMessages() {
  // }

  render() {

    const NewMessageSelector = (props) => {
      const messages = this.state.messages;
      return (
        <MessageSelector data={messages} selectMessage={this.handleSelectedMessage} />
      );
    }

    return (
      <div className="App">
        <h1 className="App-header">Email client</h1>

        <div className="nav">
          <NavLink exact to="/" activeClassName="active">Home</NavLink>
          <NavLink to="/preview" activeClassName="active">Preview</NavLink>
        </div>

        <Switch>
          <Route exact path="/" render={NewMessageSelector} />
          <Route path="/preview" component={MessagePreview} />
          <Route component={NoMatch} />
        </Switch>

        <p>Selected id: {this.state.selectedMessageId}</p>

      </div>
    );

  }
}

export default App;
