import React from 'react';
import {withRouter, Route} from 'react-router-dom';

import AuthenticationLogin from './login';
import AuthRegister from './register';
import AuthLogout from './logout';

class Authentication extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div id="authentication">
				<Route path="/authentication" exact component={AuthenticationLogin} />
				<Route path="/authentication/register" component={AuthRegister} />
				<Route path="/authentication/logout" component={AuthLogout} />
			</div>
		);
	}
};

export default withRouter(Authentication);