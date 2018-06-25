import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class Location extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const x = 10000;
		const y = 10000;
		const z = 10000;

		const instance = Math.pow((x*y*z).toExponential(), 7).toExponential(2);

		return (
			<React.Fragment>
				<div>
					Multiverse: {this.props.location.multiverse.name}, x: {this.props.location.multiverse.x}, y: {this.props.location.multiverse.y}, z: {this.props.location.multiverse.z}
				</div>
				<div>
					Universe: {this.props.location.universe.name}, x: {this.props.location.universe.x}, y: {this.props.location.universe.y}, z: {this.props.location.universe.z}
				</div>
				<div>
					Super cluster: {this.props.location.supercluster.name}, x: {this.props.location.supercluster.x}, y: {this.props.location.supercluster.y}, z: {this.props.location.supercluster.z}
				</div>
				<div>
					Local cluster: {this.props.location.localcluster.name}, x: {this.props.location.localcluster.x}, y: {this.props.location.localcluster.y}, z: {this.props.location.localcluster.z}
				</div>
				<div>
					Galaxy: {this.props.location.galaxy.name}, x: {this.props.location.galaxy.x}, y: {this.props.location.galaxy.y}, z: {this.props.location.galaxy.z}
				</div>
				<div>
					Interstellar neighbourhood: {this.props.location.interstellar.name}, x: {this.props.location.interstellar.x}, y: {this.props.location.interstellar.y}, z: {this.props.location.interstellar.z}
				</div>
				<div>
					Solarsystem: {this.props.location.solarsystem.name}, x: {this.props.location.solarsystem.x}, y: {this.props.location.solarsystem.y}, z: {this.props.location.solarsystem.z}
				</div>
				<div>
					Current size of the multiverse: {instance}
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
		location: state.character.selected.location,
	};
}

export default connect(mapStateToProps, mapActionsToProps)(Location);
