//Base imports
import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Players from '../players';

import {Card, Modal, ModalHeader, ModalBody} from 'reactstrap';

//Custom imports
//importFunctions

//Component class
class CharacterUI extends React.Component {
	constructor(props) {
		super(props);
	}

	renderModals() {
		return (
			<React.Fragment>
				<Modal isOpen={this.props.playersOpen} size="lg">

				</Modal>
			</React.Fragment>
		);
	}

	render() {
		return (
			<React.Fragment>
				{this.renderModals()}
				<Card>
					Players ({this.props.players.length})
				</Card>
			</React.Fragment>
		);
	}
};

function mapStateToProps(state) {
	return {
		players: state.session.players,
		character: state.character.selected,
		playersOpen: state.playerUI.open,
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		//getFunctions
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CharacterUI);
