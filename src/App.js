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
    this.fetchData(emailsUrl);
  }

  fetchData(url) {

    fetch(url)
      .then(function (response) {
        if (response.ok) {
          return response.json();
        } else {
          return Promise.reject(`Request rejected with status ${response.status}`);
        }
      })
      .then(parsedJSON => {
        var emails = parsedJSON.collection.items || [];
        if (emails.length === 0) {
          return Promise.reject("No collection items");
        } else {
          return emails.map(email => ({
            title: email.name,
            subject: email.subjects.join('\n'),
            id: email.id,
            read: false
          }));
        }
      }).then(emails =>
        this.setState({
          messages: emails,
          isLoading: false
        })
      ).catch(error => {
        this.setState({
          isLoading: false
        });
        this.props.history.push({
          pathname: '/error',
          state: { message: 'There has been a problem with your fetch operation: ' + error }
        });
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

          {/* Invalid route */}
          <Route path="/" component={NoMatch} />

        </Switch>

      </div>
    );
  }
}

export default App;
