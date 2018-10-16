import React, { Component } from 'react';
import { Route, NavLink, Switch, withRouter } from "react-router-dom";

import NoMatch from './NoMatch';
import Error from './Error';
import Loader from './Loader';

import './MessagePreview.css';

const githubUrl = "https://gist.githubusercontent.com/OrganicPanda/17da0fa8fda252972f9753c9e9738173/raw/f7198d502f40372c99273365f5f37ab0a6c63194/";

class MessageContent extends Component {
    render() {
        const html = {
            __html: this.props.data.replace('\n', '<br/>')
        };
        return (
            <div className="preview-panel">
                <div className={this.props.isPlain ? 'pre-wrap' : ''} dangerouslySetInnerHTML={html} />
            </div>
        );
    }
}

class Main extends Component {
    render() {
        const { match, email, isLoading } = this.props;
        if (!email.isValid) {
            return <Route path="/" component={NoMatch} />
        }

        return (
            <div className="message-preview container mt-5">

                <table className="table table-borderless">
                    <tbody>
                        <tr>
                            <th className="text-nowrap w-25" scope="row">Title:</th>
                            <td>{email.title}</td>
                        </tr>
                        <tr>
                            <th className="text-nowrap w-25" scope="row">Subject:</th>
                            <td>{email.subject}</td>
                        </tr>
                    </tbody>
                </table>

                <div className="nav btn-group justify-content-center mt-3">
                    <NavLink exact to={match.url} activeClassName="active" className="btn btn-secondary">HTML</NavLink>
                    <NavLink exact to={match.url + "/plain"} activeClassName="active" className="btn btn-secondary">Plain</NavLink>
                </div>

                <Switch>
                    <Route exact path={match.url} render={(props) => {
                        return (
                            <MessageContent data={email.html} />
                        );
                    }} />
                    <Route exact path={match.url + "/plain"} render={(props) => {
                        return (
                            <MessageContent data={email.plain} isPlain={true} />
                        );
                    }} />
                    <Route component={NoMatch} />
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
            fetchError: '',
            email: {}
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        const { match: { params } } = this.props;
        const emailPath = `${githubUrl}email-${params.id}.json`;

        fetch(emailPath)
            .then(function (response) {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network response was not ok.');
            }).then(parsedJSON =>
                this.setState({
                    email: {
                        id: parsedJSON.id,
                        title: parsedJSON.name,
                        subject: parsedJSON.subjects.join('\n'),
                        html: parsedJSON.body.html,
                        plain: parsedJSON.body.text,
                        isValid: true
                    },
                    isLoading: false
                }))
            .catch(error => {
                const msg = 'There has been a problem with your fetch operation: ' + error.message;
                this.setState({
                    isLoading: false,
                    fetchError: msg
                });
                this.props.history.push("/error");
            });
    }

    render() {
        const { match } = this.props;
        const { isLoading, fetchError, email } = this.state;

        return (

            <Switch>
                {/* Main */}
                <Route path={match.url} render={(props) => {
                    return (
                        <div className="message-preview container mt-5">
                            {
                                !isLoading && email !== {} ? (
                                    <Main email={email} isLoading={isLoading} match={match} />
                                ) : <Loader />
                            }
                        </div>
                    )
                }
                } />

                {/* Fetch error */}
                <Route path={match.url + "/error"} render={(props) => {
                    return (
                        <Error data={fetchError} />
                    )
                }} />
            </Switch >

            // <div className={`message-preview container mt-5 ${isLoading ? 'is-loading' : ''}`}>

            // <table className="table">
            //     <tbody>
            //         <tr>
            //             <th className="text-nowrap" scope="row">Title:</th>
            //             <td>{email.title}</td>
            //         </tr>
            //         <tr>
            //             <th className="text-nowrap" scope="row">Subject:</th>
            //             <td>{this.renderSubjects(email.subjects)}</td>
            //         </tr>
            //     </tbody>
            // </table>

            // <div className="nav btn-group">
            //     <NavLink exact to={match.url} activeClassName="active" className="btn btn-primary">HTML</NavLink>
            //     <NavLink exact to={match.url + "/plain"} activeClassName="active" className="btn btn-primary">Plain</NavLink>
            // </div>

            // {
            //     !isLoading && email !== {} ? (

            //         <Switch>
            //             <Route exact path={match.url} render={(props) => {
            //                 return (
            //                     <MessageContent data={email.html} />
            //                 );
            //             }} />
            //             <Route exact path={match.url + "/plain"} render={(props) => {
            //                 return (
            //                     <MessageContent data={email.plain} isPlain={true} />
            //                 );
            //             }} />
            //             <Route component={NoMatch} />
            //         </Switch>

            //     ) : <div><p>No messages found</p></div>
            // }

            //     <Loader />

            // </div>
        )
    }
}

export default MessagePreview = withRouter(MessagePreview);
