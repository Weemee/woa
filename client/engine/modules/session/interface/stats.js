import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class Stats extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<React.Fragment>
				<div>
					Stats
				</div>
				<div>
					Name: {this.props.character.name}
				</div>
				<div>
					Specialization: {this.props.character.spec}
				</div>
				<div>
					Status: {this.props.character.stats.status}
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
		character: state.character.selected,
	};
}

export default connect(mapStateToProps, mapActionsToProps)(Stats);
