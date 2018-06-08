import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class Research extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<React.Fragment>
				<div>
					Researched
				</div>
				{/* AUTOMATE THIS */}
				<div>
					Fusion: {!this.props.research.fusion && 'false'}
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
		research: state.character.selected.unlocked.research,
	};
}

export default connect(mapStateToProps, mapActionsToProps)(Research);
