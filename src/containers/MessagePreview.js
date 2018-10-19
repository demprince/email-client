import React, { Component } from "react";
import { Route, NavLink, Switch, withRouter } from "react-router-dom";

import MessageDetail from "components/MessageContent";
import NoMatch from "components/NoMatch";
import Loader from "components/Loader";

import "./MessagePreview.css";

const githubUrl =
  "https://gist.githubusercontent.com/OrganicPanda/17da0fa8fda252972f9753c9e9738173/raw/f7198d502f40372c99273365f5f37ab0a6c63194/";

class MessageContainer extends Component {
  render() {
    const { match, email } = this.props;
    if (!email.isValid) {
      return <Route path="/" component={NoMatch} />;
    }

    return (
      <div className="message-preview mt-2">
        <NavLink className="btn btn-secondary" exact to="/">
          Back
        </NavLink>

        <table className="table table-borderless mt-3">
          <tbody>
            <tr>
              <th className="text-nowrap" scope="row">
                Title:
              </th>
              <td>{email.title}</td>
            </tr>
            <tr>
              <th className="text-nowrap" scope="row">
                Subject:
              </th>
              <td>{email.subject}</td>
            </tr>
          </tbody>
        </table>

        <div className="nav btn-group justify-content-center mt-3">
          <NavLink
            exact
            to={match.url}
            activeClassName="active"
            className="btn btn-secondary"
          >
            HTML
          </NavLink>
          <NavLink
            exact
            to={match.url + "/plain"}
            activeClassName="active"
            className="btn btn-secondary"
          >
            Plain
          </NavLink>
        </div>

        <Switch>
          <Route
            exact
            path={match.url}
            render={props => {
              return (
                <MessageDetail
                  data={email.html}
                /> /* Could send the composed iframe but need towork out how to listen to onLoad events to deal with the iframe height */
              );
            }}
          />
          <Route
            exact
            path={match.url + "/plain"}
            render={props => {
              return <MessageDetail data={email.plain} isPlain={true} />;
            }}
          />
        </Switch>
      </div>
    );
  }
}

class MessagePreview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      email: {}
    };
  }

  componentDidMount() {
    const {
      match: { params }
    } = this.props;
    const emailPath = `${githubUrl}email-${params.id}.json`;
    this.fetchData(emailPath);
  }

  fetchData(url) {
    const { history } = this.props;

    fetch(url)
      .then(function(response) {
        if (response.ok) {
          return response.json();
        } else {
          return Promise.reject(
            `Request rejected with status ${response.status}`
          );
        }
      })
      .then(parsedJSON => {
        this.setState({
          email: {
            id: parsedJSON.id,
            title: parsedJSON.name,
            subject: parsedJSON.subjects.join("\n"),
            iframe: `<iframe ref="iframe" width="100%" height="100%" frameBorder="0" class="iframe" src="data:text/html;charset=utf-8,${encodeURI(
              parsedJSON.body.html
            )}" />`,
            html: parsedJSON.body.html,
            plain: parsedJSON.body.text,
            isValid: true
          },
          isLoading: false
        });
      })
      .catch(error => {
        this.setState({
          isLoading: false
        });
        history.push({
          pathname: "/error",
          state: {
            message:
              "There has been a problem with your fetch operation: " + error
          }
        });
      });
  }

  render() {
    const { match } = this.props;
    const { isLoading, email } = this.state;

    return (
      <div>
        {/* MessageContainer */}
        <Route
          path={match.url}
          render={() => {
            return (
              <div className="message-preview container mt-5">
                {!isLoading && email !== {} ? (
                  <MessageContainer
                    email={email}
                    isLoading={isLoading}
                    match={match}
                  />
                ) : (
                  <Loader />
                )}
              </div>
            );
          }}
        />
      </div>
    );
  }
}

export default (MessagePreview = withRouter(MessagePreview));
