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
import Loader from '../ui/loader';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			pages: [],
		};
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
		fetch('https://raw.githubusercontent.com/Weemee/woa/dev/docs/issues.md')
		.then((response) => response.text())
		.then((responseText) => {
			responseText = responseText.replace('__OS__:', `__OS__: ${window.navigator.platform}`);
			responseText = responseText.replace('__Browser & Version__:', `__Browser & Version__: ${window.navigator.userAgent}`);

			if (this.props.character) {
				responseText = responseText.replace('__Character name__:', `__Character name__: ${this.props.character.name}`);
			}

			this.setState({
				issueURL: `https://github.com/Weemee/woa/issues/new?body=${encodeURIComponent(responseText)}`,
			});
		})
		.catch((error) => {

		});
	}

	render() {
		return (
			<React.Fragment>
				<Header pages={this.state.pages} />
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
				<Loader />
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
