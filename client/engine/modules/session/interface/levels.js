import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class Levels extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<React.Fragment>
				<div>
					Progress
				</div>
				<div>
					Exploration: lvl {this.props.levels.exploration.currentLevel}
				</div>
				<div>
					Science: lvl {this.props.levels.science.currentLevel}
				</div>
				<div>
					Engineerging: lvl {this.props.levels.engineering.currentLevel}
				</div>
				<div>
					Collection: lvl {this.props.levels.collection.currentLevel}
				</div>
				<div>
					Automation: lvl {this.props.levels.automation.currentLevel}
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
		levels: state.character.selected.levels,
	};
}

export default connect(mapStateToProps, mapActionsToProps)(Levels);
