import React, { Component } from 'react';
import { Route, NavLink, Switch } from "react-router-dom";
import MessageSelector from './MessageSelector';
import MessagePreview from './MessagePreview';
import NoMatch from './NoMatch';

const emailPath = "https://gist.githubusercontent.com/OrganicPanda/17da0fa8fda252972f9753c9e9738173/raw/f7198d502f40372c99273365f5f37ab0a6c63194/emails.json";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      messages: [
        { title: "Some title 1", subjects: ["Some subject 1"], id: 0 },
        { title: "Some title 2", subjects: ["Some subject 2"], id: 1 },
        { title: "Some title 3", subjects: ["Some subject 3"], id: 2 },
        { title: "Some title 4", subjects: ["Some subject 4"], id: 3 }
      ],
      selectedMessageId: -1
    };
    this.handleSelectedMessage = this.handleSelectedMessage.bind(this); //bind context to handleSelectedMessage handler
  }

  componentDidMount() {
    this.fetchData();
  }


  fetchData() {

    /* this.setState({
      messages: [],
      isLoading: false
    });
    return false; */

    fetch(emailPath)
      .then(function (response) {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      }).then(parsedJSON => {
        var collection = parsedJSON.collection || [];
        return collection;
      }).then(parsedCollection => {
        var emails = parsedCollection.items || []; //check emails.length > 0
        return emails.map(email => ({
          title: email.name,
          subject: email.subjects.join('\n'),
          id: email.id
        }));
      }).then(emails =>
        this.setState({
          messages: emails,
          isLoading: false
        }))
      .catch(error => {
        console.log('There has been a problem with your fetch operation: ', error.message);
      });

  }

  handleSelectedMessage(message) {
    this.setState({
      selectedMessageId: message.id
    });
  }

  render() {
    const { messages, isLoading } = this.state;

    return (
      <div className="App">
        <h1 className="App-header">Email client</h1>

        <div className={`content ${isLoading ? 'is-loading' : ''}`}>

          <div className="nav">
            <NavLink exact to="/" activeClassName="active">Home</NavLink>
            <NavLink to="/preview" activeClassName="active">Preview</NavLink>
          </div>

          {
            !isLoading && messages.length > 0 ? (
              <Switch>
                <Route exact path="/" render={(props) => {
                  return (
                    <MessageSelector data={messages} selectMessage={this.handleSelectedMessage} />
                  );
                }} />
                <Route path="/preview" component={MessagePreview} />
                <Route component={NoMatch} />
              </Switch>
            ) : <p>No messages found</p>
          }

          <div className="loader">
            <div className="icon"></div>
          </div>

        </div>

        {/* <p>Selected id: {this.state.selectedMessageId}</p> */}

      </div>
    );

  }
}

export default App;
