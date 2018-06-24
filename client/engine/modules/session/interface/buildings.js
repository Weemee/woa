import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {newInput} from '../actions';
import {Button, Progress} from 'reactstrap';

class Unlocks extends React.Component {
	constructor(props) {
		super(props);

		this.purchaseBuilding = this.purchaseBuilding.bind(this);
		this.removeBuilding = this.removeBuilding.bind(this);
		this.build = this.build.bind(this);
	}

	purchaseBuilding(buildingID) {
		this.props.newInput(`addbuilding ${buildingID}`);
	}

	removeBuilding(buildingID) {
		this.props.newInput(`removebuilding ${buildingID}`);
	}

	build() {
		if(this.props.character.actions.current.status !== 'building') {
			this.props.newInput('setcharacteraction building null');
		} else {
			this.props.newInput('setcharacteraction null null');
		}
	}

	render() {
		return (
			<React.Fragment>
				<div style={{position: 'absolute', width: '50%', left: '0', backgroundColor: 'rgba(0, 137, 137, 0.67)'}}>
					<div>
						Buildings
					</div>
					<div>
						Storage ({!this.props.character.buildings.storage ? 0 : 1337}): {!this.props.character.unlocked.buildings.storage ? (
							'false'
						) : (
							<Button color='blue' onClick={() => this.purchaseBuilding('storage')}>Buy</Button>
						)}
					</div>
					{
						!this.props.character.buildings.owned.researchlab.progress &&
						<div>
							Research lab ({!this.props.character.buildings.researchlab ? 0 : 1337}): {!this.props.character.unlocked.buildings.researchlab ? (
								'false'
							) : (
								<Button color='blue' onClick={() => this.purchaseBuilding('researchlab')}>Buy</Button>
							)}
						</div>
					}
				</div>
				<div style={{position: 'absolute', width: '50%', height: '100%', right: '0', backgroundColor: 'rgba(137, 137, 137, 0.67)'}}>
					<div style={{height: '42px', width: '100%'}}>
						<div style={{float: 'left', textAlign: 'center', width: '50%', marginTop: '5px'}}>
							Queue ({Object.keys(this.props.queue).length})
						</div>

						<div style={{float: 'right', width: '50%'}}>
							<Button style={{float: 'right', marginTop: '1px', marginRight: '10px'}} className="btn-info" onClick={this.build}>{this.props.character.actions.current.status !== 'building' ? 'Build' : 'Stop'}</Button>
						</div>
					</div>

					<div className="hideScroll">
						{
							!this.props.character.actions.buildingQueue ? (
								<p>Nothing in queue</p>
							) : (
								Object.keys(this.props.queue).map((index) => {
									const derp = index % 2 ? '(175, 175, 175, 0.8)' : '(95, 95, 95, 0.8)';
									return (
										<div id="queue" key={index} style={{height: '42px', display: 'block', top: '10px', backgroundColor: `rgb${derp}`}}>
											<Button style={
												{
													float: 'right',
													width: '25%',
													marginTop: '2px',
													marginRight: '2px'
												}
											} className="btn-danger" onClick={() => this.removeBuilding(index)}
											>
												Remove
											</Button>

											<div style={{position: 'static', width: '70%', textAlign: 'center', color: 'black'}}>
												{this.props.queue[index].ID.charAt(0).toUpperCase() + this.props.queue[index].ID.slice(1)}
											</div>

											<Progress value={(100 / (this.props.queue[index].time * 10)) * this.props.queue[index].steps} style={{width: '70%', float: 'left', marginLeft: '5px', marginTop: '-2px'}}>
												<div style={{color: 'black'}}>
													{this.props.queue[index].steps / 10}/{this.props.queue[index].time}
												</div>
											</Progress>
										</div>
									);
								})
							)
						}
					</div>
				</div>
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
		queue: state.character.selected.actions.buildingQueue,
	};
}

export default connect(mapStateToProps, mapActionsToProps)(Unlocks);
