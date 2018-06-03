import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {newInput} from '../actions';
import {Button} from 'reactstrap';

class Resources extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			generating: this.props.actions.generating,
		};

		this.generateResource = this.generateResource.bind(this);
	}

	generateResource(resource) {
		console.log(resource);
		this.setState({
			generating: resource,
		});
		this.props.newInput(`generateresource ${resource}`);
	}

	render() {
		return (
			<React.Fragment>
				<div>
					Resources
				</div>
				<div>
					Hydrogen: {this.props.resources.hydrogen.owned}/{this.props.resources.hydrogen.max}
					{
						this.state.generating === 'hydrogen' ? (
							<Button color='blue' onClick={() => this.generateResource('slacking')}>Stop</Button>
						) : (
							<Button color='blue' onClick={() => this.generateResource('hydrogen')}>Generate</Button>
						)
					}
				</div>
				<div>
					Helium: {this.props.resources.helium.owned}/{this.props.resources.helium.max}
					{
						this.state.generating === 'helium' ? (
							<Button color='blue' onClick={() => this.generateResource('slacking')}>Stop</Button>
						) : (
							<Button color='blue' onClick={() => this.generateResource('helium')}>Generate</Button>
						)
					}
				</div>
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
		resources: state.character.selected.resources,
		actions: state.character.selected.actions,
	};
}

export default connect(mapStateToProps, mapActionsToProps)(Resources);
