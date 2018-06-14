import React from 'react';
import {Card, CardBody, CardTitle, FormGroup, Input, Label, Button} from 'reactstrap';

class CreateCard extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			name: '',
			serverSelect: '',
			friendName: '',
			serverType: 'random',
			difficulty: '',
			specialization: '',
			spoiler: false,
		};

		this.specs = [
			{
				name: 'Arithmetic',
				description: 'is a very smart person when it comes to numbers! 10+11=101 (or 5 if you prefer), easy!',
			},
			{
				name: 'Capitalist',
				description: 'is the one the loves money. More money, more love. More love, more fun!',
			},
			{
				name: 'Casual',
				description: 'is a casual pleb. Nothing special...',
			},
			{
				name: 'Collector',
				description: 'is someone to keep an eye on. Before you know it, everything there is to collect is gone in a jiffy. Speedy speedy!',
			},
			{
				name: 'Engineer',
				description: 'is THE tinkerer. Without the Engineer, there would not be anything else. Please thank the Engineer next time you her/him.',
			},
			{
				name: 'Explorer',
				description: 'is maybe not around for the cruical times. But who cares? There is an entire universe to explore, let us go!',
			},
			{
				name: 'Farmer',
				description: 'is not the person you bring to a party. Farming, harvesting, producing and repeat. No time for parties, out me way!',
			},
			{
				name: 'Scientist',
				description: 'is perhaps the most tricky individual to understand. What is the science for? Any specific subject? NO, FOR SCIENCE!',
			},
		];

		this.diffs = [
			{
				diff: 'Tutorial',
				description: 'This difficulty is for those who are new to the game. Things will be easy to acquire and progression will be fast. However, there is an upper limit. Once a certain point has been reached, there is no more content on this difficulty. You would have to restart with a NEW charcter.',
			},
			{
				diff: 'Very easy',
				description: 'This difficulty is for those who want things to go faster. This does not mean the game will be very easy, just implying that progression will be way faster than any other difficulties.',
			},
			{
				diff: 'Easy',
				description: 'This difficulty is for those who want an average experience, but still faster than the Moderate difficulty. Everything is pretty much doubled (in favor for speed and progression)',
			},
			{
				diff: 'Moderate',
				description: 'This difficulty is for those who want the default values for everything in the game.',
			},
			{
				diff: 'Pretty hard',
				description: 'This difficulty is for those who easily gets bored if it is too easy and want something more of a challenge. The way you progress through the game on this difficulty is different from the other difficulties',
			},
			{
				diff: 'Kappa',
				description: 'Yeah... Are you sure? Ok, have fun! (this difficulty implements new mechanics)',
			},
		];

		this.return = this.return.bind(this);
		this.renderServerOptions = this.renderServerOptions.bind(this);
	}

	return(spec) {
		return {
			object: {
				name: this.state.name,
				server: this.state.serverSelect,
				spec: spec,
			},
			type: 'create',
		};
	}

	renderServerOptions() {
		return (
			<div>
				<Label>Location & Server</Label>
				<FormGroup check>
					<Label check>
						<Input
							type="radio"
							name="server"
							checked ={this.state.serverType === 'random'}
							onChange={(e) => {
								this.setState({
									serverType: e.target.value,
								});
							}}
							value='random'
						/>
							Random location
						<br />
					</Label>
				</FormGroup>

				<FormGroup check>
					<Label check>
						<Input
							type="radio"
							name="server"
							checked ={this.state.serverType === 'select'}
							onChange={(e) => {
								this.setState({
									serverType: e.target.value,
								});
							}}
							value='select'
						/>
							Select server
						<br />
					</Label>
				</FormGroup>
				{
					this.state.serverType === 'select' &&
					<FormGroup>
						<Input
							type="select"
							onChange={(e) => {
								this.setState({
									serverSelect: e.target.value,
								});
							}}
							value={this.state.serverSelect}
						>
							<option value="" defaultValue hidden>Select server</option>
							{
								Object.keys(this.props.serverMaps).map((serverID) => {
									return <option key={serverID} value={`"${this.props.serverMaps[serverID].name}"`}>{this.props.serverMaps[serverID].name}</option>
								})
							}
						</Input>
					</FormGroup>
				}
				<FormGroup check>
					<Label check>
						<Input
							type="radio"
							name="server"
							checked ={this.state.serverType === 'friend'}
							onChange={(e) => {
								this.setState({
									serverType: e.target.value,
								});
							}}
							value='friend'
						/>
							Spawn near friend
					</Label>
				</FormGroup>
			</div>
		);
	}

	render() {
		return (
			<div>
				<Card className="themeContainer">
					<CardBody>
						<CardTitle>Create character {this.state.name && <b>'{this.state.name}'</b>}</CardTitle>

						<FormGroup>
							<Label>Name</Label>
							<Input
								type="text"
								placeholder="Character name"
								onChange={(e) => {
									this.setState({
										name: e.target.value,
									});
								}}
								value={this.state.name}
							/>
						</FormGroup>

						<FormGroup>
							<Label>Difficulty</Label>
							<Input
								type="select"
								onChange={(e) => {
									this.setState({
										difficulty: e.target.value,
									});
								}}
								value={this.state.difficulty}
							>
								<option value="" defaultValue hidden>Select difficulty</option>
								{
									Object.keys(this.diffs).map((index) => {
										return <option key={index} value={index}>{this.diffs[index].diff}</option>
									})
								}
							</Input>
						</FormGroup>
						{
							this.state.difficulty !== '0' ?
							(
								this.renderServerOptions()
							) : (
								<div>
									If the difficulty <b>'{this.diffs[this.state.difficulty].diff}'</b> is selected, you can't select any server option. <br />
									The <b>'{this.diffs[this.state.difficulty].diff}'</b> is <b>only</b> meant to help you understand the game and learn the interface.
								</div>
							)
						}
						{
							this.state.serverType === 'friend' &&
							<FormGroup>
								<Input
									type="text"
									placeholder="Friend character name"
									onChange={(e) => {
										this.setState({
											friendName: e.target.value,
										});
									}}
									value={this.state.friendName}
								/>
							</FormGroup>
						}
						<br />

						<FormGroup>
							<Label>Specialization</Label>
							<Input
								type="select"
								onChange={(e) => {
									this.setState({
										specialization: e.target.value,
									});
								}}
								value={this.state.specialization}
							>
								<option value="" defaultValue hidden>Select specialization</option>
								{
									Object.keys(this.specs).map((index) => {
										return <option key={index} value={index}>{this.specs[index].name}</option>
									})
								}
							</Input>
						</FormGroup>

						{
							this.state.difficulty &&
							<div>
								Difficulty: <b>{this.diffs[this.state.difficulty].diff}</b> <br />
								{this.diffs[this.state.difficulty].description}
							</div>
						}
						{
							this.state.difficulty === '5' &&
							<div>
								<br />
								If you want a <b>HUGE</b> spoiler of what the <b>{this.diffs[this.state.difficulty].diff}</b> difficulty brings, click the button.
								<br />
								{
									!this.state.spoiler ? (
										<button
										type="button"
										className="themeButton"
										onClick={(e) => {
											this.setState({
												spoiler: !this.state.spoiler,
											});
										}}
										>
											Spoiler
										</button>
									) : (
										<div>
											<br />
											<p>The spoiler is...</p>
										</div>
									)	
								}
							</div>
						}
						{
							this.state.specialization &&
							<div>
								<br />
								Description: <b>{this.specs[this.state.specialization].name}</b> <br />
								The <b>{this.specs[this.state.specialization].name}</b> {this.specs[this.state.specialization].description}
							</div>
						}
						{
							this.state.name &&
							this.state.difficulty &&
							this.state.serverSelect &&
							this.state.specialization &&
							<Button className="themeButton" block={true} onClick={() => this.props.onClick(this.return(this.specs[this.state.specialization].name))}>Create character</Button>
						}
					</CardBody>
				</Card>
			</div>
		);
	}
}

export default CreateCard;
