import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {MdBugReport} from 'react-icons/lib/md';
import {Alert, Input, FormGroup, Button, ButtonGroup, Form} from 'reactstrap';

class Feedback extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			visible: false,
			subject: '',
			message: '',
			sent: false,
		};

		this.tabSelect = this.tabSelect.bind(this);
		this.sendFeeback = this.sendFeeback.bind(this);
	}

	sendFeeback(msg) {
		this.setState({
			sent: true,
		});
	}

	tabSelect(tabSelected) {
		this.setState({
			tabSelected
		});
	 }

	generateResponse() {
		if(!this.state.sent) {
			return;
		}
		return (
			<div>
				<Alert color="info">
					<h4 className="alert-heading"><b>Thank you!</b></h4>
					<p>
						Your feedback should have arrived at our servers now, where we can take a look at it and go over what is said in it.
						If your feedback turns out to be of great use for the development of the game, you will be rewarded in some way.
					</p>
					<p>
						How? We do not know yet, but you can leave feedback on that too! As long as it does not break the policy of the game.
					</p>
					<hr />
					<p className="mb-0">
						<b>Policies:</b>
							<li>Educational</li>
							<li>No "pay to win" encouragement</li>
					</p>
					<hr />
					<p>
						The feedback you sent us:
					</p>
					<p>
						<b>Subject:</b> {this.state.subject}
					</p>

					<p>
						<b>Message:</b> {this.state.message}
					</p>
				</Alert>
			</div>
		);
	}

	renderTabs() {
		return (
			<div>
				<ButtonGroup>
					<Button className="btn btn-info" onClick={() => this.tabSelect(1)} active={this.state.tabSelected === 1}>General</Button>
					<Button className="btn btn-info" onClick={() => this.tabSelect(2)} active={this.state.tabSelected === 2}>Balancing</Button>
					<Button className="btn btn-info" onClick={() => this.tabSelect(3)} active={this.state.tabSelected === 3}>Suggestion</Button>
					<Button className="btn btn-info" onClick={() => this.tabSelect(4)} active={this.state.tabSelected === 4}>Complain</Button>
				</ButtonGroup>
			</div>
		);
	}

	renderGeneralTab() {
		return (
			<div>
				<br/>
				<Form>
					<FormGroup>
						<Input
							onChange={(e) => {
								this.setState({
									subject: e.target.value,
								});
							}}
							value={this.state.subject}
							placeholder="Subject"
						/>
					</FormGroup>
					<FormGroup>
						<Input
							onChange={(e) => {
								this.setState({
									message: e.target.value,
								});
							}}
							value={this.state.message}
							placeholder="Feedback"
						/>
					</FormGroup>
					{
						!this.state.sent &&
						this.state.message &&
						this.state.subject &&
						<Button className="btn btn-info" style={{float: 'right'}} onClick={() => this.sendFeeback(this.state.message)} color="themeButton">Send</Button>
					}
				</Form>
			</div>
		);
	}

	renderBalancingTab() {
		return (
			<div>
				Balancing
			</div>
		);
	}

	renderSuggestionTab() {
		return (
			<div>
				Suggestion
			</div>
		);
	}

	renderComplainTab() {
		return (
			<div>
				Complain
			</div>
		);
	}

	render() {
		let render;

		switch(this.state.tabSelected) {
			case 1:
				render = this.renderGeneralTab();
			break;

			case 2:
				render = this.renderBalancingTab();
			break;

			case 3:
				render = this.renderSuggestionTab();
			break;

			case 4:
				render = this.renderComplainTab();
			break;
		}

		return (
			<React.Fragment>
				{this.generateResponse()}
				{
					!this.state.sent &&
					<div>
						{this.renderTabs()}
						{render}
					</div>
				}			
			</React.Fragment>
		);
	}
}

function mapStateToProps(state) {
	return {
		account: state.account.account,
	};
}

export default connect(mapStateToProps)(Feedback);
