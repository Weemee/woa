import React from 'react';
import {withRouter} from 'react-router-dom';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {Card, CardHeader, CardBody, Input, Button, Form, FormGroup} from 'reactstrap';
import Note from '../ui/notes';

import {authLocal, authProvider, authLogin, getStrategies, linkProvider} from './actions';

class AuthenticationLogin extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
            username: '',
            password: '',
            error: '',
        };

		this.authenticate = this.authenticate.bind(this);
	}

	componentDidMount() {
        const url = new URL(document.location);
        const error = url.searchParams.get('error');

        this.setState({
            error: error || null,
        });

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

        return this.props.getStrategies();
    }

	authenticate() {
		const state = {...this.state};

		this.setState({
			status: null,
		});

		this.props.authLocal(state.username, state.password);
	}

	showStatus() {
		if(!this.state.status) {
			return null;
		}

		return <p className={'alert alert-`${this.state.status.isError ? danger : success}`'}>
			{this.state.status.message}
		</p>;
	}

	render() {
		return (
			<Card className="card-small">
				<Form>
				<Note />
				<FormGroup>
				<Input
				type="username"
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