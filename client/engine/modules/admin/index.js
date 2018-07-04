import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {Button, Label, ButtonGroup, Form, Input, FormGroup} from 'reactstrap';

import {newInput} from '../session/actions';

class Admin extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			tabSelected: 1,
			type: '',
			message: '',
			service: 'add',
			sent: false,
		};
	}

	adminSend() {
		this.props.newInput(`adminadd ${this.state.message} ${this.state.type} ${this.state.service}`);
		//alert(msg);
	}


	tabSelect(tabSelected) {
		this.setState({
			tabSelected: tabSelected,
		});
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
					<FormGroup check>
						<Label check>
							<Input
								type="radio"
								name="server"
								checked ={this.state.type === 'Difficulty'}
								onChange={(e) => {
									this.setState({
										type: e.target.value,
										serverSelect: e.target.value,
									});
								}}
								value='Difficulty'
							/>
								Difficulty
							<br />
						</Label>
					</FormGroup>

					<FormGroup check>
						<Label check>
							<Input
								type="radio"
								name="server"
								checked ={this.state.type === 'Specialization'}
								onChange={(e) => {
									this.setState({
										type: e.target.value,
									});
								}}
								value='Specialization'
							/>
								Specialization
							<br />
						</Label>
					</FormGroup>
					<FormGroup>
						<Input
							onChange={(e) => {
								this.setState({
									message: e.target.value,
								});
							}}
							value={this.state.message}
							placeholder="Name"
						/>
					</FormGroup>
					{
						!this.state.sent &&
						this.state.message &&
						this.state.type &&
						<Button className="btn btn-info" style={{float: 'right'}} onClick={() => this.adminSend()} color="themeButton">Reload server</Button>
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
		//Temporary
		return (
			<React.Fragment>
				<div id="adminArea">
					{this.renderTabs()}
					{render}
				</div>
			</React.Fragment>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		newInput,
	}, dispatch);
}

function mapStateToProps(state) {
	return {
		//Debdsaf
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
