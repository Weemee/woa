import React from 'react';
import {bindActionCreators} from 'redux';
import {withRouter, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';

import {socketConnect} from './actions';

import Page from '../page';
import PageNotFound from '../page/404';
import AuthenticationContainer from '../authentication';
import AccountContainer from '../account';
import Header from './header';

import {Container} from 'reactstrap';

class App extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.socketConnect();
	}

	renderGameRoute(component) {
		if (!this.props.isConnected) {
			return <p>Connecting...</p>;
		}

		return component;
	}

	render() {
		return (
			<React.Fragment>
				<Header/>
				<main id="main">
					<Container>
						<Switch>
							<Route exact path="/" render={() => this.renderGameRoute(<Page/>)} />
							<Route path="/authentication" render={() => this.renderGameRoute(<AuthenticationContainer/>)} />
							<Route path="/account" render={() => this.renderGameRoute(<AccountContainer/>)} />
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
	};
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
