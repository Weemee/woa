import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class Resources extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<React.Fragment>
				<div>
					Resources
				</div>
				<div>
					Hydrogen: {this.props.resources.hydrogen.owned}/{this.props.resources.hydrogen.max}
				</div>
				<div>
					Helium: {this.props.resources.helium.owned}/{this.props.resources.helium.max}
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
		resources: state.character.selected.resources,
	};
}

export default connect(mapStateToProps, mapActionsToProps)(Resources);
