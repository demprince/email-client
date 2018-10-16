import React, { Component } from 'react';
import { Route, NavLink, Switch } from "react-router-dom";

import logo from './images/logo.png';

import MessageSelector from './MessageSelector';
import MessagePreview from './MessagePreview';

import Loader from './Loader';
import NoMatch from './NoMatch';
import Error from './Error';

const emailsUrl = "https://gist.githubusercontent.com/OrganicPanda/17da0fa8fda252972f9753c9e9738173/raw/f7198d502f40372c99273365f5f37ab0a6c63194/emails.json";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      isLoading: true,
      fetchError: '',
      selectedMessageId: -1
    };
    this.handleSelectedMessage = this.handleSelectedMessage.bind(this); //bind context to handleSelectedMessage handler
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {

    fetch(emailsUrl)
      .then(function (response) {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      }).then(parsedJSON => {
        var emails = parsedJSON.collection.items || []; //check emails.length > 0
        return emails.map(email => ({
          title: email.name,
          subject: email.subjects.join('\n'),
          id: email.id,
          read: false
        }));
      }).then(emails =>
        this.setState({
          messages: emails,
          isLoading: false
        })
      ).catch(error => {
        const msg = 'There has been a problem with your fetch operation: ' + error.message;
        this.setState({
          isLoading: false,
          fetchError: msg
        });
        this.props.history.push("/error");
      });

  }

  handleSelectedMessage(message) {
    this.setState({
      selectedMessageId: message.id
    });
  }

  render() {
    const { messages, isLoading, selectedMessageId, fetchError } = this.state;

    return (

      <div className="App">

        <NavLink exact to="/">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            Email client
          </header>
        </NavLink>

        <Switch>

          {/* Email preview */}
          <Route path="/email/:id" render={(props) => {
            return (
              <MessagePreview data={selectedMessageId} />
            );
          }} />

          {/* Fetch error */}
          <Route path="/error" render={(props) => {
            return (
              <Error data={fetchError} />
            )
          }} />

          {/* Email list */}
          <Route exact path="/" render={(props) => {
            return (
              <div className="container mt-5">
                {
                  isLoading ? <Loader /> : <MessageSelector data={messages} />
                }
              </div>
            );
          }} />

          {/* Invalid route */}
          <Route path="/" component={NoMatch} />

        </Switch>

      </div>
    );
  }
}

export default App;
