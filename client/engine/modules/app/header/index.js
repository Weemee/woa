import React from 'react';
import {withRouter, NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {authLogout} from '../../authentication/actions';

import {Container, Collapse, Navbar, NavbarToggler, NavbarBrand, Nav} from 'reactstrap';

class Header extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isOpen: false,
		};
	}

	logout() {
		localStorage.removeItem('authToken');
		this.props.authLogout();
	}

	renderNavAuth() {
		if (this.props.loggedIn) {
			return (
				<React.Fragment>
					<NavLink className="nav-link" to="/session">Play Game</NavLink>
					<NavLink className="nav-link" to="/account">Account</NavLink>
					<a className="nav-link" href="/authentication/logout" onClick={this.logout.bind(this)}>Logout</a>
				</React.Fragment>
			);
		} else {
			return (
				<React.Fragment>
					<NavLink className="nav-link" exact to="/authentication">Login</NavLink>
					<NavLink className="nav-link" to="/authentication/register">Sign up</NavLink>
				</React.Fragment>
			);
		}
	}


	toggle() {
		this.setState({
			isOpen: !this.state.isOpen,
		});
	}

	render() {
		return (
			<Navbar className={`theme-${this.props.selectedTheme} header-${this.props.selectedTheme}`} expand="md" id="header">
				<Container>
				<NavbarBrand href="#" onClick={() => this.props.history.push('/')}>Penis</NavbarBrand>
				<NavbarToggler onClick={this.toggle.bind(this)} className="mr-2" />
					<Collapse isOpen={!this.state.isOpen} navbar>
						<Nav className="mr-auto" navbar>
						{
							this.props.pages && this.props.pages.length > 0 &&
							this.props.pages.map((page, index) => {
								if (!page.meta.showInNav) {
									return null;
								}

								return <NavLink className="nav-link" key={index} exact to={'/' + page.meta.path}>{page.meta.title}</NavLink>;
							})
						}
						</Nav>
						<Nav className="ml-auto" navbar>
							{this.renderNavAuth()}
						</Nav>
					</Collapse>
				</Container>
			</Navbar>
			);
	}
}

function mapStateToProps(state) {
	return {
		character: state.character.selected,
		isConnected: state.app.connected,
		loggedIn: state.account.loggedIn,
		socket: state.app.socket,
		selectedTheme: state.theme.name,
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({authLogout}, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
