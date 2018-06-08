import React from 'react';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import {Row, Col} from 'reactstrap';

import {setMousePos} from '../utils/actions';

import {ContextMenu, MenuItem, ContextMenuTrigger} from 'react-contextmenu';

class Page extends React.Component {
	constructor(props) {
		super(props);
	}

	mouseMove(event) {
		this.props.setMousePos(event.clientX, event.clientY);
	}

	handleClick(e, data) {
		console.log(data.penis);
	}

	render() {
		return (
			<div id="contentWrapper" className="themeContainer">
				<Row style={{marginLeft: '20px', marginTop: '20px'}}>
					<Col className=".col-6">
						<div style={{width:'250px', height:'250px'}} onMouseMove={(e) => this.mouseMove(e)}>
							Move here and your MouseX: {this.props.pos.x} and MouseY: {this.props.pos.y} will show!
						</div>
					</Col>
				</Row>
				<Row style={{marginLeft: '20px', marginTop: '20px'}}>
					<Col>
						<div>
							<ContextMenuTrigger id="lizaPenis">
								<button type="button" className="themeButton">ContextMenuTrigger</button>
							</ContextMenuTrigger>
							<ContextMenu className="contextMenuItems" id="lizaPenis">
								<MenuItem data={{penis: 'Derp'}} onClick={this.handleClick}>
									<button type="button" className="themeButton">Derp</button>
								</MenuItem>
								<MenuItem className="contextMenuItem" data={{penis: 'Herp'}} onClick={this.handleClick}>
									<button type="button" className="themeButton">Herp</button>
								</MenuItem>
							</ContextMenu>
						</div>
					</Col>
				</Row>
			</div>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		setMousePos,
	}, dispatch);
}

function mapStateToProps(state) {
	return {
		pos: {x: state.utils.mousePos.x, y: state.utils.mousePos.y},
	};
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Page));
