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

class App extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.socketConnect();
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.character && !this.props.character) {
			console.log(this.props.character.name);
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
