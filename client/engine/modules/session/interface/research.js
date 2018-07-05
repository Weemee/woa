import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {newInput} from '../actions';
import {Button, Progress} from 'reactstrap';

class Research extends React.Component {
	constructor(props) {
		super(props);

		this.purchaseResearch = this.purchaseResearch.bind(this);
		this.removeResearch = this.removeResearch.bind(this);
		this.setStatus = this.setStatus.bind(this);
	}

	purchaseResearch(researchID) {
		this.props.newInput(`addresearch ${researchID}`);
	}

	removeResearch(researchID) {
		this.props.newInput(`removeresearch ${researchID}`);
	}

	setStatus(status, source) {
		this.props.newInput(`setcharacteraction ${status} ${source}`);
	}

	renderObject(res, i) {
		
		return (
			<div key={i}>
				{res}
				{
					<Button color='blue' onClick={() => this.purchaseResearch(res)}>Buy</Button>
				}
			</div>
		);
	}

	renderUnlocks() {
		const objects = [];

		Object.keys(this.props.character.research).map((res, index) => {
			if(this.props.character.unlocked.research[res]) {
				objects.push(this.renderObject(res, index));
			}
		});

		const status = this.props.character.actions.current.source === 'researching' ? [null, null] : ['researching', 'researching'];

		return (
			<div>
				<Button onClick={() => this.setStatus(status[0], status[1])} className="btn-info">
					{this.props.character.actions.current.status !== 'researching' ? 'Research' : 'Stop'}
				</Button>

				{objects}
			</div>
		);
	}

	render() {
		return (
			<React.Fragment>
				{this.renderUnlocks()}
			</React.Fragment>
		);
	}
}

function mapActionsToProps(dispatch) {
	return bindActionCreators({
		newInput,
	}, dispatch);
}

function mapStateToProps(state) {
	return {
		character: state.character.selected,
	};
}

export default connect(mapStateToProps, mapActionsToProps)(Research);
