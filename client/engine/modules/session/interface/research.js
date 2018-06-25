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
		this.research = this.research.bind(this);
	}

	purchaseResearch(buildingID) {
		this.props.newInput(`addbuilding ${buildingID}`);
	}

	removeResearch(buildingID) {
		this.props.newInput(`removebuilding ${buildingID}`);
	}

	research() {
		if(this.props.character.actions.current.status !== 'building') {
			this.props.newInput('setcharacteraction building null');
		} else {
			this.props.newInput('setcharacteraction null null');
		}
	}

	render() {
		return (
			<React.Fragment>
				Penis
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
