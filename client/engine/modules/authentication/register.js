import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {Card, CardHeader, CardBody, Input, Button, Form, FormGroup} from 'reactstrap';

import Notes from '../ui/notes';
import {
	authSignUp,
	getStrategies,
} from './actions';

class AuthRegister extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			strategies: null,
			username: '',
			email: '',
			password: '',
			passwordConfirm: '',
			status: null,
			sending: false,
		};

		this.register = this.register.bind(this);
	}

	componentDidMount() {
		if(this.props.strategies === 0) {
			this.props.getStrategies();
		}
	}

	register() {
		const state = {...this.state};
		this.props.authSignUp(state.username, state.email, state.password, state.passwordConfirm);
	}

	render() {
		return (
			<Card className="card-small">
				<CardHeader>Join us!</CardHeader>
				{
					this.props.strategies.length > 0 &&
					<CardBody className="text-center">
						<Notes />
						<Form>
							<FormGroup>
								<Input
								type="username"
								name="username"
								placeholder="Username"
								autoComplete="username"
								disabled={this.state.sending}
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
								type="email"
								name="email"
								placeholder="Email"
								autoComplete="email"
								disabled={this.state.sending}
								onChange={(e) => {
									this.setState({
										email: e.target.value,
									});
								}}
								value={this.state.email}
								/>
							</FormGroup>

							<FormGroup>
								<Input
								type="password"
								name="password"
								placeholder="Password"
								autoComplete="new-password"
								disabled={this.state.sending}
								onChange={(e) => {
									this.setState({
										password: e.target.value,
									});
								}}
								value={this.state.password}
								/>
							</FormGroup>

							<FormGroup>
								<Input
								type="password"
								name="repeatPassword"
								placeholder="Repeat password"
								autoComplete="new-password"
								disabled={this.state.sending}
								onChange={(e) => {
									this.setState({
										passwordConfirm: e.target.value,
									});
								}}
								value={this.state.passwordConfirm}
								/>
							</FormGroup>
							<Button onClick={this.register} disabled={this.state.sending} color="blue">Create account</Button>
							<hr/>
						</Form>
					</CardBody>
				}
			</Card>
			);
	}
};

function mapStateToProps(state) {
	return {
		strategies: state.auth.strategies || [],
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		authSignUp,
		getStrategies,
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthRegister);
