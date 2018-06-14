import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Modal, ModalHeader, ModalBody, Navbar, Nav, NavItem, Row, Col} from 'reactstrap';

import {MdAddCircleOutline, MdAccessible, Md3dRotation, MdAirlineSeatFlatAngled, MdAvTimer, MdBatteryChargingFull} from 'react-icons/lib/md';

import Resources from './resources';
import Levels from './levels';
import Location from './location';
import Unlocks from './unlocks';
import Stats from './stats';
import Research from './research';

class Interface extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			left: false,
			top: false,
			right: false,
			middle: false,
			bottomRight: false,
			bottomLeft: false,
		};

		this.toggleContainer = this.toggleContainer.bind(this);
	}

	toggleContainer(con) {
		console.log(con);
		if(con === 'left') {
			this.setState({
				left: !this.state.left,
			});
		}

		if(con === 'top') {
			this.setState({
				top: !this.state.top,
			});
		}

		if(con === 'right') {
			this.setState({
				right: !this.state.right,
			});
		}

		if(con === 'middle') {
			this.setState({
				middle: !this.state.middle,
			});
		}

		if(con === 'bottomRight') {
			this.setState({
				bottomRight: !this.state.bottomRight,
			});
		}

		if(con === 'bottomLeft') {
			this.setState({
				bottomLeft: !this.state.bottomLeft,
			});
		}	
	}

	render() {
		return (	
			<React.Fragment>
				{
					this.state.left &&
					<div style={{position: 'absolute', width: '15%', height: '30%', borderStyle: 'solid', borderWidth: '2px', backgroundColor: 'rgba(92, 137, 137, 0.90)', top: '40%', left: '0'}}>
						<Resources />
					</div>
				}
				{
					this.state.top &&
					<div style={{position: 'absolute', width: '40%', height: '20%', borderStyle: 'solid', borderWidth: '2px', backgroundColor: 'rgba(92, 137, 137, 0.90)', marginLeft: '30%'}}>
						<Location />
					</div>
				}
				{
					this.state.right &&
					<div style={{position: 'absolute', width: '15%', height: '30%', borderStyle: 'solid', borderWidth: '2px', backgroundColor: 'rgba(92, 137, 137, 0.90)', top: '40%', right: '0'}}>
						<Unlocks />
					</div>
				}
				{
					this.state.middle &&
					<div style={{position: 'absolute', width: '20%', height: '20%', borderStyle: 'solid', borderWidth: '2px', backgroundColor: 'rgba(92, 137, 137, 0.90)', marginTop: '20%', marginLeft: '40%'}}>
						<Levels />
					</div>
				}
				{
					this.state.bottomRight &&
					<div style={{position: 'absolute', width: '20%', height: '20%', borderStyle: 'solid', borderWidth: '2px', backgroundColor: 'rgba(92, 137, 137, 0.90)', bottom: '0', right: '0'}}>
						<Research />
					</div>
				}
				{
					this.state.bottomLeft &&
					<div style={{position: 'absolute', width: '20%', height: '20%', borderStyle: 'solid', borderWidth: '2px', backgroundColor: 'rgba(92, 137, 137, 0.90)', bottom: '0', left: '0'}}>
						<Stats />
					</div>
				}

				<div className="userInterface">
					<div id="bottomBar">
						<Navbar>
							<Nav>
							{
								this.props.character.unlocked.elements.hydrogen &&
								<NavItem>
									<a href="#" onClick={() => this.toggleContainer('left')} className="btn btn-primary"><MdAddCircleOutline /></a>
								</NavItem>
							}
							{
								this.props.character.unlocked.functions.location &&
								<NavItem>
									<a href="#" onClick={() => this.toggleContainer('top')} className="btn btn-primary"><MdAccessible /></a>
								</NavItem>
							}
							{
								this.props.character.unlocked.functions.location &&
								<NavItem>
									<a href="#" onClick={() => this.toggleContainer('right')} className="btn btn-primary"><Md3dRotation /></a>
								</NavItem>
							}
							{
								this.props.character.unlocked.functions.talents &&
								<NavItem>
									<a href="#" onClick={() => this.toggleContainer('middle')} className="btn btn-primary"><MdAirlineSeatFlatAngled /></a>
								</NavItem>
							}
							{
								this.props.character.unlocked.functions.research &&
								<NavItem>
									<a href="#" onClick={() => this.toggleContainer('bottomRight')} className="btn btn-primary"><MdAvTimer /></a>
								</NavItem>
							}
							{
								this.props.character.unlocked.elements.hydrogen &&
								<NavItem>
									<a href="#" onClick={() => this.toggleContainer('bottomLeft')} className="btn btn-primary"><MdBatteryChargingFull /></a>
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
