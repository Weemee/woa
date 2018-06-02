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
				<div>
					Fusion: {!this.props.research.fusion && 'false'}
				</div>
				<div>
					Production: {!this.props.research.production && 'false'}
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
		research: state.character.selected.research,
	};
}

export default connect(mapStateToProps, mapActionsToProps)(Research);
