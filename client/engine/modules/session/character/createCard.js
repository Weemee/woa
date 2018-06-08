import React from 'react';
import {Card, CardBody, CardTitle, FormGroup, Input, Button} from 'reactstrap';

class CreateCard extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			name: '',
			serverSelect: '',
			specialization: '',
		};

		this.return = this.return.bind(this);
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

	render() {
		const specs = [
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

		return (
			<div>
				<Card className="themeContainer">
					<CardBody>
						<CardTitle>Create character {this.state.name && <b>'{this.state.name}'</b>}</CardTitle>
						<FormGroup>
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
						<FormGroup>
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
									Object.keys(specs).map((index) => {
										return <option key={index} value={index}>{specs[index].name}</option>
									})
								}
							</Input>
						</FormGroup>
						{
							this.state.specialization &&
							<div>
								Description: <b>{specs[this.state.specialization].name}</b> <br />
								The <b>{specs[this.state.specialization].name}</b> {specs[this.state.specialization].description}
							</div>
						}
						{
							this.state.name &&
							this.state.serverSelect &&
							this.state.specialization &&
							<Button className="themeButton" block={true} onClick={() => this.props.onClick(this.return(specs[this.state.specialization].name))}>Create character</Button>
						}
					</CardBody>
				</Card>
			</div>
		);
	}
}

export default CreateCard;
