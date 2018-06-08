import React from 'react';
import {withRouter, NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {authLogout} from '../../authentication/actions';
import {newInput} from '../../session/actions';

import {Container, Collapse, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, FormGroup, Input, Navbar, NavbarToggler, NavbarBrand, Nav} from 'reactstrap';

class Header extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			issueURL: 'https://github.com/Weemee/woa/issues/new',
			themeSelect: '',
			open: {
				nav: false,
				theme: false,
			}
		};

		this.toggleTheme = this.toggleTheme.bind(this);
	}

	logout() {
		localStorage.removeItem('authToken');
		this.props.authLogout();
	}

	renderNavAuth() {
		if (this.props.loggedIn) {
			return (
				<React.Fragment>
					<NavLink className="themeButton" to="/session">Play Game</NavLink>
					<NavLink className="themeButton" to="/account">Account</NavLink>
					<a className="themeButton" href="#" onClick={this.logout.bind(this)}>Logout</a>
				</React.Fragment>
			);
		} else {
			return (
				<React.Fragment>
					<NavLink className="themeButton" exact to="/authentication">Login</NavLink>
					<NavLink className="themeButton" to="/authentication/register">Sign up</NavLink>
				</React.Fragment>
			);
		}
	}


	toggle() {
		this.setState({
			open: {
				nav: !this.state.open.nav,
			}
		});
	}

	toggleTheme() {
		this.setState({
			open: {
				theme: !this.state.open.theme,
			}
		});
	}

	changeTheme(theme) {
		this.props.newInput(`changetheme ${theme}`);
	}

	disableContext(event) {
		event.preventDefault();
		return false;
	}

	render() {
		return (
			<Navbar className="themeHeader" expand="md" onContextMenu={this.disableContext}>
				<Container>
				<NavbarBrand className="themeTitle" href="#" onClick={() => this.props.history.push('/')}>Penis</NavbarBrand>
				{
					this.props.loggedIn &&
					<Dropdown isOpen={this.state.open.theme} toggle={this.toggleTheme}>
						<DropdownToggle caret>
							Theme
						</DropdownToggle>
						<DropdownMenu>
							{
								Object.keys(this.props.themes).map((themeID) => {
									return <DropdownItem key={themeID} onClick={() => this.changeTheme(this.props.themes[themeID].name)}>{this.props.themes[themeID].name}</DropdownItem>
								})
							}
						</DropdownMenu>
					</Dropdown>
				}

				<NavbarToggler onClick={this.toggle.bind(this)} className="mr-2" />
					<Collapse isOpen={!this.state.open.nav} navbar>
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
		themes: state.theme.list,
		account: state.account.account,
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		authLogout,
		newInput,
	}, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
