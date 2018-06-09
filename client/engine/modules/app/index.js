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
import Feedback from './feedback';

import {Modal, ModalHeader, ModalBody} from 'reactstrap';
import {MdBugReport, MdBrush, MdFeedback, MdVerifiedUser} from 'react-icons/lib/md';
import Loader from '../ui/loader';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			visible: false,
			modalFeedback: false,
			modalAdmin: false,
			designerMode: false,
		};

		this.giveFeedback = this.giveFeedback.bind(this);
		this.adminArea = this.adminArea.bind(this);
		this.designerMode = this.designerMode.bind(this);
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

	giveFeedback() {
		this.setState({
			modalFeedback: !this.state.modalFeedback,
		});
	}

	adminArea() {
		this.setState({
			modalAdmin: !this.state.modalAdmin,
		});
	}

	designerMode() {
		this.setState({
			designerMode: !this.state.designerMode,
		});
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
		fetch('https://raw.githubusercontent.com/Weemee/woa/master/docs/ISSUE_TEMPLATE.md')
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

	disableContext(event) {
		event.preventDefault();
		return false;
	}

	renderDesignerMode() {
		//Temporary
		return (
			<React.Fragment>
				{
					!this.props.character &&
					<div id="header" className={`theme-${this.props.selectedTheme}`}>
						<Header/>
					</div>
				}
				<main id="rootContent" className={`theme-${this.props.selectedTheme}`} onContextMenu={this.disableContext}>
						<div className="themeContainer">
							<Switch>
								<Route exact path="/" render={() => this.renderSessionRoute(<Page/>)} />
								<Route path="/authentication" render={() => this.renderSessionRoute(<AuthenticationContainer/>)} />
								<Route path="/session" render={() => this.renderSessionRoute(<SessionContainer/>)} />
								<Route path="/account" render={() => this.renderSessionRoute(<AccountContainer/>)} />
								<Route component={PageNotFound} />
							</Switch>
						</div>
				</main>
				<div id="footer" className={`theme-${this.props.selectedTheme}`}>
					<div className="themeContainer">
						{
							this.props.account &&
							this.props.account.accountLevel === 3 &&
							<a href="#" onClick={this.adminArea} className="themeButton" id="admin"><MdVerifiedUser size={18} /></a>
						}
						{
							this.props.account &&
							this.props.account.accountLevel === (3 || 5) &&
							<a href="#" onClick={this.designerMode} className="themeButton" id="designer"><MdBrush size={18} /></a>
						}
						{
							this.props.loggedIn &&
							this.props.account.accountLevel === (3 || 5 || 7) &&
							<a href="#" onClick={this.giveFeedback} className="themeButton" id="feedback"><MdFeedback size={18} /></a>
						}
						<a href={this.state.issueURL} target="_blank" className="themeButton" id="bug"><MdBugReport size={18}/></a>
					</div>
				</div>
				<Loader />
			</React.Fragment>
		);
	}

	renderPage() {
		return (
			<React.Fragment>
				{
					!this.props.character &&
					<div id="header" className={`theme-${this.props.selectedTheme}`}>
						<Header/>
					</div>
				}
				<main id="rootContent" className={`theme-${this.props.selectedTheme}`} onContextMenu={this.disableContext}>
						<div className="themeContainer">
							<Switch>
								<Route exact path="/" render={() => this.renderSessionRoute(<Page/>)} />
								<Route path="/authentication" render={() => this.renderSessionRoute(<AuthenticationContainer/>)} />
								<Route path="/session" render={() => this.renderSessionRoute(<SessionContainer/>)} />
								<Route path="/account" render={() => this.renderSessionRoute(<AccountContainer/>)} />
								<Route component={PageNotFound} />
							</Switch>
						</div>
				</main>
				<div id="footer" className={`theme-${this.props.selectedTheme}`}>
					<div className="themeContainer">
						{
							this.props.account &&
							this.props.account.accountLevel === 3 &&
							<a href="#" onClick={this.adminArea} className="themeButton" id="admin"><MdVerifiedUser size={18} /></a>
						}
						{
							this.props.account &&
							this.props.account.accountLevel === (3 || 5) &&
							<a href="#" onClick={this.designerMode} className="themeButton" id="designer"><MdBrush size={18} /></a>
						}
						{
							this.props.loggedIn &&
							this.props.account.accountLevel === (3 || 5 || 7) &&
							<a href="#" onClick={this.giveFeedback} className="themeButton" id="feedback"><MdFeedback size={18} /></a>
						}
						<a href={this.state.issueURL} target="_blank" className="themeButton" id="bug"><MdBugReport size={18}/></a>
					</div>
				</div>
				<Loader />
			</React.Fragment>
		);
	}

	renderModals() {
		return (
			<React.Fragment>
				<Modal isOpen={this.state.modalFeedback} toggle={this.giveFeedback} size="lg">
               <ModalHeader toggle={this.giveFeedback}>Feedback</ModalHeader>
               <ModalBody>
                   <Feedback />
               </ModalBody>
            </Modal>
			</React.Fragment>
		);
	}

	render() {
		return (
			<React.Fragment>
				{this.renderModals()}
				{
					!this.state.designerMode &&
					this.renderPage()
				}
				{
					this.state.designerMode &&
					this.renderDesignerMode()
				}
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
		account: state.account.account,
		character: state.character.selected,
		selectedTheme: state.theme.selected,
	};
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
