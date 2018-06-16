import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {newInput} from '../actions';
import {Button} from 'reactstrap';

class Resources extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			status: this.props.character.actions.current.status,
			source: this.props.character.actions.current.source,
		};

		this.setStatus = this.setStatus.bind(this);
	}

	setStatus(status, source) {
		console.log(status, source);
		this.setState({
			status: status,
			source: source,
		});
		this.props.newInput(`setcharacteraction ${status} ${source}`);
	}

	render() {
		return (
			<React.Fragment>
				<div>
					Resources
				</div>
				{
					this.props.character.unlocked.elements.hydrogen &&
				<div>
						Hydrogen: {this.props.character.resources.hydrogen.owned}/{this.props.character.resources.hydrogen.max}
					{
						this.state.source === 'hydrogen' ? (
							<Button color='blue' onClick={() => this.setStatus(null, null)}>Stop</Button>
						) : (
							<Button color='blue' onClick={() => this.setStatus('gathering', 'hydrogen')}>Generate</Button>
						)
					}
				</div>
				}
				{
					this.props.character.unlocked.elements.helium &&
				<div>
						Helium: {this.props.character.resources.helium.owned}/{this.props.character.resources.helium.max}
					{
						this.state.source === 'helium' ? (
							<Button color='blue' onClick={() => this.setStatus(null, null)}>Stop</Button>
						) : (
							<Button color='blue' onClick={() => this.setStatus('gathering', 'helium')}>Generate</Button>
						)
					}
				</div>
				}
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

export default connect(mapStateToProps, mapActionsToProps)(Resources);
