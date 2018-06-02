import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class Unlocks extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<React.Fragment>
				<div>
					Unlocked features
				</div>
				<div>
					Research: {!this.props.unlocks.research && 'false'}
				</div>
				<div>
					Exploration: {!this.props.unlocks.exploration && 'false'}
				</div>
			</React.Fragment>
		);
	}
}

function mapActionsToProps(dispatch) {
	return bindActionCreators({
		
	}, dispatch);
}

function mapStateToProps(state) {
	return {
		unlocks: state.character.selected.unlocks,
	};
}

export default connect(mapStateToProps, mapActionsToProps)(Unlocks);
