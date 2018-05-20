//Base imports
import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Card, CardHeader} from 'reactstrap';

//Component class
class Server extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			sidebar: 'players',
		};
	}

	render() {
		return (
			<Card>
				<CardHeader>
					Server map
				</CardHeader>
			</Card>
		);
	}
};

function mapStateToProps(state) {
	return {
		servers: {...state.session.servers},
		server: {...state.session},
		character: state.character.selected,
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		//getFunctions
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Server);
