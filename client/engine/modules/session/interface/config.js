import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {MdAddCircleOutline} from 'react-icons/lib/md';

class ConfigUI extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			editGrid: false,
		};

		this.toggleGrid = this.toggleGrid.bind(this);
	}

	toggleGrid() {
		this.setState({
			editGrid: !this.state.editGrid,
		});
	}

	renderSquare(i) {
		const x = i % 96;
		const y = Math.floor(i / 54);
		
		return (
			<div key={i}
				style={{width: '1.041666667%', height: '1.851851852%', borderStyle: 'dashed', borderWidth: '1px', backgroundColor: 'rgba(196, 196, 196, 0.65)'}}>
			</div>
		);
	}

	renderGrid() {
		const grid = [];
		for(let i = 0; i < 5184; i++) {
			grid.push(this.renderSquare(i));
		}
		return (
			<div style={{
				position: 'absolute',
				width: '100%',
				height: '100%',
				display: 'flex',
				flexWrap: 'wrap',
			}}>
				{grid}
			</div>
		);
	}

	render() {
		return (
			<React.Fragment>
				<div style={{position: 'absolute', width: '100%', height: '100%'}}>
					{this.renderGrid()}
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

	};
}

export default withRouter(connect(mapStateToProps, mapActionsToProps)(ConfigUI));
