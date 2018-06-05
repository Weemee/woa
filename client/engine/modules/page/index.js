import React from 'react';
import {Card, CardBody} from 'reactstrap';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import {Container, Row, Col} from 'reactstrap';

import {setMousePos} from '../utils/actions';
import {setTheme} from '../themes/actions';

import {ContextMenu, MenuItem, ContextMenuTrigger} from 'react-contextmenu';

class Page extends React.Component {
	constructor(props) {
		super(props);
	}

	mouseMove(event) {
		this.props.setMousePos(event.clientX, event.clientY);
	}

	changeTheme(theme) {
		this.props.setTheme(theme);
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
					<button type="button" className="themeButton" onClick={() => this.changeTheme('blue')}>Blue</button>
					<button type="button" className="themeButton" onClick={() => this.changeTheme('indigo')}>Indigo</button>
					<button type="button" className="themeButton" onClick={() => this.changeTheme('purple')}>Purple</button>
					<button type="button" className="themeButton" onClick={() => this.changeTheme('pink')}>Pink</button>
					<button type="button" className="themeButton" onClick={() => this.changeTheme('red')}>Red</button>
					<button type="button" className="themeButton" onClick={() => this.changeTheme('orange')}>Orange</button>
					<button type="button" className="themeButton" onClick={() => this.changeTheme('yellow')}>Yellow</button>
					<button type="button" className="themeButton" onClick={() => this.changeTheme('green')}>Green</button>
					<button type="button" className="themeButton" onClick={() => this.changeTheme('teal')}>Teal</button>
					<button type="button" className="themeButton" onClick={() => this.changeTheme('cyan')}>Cyan</button>
					<button type="button" className="themeButton" onClick={() => this.changeTheme('dark')}>Dark</button>
					<button type="button" className="themeButton" onClick={() => this.changeTheme('light')}>Light</button>
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
		setTheme,
	}, dispatch);
}

function mapStateToProps(state) {
	return {
		pos: {x: state.utils.mousePos.x, y: state.utils.mousePos.y},
		selectedTheme: state.theme.name,
	};
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Page));
