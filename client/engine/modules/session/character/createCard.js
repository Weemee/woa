import React from 'react';
import {Alert, Card, CardBody, CardTitle, FormGroup, Input, Label, Button} from 'reactstrap';

class CreateCard extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			name: '',
			serverSelect: 'random',
			friendName: '',
			serverType: 'random',
			difficulty: '',
			specialization: '',
			spoiler: false,
		};

		this.return = this.return.bind(this);
	}

	return(spec) {
		let sendServer = this.state.serverSelect;
		if(this.state.difficulty === '0') {
			sendServer = 'tutorial';
		}

		if(this.state.friendName) {
			sendServer = 'friend' + this.state.friendName;
		}

		console.log(sendServer);

		return {
			object: {
				name: this.state.name,
				server: sendServer,
				spec: spec,
				difficulty: this.state.difficulty,
			},
			type: 'create',
		};
	}

	firstUppercase(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
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
									serverSelect: e.target.value,
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
									serverSelect: '',
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
								invalid={this.state.invalidName}
								onChange={(e) => {
									this.setState({
										name: e.target.value,
										invalidName: (e.target.value.length > 16 || e.target.value.length < 3) ? true : false,
									});
								}}
								value={this.state.name}
							/>
							{
								this.state.invalidName &&
								<Alert color="danger">Name is not valid!</Alert>
							}
						</FormGroup>

						<FormGroup>
							<Label>Difficulty</Label>
							<Input
								type="select"
								onChange={(e) => {
									this.setState({
										difficulty: e.target.value,
										spoiler: false,
									});
								}}
								value={this.state.difficulty}
							>
								<option value="" defaultValue hidden>Select difficulty</option>
								{
									Object.keys(this.props.difficulties).map((index) => {
										return <option key={index} value={index}>{this.firstUppercase(this.props.difficulties[index].name)}</option>
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
									If the difficulty <b>'{this.firstUppercase(this.props.difficulties[this.state.difficulty].name)}'</b> is selected, you can't select any server option. <br />
									The <b>{this.firstUppercase(this.props.difficulties[this.state.difficulty].name)}</b> is <b>only</b> meant to help you understand the game and learn the interface.
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
											serverSelect: 'friend',
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
									Object.keys(this.props.specializations).map((index) => {
										return <option key={index} value={index}>{this.firstUppercase(this.props.specializations[index].name)}</option>
									})
								}
							</Input>
						</FormGroup>

						{
							this.state.difficulty &&
							<div>
								Difficulty: <b>{this.firstUppercase(this.props.difficulties[this.state.difficulty].name)}</b> <br />
								{this.props.difficulties[this.state.difficulty].description}
							</div>
						}
						{
							this.state.difficulty !== '' &&
							this.props.difficulties[this.state.difficulty].spoiler &&
							<div>
								<br />
								If you want a <b>HUGE</b> spoiler of what the <b>{this.props.difficulties[this.state.difficulty].name}</b> difficulty brings, click the button.
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
											<p>{this.props.difficulties[this.state.difficulty].spoiler}</p>
										</div>
									)	
								}
							</div>
						}
						{
							this.state.specialization &&
							<div>
								<br />
								Description: <b>{this.firstUppercase(this.props.specializations[this.state.specialization].name)}</b> <br />
								The <b>'{this.props.specializations[this.state.specialization].name}'</b> {this.props.specializations[this.state.specialization].description}
							</div>
						}
						{
							this.state.difficulty === '0' ? (
								!this.state.invalidName &&
								this.state.name &&
								this.state.difficulty &&
								this.state.specialization &&
								<Button className="themeButton" block={true} onClick={() => this.props.onClick(this.return(this.specs[this.state.specialization].name))}>Create character</Button>
							) : (
								!this.state.invalidName &&
								this.state.name &&
								this.state.difficulty &&
								this.state.serverSelect &&
								this.state.specialization &&
								<Button className="themeButton" block={true} onClick={() => this.props.onClick(this.return(this.specs[this.state.specialization].name))}>Create character</Button>
							)
						}
					</CardBody>
				</Card>
			</div>
		);
	}
}

export default CreateCard;
