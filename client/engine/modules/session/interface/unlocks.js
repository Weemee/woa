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
					Research: {!this.props.unlocked.research.fusion ? ('false') : ('true')}
				</div>
				<div>
					Exploration: {!this.props.unlocked.buildings.storage ? ('false') : ('true')}
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
		unlocked: state.character.selected.unlocked,
	};
}

export default connect(mapStateToProps, mapActionsToProps)(Unlocks);
