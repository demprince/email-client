import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

// Mock some email data
const mockedEmails = {
  "collection": {
    "items": [{
      "id": "1",
      "profileId": "1",
      "name": "Name 1",
      "subjects": [
        "Subject 1",
        "Subject 2"
      ]
    }, {
      "id": "2",
      "profileId": "1",
      "name": "Name 2",
      "subjects": [
        "Subject 1"
      ]
    }, {
      "id": "3",
      "profileId": "1",
      "name": "Name 3",
      "subjects": [
        "Subject 1"
      ]
    }],
    "pageinfo": {
      "total": 3,
      "page": 1,
      "pageSize": 25
    }
  }
};

// Fetches json with results

// Parses json messages 

// Routing tests

