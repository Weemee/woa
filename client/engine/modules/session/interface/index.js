import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Fade, Navbar, Nav, NavItem, Row, Col} from 'reactstrap';
import { CSSTransitionGroup } from 'react-transition-group';

import {MdAddCircleOutline, MdAccessible, Md3dRotation, MdAirlineSeatFlatAngled, MdAvTimer, MdBatteryChargingFull} from 'react-icons/lib/md';

import Resources from './resources';
import Levels from './levels';
import Location from './location';
import Buildings from './buildings';
import Stats from './stats';
import Research from './research';

class Interface extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			left: {
				fadeIn: true,
				triggered: (this.props.character.unlocked.elements.hydrogen ? true : false),
			},
			top: {
				fadeIn: false,
				triggered: (this.props.character.unlocked.functions.location ? true : false),
			},
			right: {
				fadeIn: false,
				triggered: (this.props.character.unlocked.buildings.storage ? true : false),
			},
			middle: {
				fadeIn: false,
				triggered: (this.props.character.unlocked.functions.talents ? true : false),
			},
			bottomRight: {
				fadeIn: false,
				triggered: (this.props.character.unlocked.functions.research ? true : false),
			},
			bottomLeft: {
				fadeIn: true,
				triggered: (this.props.character.unlocked.elements.hydrogen ? true : false),
			},
		};

		this.toggleContainer = this.toggleContainer.bind(this);
	}

	componentDidMount() {
		console.log('\nUpdated at:', this.props.character.updatedAt);
		console.log('\nCurrent time: ' + new Date().getSeconds());
	}

	toggleContainer(con) {
		if(con === 'left') {
			this.setState({
				left: {
					fadeIn: !this.state.left.fadeIn,
					triggered: true,
				},
			});
		}

		if(con === 'top') {
			this.setState({
				top: {
					fadeIn: !this.state.top.fadeIn,
					triggered: true,
				},
			});
		}

		if(con === 'right') {
			this.setState({
				right: {
					fadeIn: !this.state.right.fadeIn,
					triggered: true,
				},
			});
		}

		if(con === 'middle') {
			this.setState({
				middle: {
					fadeIn: !this.state.middle.fadeIn,
					triggered: true,
				},
			});
		}

		if(con === 'bottomRight') {
			this.setState({
				bottomRight: {
					fadeIn: !this.state.bottomRight.fadeIn,
					triggered: true,
				},
			});
		}

		if(con === 'bottomLeft') {
			this.setState({
				bottomLeft: {
					fadeIn: !this.state.bottomLeft.fadeIn,
					triggered: true,
				},
			});
		}	
	}

	render() {
		return (	
			<React.Fragment>
				{
					this.state.left.triggered &&
					<Fade in={this.state.left.fadeIn} style={{position: 'absolute', width: '15%', height: '30%', borderStyle: 'solid', borderWidth: '2px', backgroundColor: 'rgba(92, 137, 137, 0.90)', top: '40%', left: '0'}}>
						<Resources />
					</Fade>
				}
				{
					this.state.top.triggered &&
					<Fade in={this.state.top.fadeIn} style={{position: 'absolute', width: '40%', height: '20%', borderStyle: 'solid', borderWidth: '2px', backgroundColor: 'rgba(92, 137, 137, 0.90)', marginLeft: '30%'}}>
						<Location />
					</Fade>
				}
				{
					this.state.right.triggered &&
					<Fade in={this.state.right.fadeIn} style={{position: 'absolute', width: '60%', height: '40%', borderStyle: 'solid', borderWidth: '2px', backgroundColor: 'rgba(92, 137, 137, 0.90)', top: '30%', right: '20%'}}>
						<Buildings />
					</Fade>
				}
				{
					this.state.middle.triggered &&
					<Fade in={this.state.middle.fadeIn} style={{position: 'absolute', width: '20%', height: '20%', borderStyle: 'solid', borderWidth: '2px', backgroundColor: 'rgba(92, 137, 137, 0.90)', marginTop: '60%', marginLeft: '40%'}}>
						<Levels />
					</Fade>
				}
				{
					this.state.bottomRight.triggered &&
					<Fade in={this.state.bottomRight.fadeIn} style={{position: 'absolute', width: '20%', height: '20%', borderStyle: 'solid', borderWidth: '2px', backgroundColor: 'rgba(92, 137, 137, 0.90)', bottom: '0', right: '0'}}>
						<Research />
					</Fade>
				}
				{
					this.state.bottomLeft.triggered &&
					<Fade in={this.state.bottomLeft.fadeIn} style={{position: 'absolute', width: '20%', height: '20%', borderStyle: 'solid', borderWidth: '2px', backgroundColor: 'rgba(92, 137, 137, 0.90)', bottom: '0', left: '0'}}>
						<Stats />
					</Fade>
				}

				<div className="userInterface">
					<div id="bottomBar">
						<Navbar>
							<Nav>
							{
								this.props.character.unlocked.elements.hydrogen &&
								<NavItem>
									{
										!this.state.left.triggered &&
										<Fade in={true} timeout={150}>
											<div className="btn-warning newThing">
												<b>!</b>
											</div>
										</Fade>
									}
									<a href="#" onClick={() => this.toggleContainer('left')} className={'btn btn-' + (this.state.left ? 'primary active' : 'info')}><MdAddCircleOutline /></a>
								</NavItem>
							}
							{
								this.props.character.unlocked.functions.location &&
								<NavItem>
								{
									!this.state.top.triggered &&
									<Fade in={true} timeout={150}>
										<div className="btn-warning newThing">
											<b>!</b>
										</div>
									</Fade>
								}
									<a href="#" onClick={() => this.toggleContainer('top')} className={'btn btn-' + (this.state.top ? 'primary active' : 'info')}><MdAccessible /></a>
								</NavItem>
							}
							{
								this.props.character.unlocked.buildings.storage &&
								<NavItem>
								{
									!this.state.right.triggered &&
									<Fade in={true} timeout={150}>
										<div className="btn-warning newThing">
											<b>!</b>
										</div>
									</Fade>
								}
									<a href="#" onClick={() => this.toggleContainer('right')} className={'btn btn-' + (this.state.right ? 'primary active' : 'info')}><Md3dRotation /></a>
								</NavItem>
							}
							{
								this.props.character.unlocked.functions.talents &&
								<NavItem>
								{
									!this.state.middle.triggered &&
									<Fade in={true} timeout={150}>
										<div className="btn-warning newThing">
											<b>!</b>
										</div>
									</Fade>
								}
									
									<a href="#" onClick={() => this.toggleContainer('middle')} className={'btn btn-' + (this.state.middle ? 'primary active' : 'info')}><MdAirlineSeatFlatAngled /></a>
								</NavItem>
							}
							{
								this.props.character.unlocked.functions.research &&
								<NavItem>
								{
									!this.state.bottomRight.triggered &&
									<Fade in={true} timeout={150}>
										<div className="btn-warning newThing">
											<b>!</b>
										</div>
									</Fade>
								}
									
									<a href="#" onClick={() => this.toggleContainer('bottomRight')} className={'btn btn-' + (this.state.bottomRight ? 'primary active' : 'info')}><MdAvTimer /></a>
								</NavItem>
							}
							{
								this.props.character.unlocked.elements.hydrogen &&
								<NavItem>
								{
									!this.state.bottomLeft.triggered &&
									<Fade in={true} timeout={150}>
										<div className="btn-warning newThing">
											<b>!</b>
										</div>
									</Fade>
								}
									<a href="#" onClick={() => this.toggleContainer('bottomLeft')} className={'btn btn-' + (this.state.bottomLeft ? 'primary active' : 'info')}><MdBatteryChargingFull /></a>
								</NavItem>
							}
							</Nav>
						</Navbar>
					</div>
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
		character: state.character.selected,
	};
}

export default connect(mapStateToProps, mapActionsToProps)(Interface);
