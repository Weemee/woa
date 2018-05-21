import React from 'react';
import {withRouter} from 'react-router-dom';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {Card, CardHeader, CardBody, Input, Button, Form, FormGroup} from 'reactstrap';
import Notes from '../ui/notes';

import {
	authLocal,
	authProvider,
	authLogin,
	getStrategies,
	linkProvider,
} from './actions';

class AuthenticationLogin extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			username: '',
			password: '',
			error: null,
			success: null,
		};

		this.authenticate = this.authenticate.bind(this);
	}

	componentDidMount() {
		const url = new URL(document.location);
		const error = url.searchParams.get('error');
		const success  = url.searchParams.get('success');

		this.setState({
			error: error || null,
		});

		this.props.getStrategies();
		this.autoLogin(error ? false : true);
	}

	autoLogin(doLogin = true) {
		const GETtoken = window.location.search.replace('?token=', '');
		let authToken = localStorage.getItem('authToken');

		if (doLogin) {
			if (authToken) {
				if (GETtoken) {
					this.props.linkProvider(authToken, GETtoken);
				}

				return this.props.authLogin(authToken);
			}

			if (GETtoken) {
				return this.props.authProvider(GETtoken);
			}
		}
	}

	authenticate() {
		const state = {...this.state};

		this.setState({
			status: null,
		});

		this.props.authLocal(state.username, state.password);
	}

	showStatus() {
		const state = {...this.state};

		return <p className={'alert alert-danger'}>
			{state.error}
		</p>;

		return <p className={'alert alert-success'}>
			{state.success}
		</p>;

		if(!this.state.status) {
			return null;
		}

		return <p className={`alert alert-${state.status.isError ? 'danger' : 'success'}`}>
			{state.status.message}
		</p>
	}

	render() {
		return (
			<Card className="card-small">
				<CardHeader>Login</CardHeader>
				{
					this.props.strategies.length > 0 &&
				<CardBody>
					<Form>
						<Notes />
						<FormGroup>
							<Input
							type="text"
							name="username"
							placeholder="Username"
							autoComplete="username"
							onChange={(e) => {
								this.setState({
									username: e.target.value,
								});
							}}
							value={this.state.username}
							/>
						</FormGroup>
						<FormGroup>
							<Input
							type="password"
							name="password"
							placeholder="Password"
							autoComplete="current-password"
							onChange={(e) => {
								this.setState({
									password: e.target.value,
								});
							}}
							value={this.state.password}
							/>
						</FormGroup>
						<Button onClick={this.authenticate} color="primary">Login</Button>
						<hr />
					</Form>
				</CardBody>
			}
			{
				!this.props.strategies &&
				<p>Loading...</p>
			}
			</Card>
		);
	}
}

function mapStateToProps(state) {
	return {
		authToken: state.account.authToken,
		loggedIn: state.account.loggedIn,
		strategies: state.auth.strategies || [],
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		authLogin,
		authLocal,
		getStrategies,
		linkProvider,
		authProvider,
	}, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AuthenticationLogin));
