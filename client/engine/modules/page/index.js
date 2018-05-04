import React from 'react';
import {Card, CardBody} from 'reactstrap';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import {Container, Row, Col} from 'reactstrap';

import {setMousePos} from '../utils/actions';
import {setTheme} from '../theme/actions';
import TOTP from '../totp';

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

	render() {
		return (
			<Container className={`theme-${this.props.selectedTheme}`}>
			<Row>
				<Col className=".col-6">
					<div style={{width:'250px', height:'250px'}} onMouseMove={(e) => this.mouseMove(e)}>
						Move here and your MouseX: {this.props.pos.x} and MouseY: {this.props.pos.y} will show!
					</div>
				</Col>

				<Col className=".col-6">
					<TOTP />
				</Col>
			</Row>
			<button type="button" className="btn btn-blue" onClick={() => this.changeTheme('blue')}>Blue</button>
			<button type="button" className="btn btn-indigo" onClick={() => this.changeTheme('indigo')}>Indigo</button>
			<button type="button" className="btn btn-purple" onClick={() => this.changeTheme('purple')}>Purple</button>
			<button type="button" className="btn btn-pink" onClick={() => this.changeTheme('pink')}>Pink</button>
			<button type="button" className="btn btn-red" onClick={() => this.changeTheme('red')}>Red</button>
			<button type="button" className="btn btn-orange" onClick={() => this.changeTheme('orange')}>Orange</button>
			<button type="button" className="btn btn-yellow" onClick={() => this.changeTheme('yellow')}>Yellow</button>
			<button type="button" className="btn btn-green" onClick={() => this.changeTheme('green')}>Green</button>
			<button type="button" className="btn btn-teal" onClick={() => this.changeTheme('teal')}>Teal</button>
			<button type="button" className="btn btn-cyan" onClick={() => this.changeTheme('cyan')}>Cyan</button>
			<button type="button" className="btn btn-dark" onClick={() => this.changeTheme('dark')}>Dark</button>
			<button type="button" className="btn btn-light" onClick={() => this.changeTheme('light')}>Light</button>
			</Container>

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
