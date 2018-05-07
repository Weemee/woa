import React from 'react';
import {bindActionCreators} from 'redux';
import {withRouter, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';

import {socketConnect} from './actions';

import Page from '../page';
import PageNotFound from '../page/404';
import AuthenticationContainer from '../authentication';
import AccountContainer from '../account';
import SessionContainer from '../session';
import Header from './header';

import {Container} from 'reactstrap';
import {MdBugReport} from 'react-icons/lib/md';

class App extends React.Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
		this.getIssueURL();
	}

	componentDidMount() {
		this.props.socketConnect();
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.character && !this.props.character) {
			this.getIssueURL();
		}

		if(this.props.loggedIn && !this.props.isConnected && nextProps.isConnected) {
			this.props.history.push('/authentication');
		}
	}

	renderSessionRoute(component) {
		if (!this.props.isConnected) {
			return <p>Connecting...</p>;
		}

		return component;
	}

	// Fetch issue URL from github
	// Networking docs: https://facebook.github.io/react-native/docs/network.html
	// Request docs: https://developer.mozilla.org/en-US/docs/Web/API/Request
	getIssueURL() {
		fetch('')
		.then((resonse) => response.text())
		.then((responseText) => {
			responseText = responseText.replace();

			this.setState({
				issueURL: 'https://github.com/Weemee/woa',
			});
		})
		.catch((error) => {

		});

		this.setState({
				issueURL: 'https://github.com/Weemee/woa',
			});
	}

	render() {
		return (
			<React.Fragment>
				<Header/>
				<main className={`theme-${this.props.selectedTheme}`} id="main">
					<Container>
						<Switch>
							<Route exact path="/" render={() => this.renderSessionRoute(<Page/>)} />
							<Route path="/authentication" render={() => this.renderSessionRoute(<AuthenticationContainer/>)} />
							<Route path="/account" render={() => this.renderSessionRoute(<AccountContainer/>)} />
							<Route path="/session" render={() => this.renderSessionRoute(<SessionContainer/>)} />
							<Route component={PageNotFound} />
						</Switch>
					</Container>
					<a href={this.state.issueURL} target="_blank" className="btn btn-primary" id="bug"><MdBugReport />Report bug</a>
				</main>
			</React.Fragment>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		socketConnect,
	}, dispatch);
}

function mapStateToProps(state) {
	return {
		isConnected: state.app.connected,
		loggedIn: state.account.loggedIn || false,
		character: state.character.selected,
		selectedTheme: state.theme.name,
	};
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
