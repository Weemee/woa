import React from 'react';
import {withRouter, NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {authLogout} from '../../authentication/actions';
import {newInput} from '../../session/actions';
import {setLanguage} from '../../localization/actions';

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
				lang: false,
			},
		};

		this.toggleTheme = this.toggleTheme.bind(this);
		this.toggleLang = this.toggleLang.bind(this);
	}

	logout() {
		localStorage.removeItem('authToken');
		this.props.authLogout();
	}

	getString(string) {
		if(this.props.locale.messages[string])
		{	
			return this.props.locale.messages[string];
		}
	}

	renderNavAuth() {
		if (this.props.loggedIn) {
			return (
				<React.Fragment>
					<NavLink className="themeButton" to="/session">{this.getString('strings.playGame')}</NavLink>
					<NavLink className="themeButton" to="/account">{this.getString('strings.account')}</NavLink>
					<a className="themeButton" href="#" onClick={this.logout.bind(this)}>
						{this.getString('strings.logout')}
					</a>
				</React.Fragment>
			);
		} else {
			return (
				<React.Fragment>
					<NavLink className="themeButton" exact to="/authentication">
						{this.getString('strings.login')}
					</NavLink>
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

	toggleLang() {
		this.setState({
			open: {
				lang: !this.state.open.lang,
			}
		});
	}

	changeTheme(theme) {
		this.props.newInput(`changetheme ${theme}`);
	}

	changeLang(lang) {
		console.log(lang);
		this.props.setLanguage(lang);
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
				{
					this.props.loggedIn &&
					<Dropdown isOpen={this.state.open.lang} toggle={this.toggleLang}>
						<DropdownToggle caret>
							Language
						</DropdownToggle>
						<DropdownMenu>
							<DropdownItem key="en-UK" onClick={() => this.changeLang('en-UK')}>English</DropdownItem>
							<DropdownItem key="sv-SE" onClick={() => this.changeLang('sv-SE')}>Svenska</DropdownItem>
							<DropdownItem key="de-DE" onClick={() => this.changeLang('de-DE')}>Deutsch</DropdownItem>
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
		locale: state.locale,
		account: state.account.account,
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		authLogout,
		newInput,
		setLanguage,
	}, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
