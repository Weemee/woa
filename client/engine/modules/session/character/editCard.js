import React from 'react';
import {Card, CardBody, CardTitle, FormGroup, Input, Button, Progress} from 'reactstrap';

class EditCard extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			newName: '',
			confirm: '',
		};

		this.return = this.return.bind(this);
	}

	return() {
		return {
			newName: this.state.newName,
			oldName: this.props.character.name,
			type: 'editDone',
		};
	}

	render() {
		return (
			<div>
				<Card className="themeContainer">
					<CardBody>
					<CardTitle>Edit character</CardTitle>
						Current name: {this.props.character.name}
						<br />
						<FormGroup>
							<Input
								type="text"
								placeholder="New name"
								onChange={(e) => {
									this.setState({
										newName: e.target.value,
									});
								}}
								value={this.state.newName}
							/>
						</FormGroup>

						<div>
							Type in 'CONFIRM' in the input field to activate the button
						</div>
						<FormGroup>
							<Input
								type="text"
								placeholder="CONFIRM"
								onChange={(e) => {
									this.setState({
										confirm: e.target.value,
									});
								}}
								value={this.state.confirm}
							/>
						</FormGroup>
						{
							this.state.confirm === 'CONFIRM' ? (
								<Button className="themeButton" onClick={() => this.props.onClick(this.return())}>Edit character</Button>
							) : (
								<Button className="themeDisabledButton" disabled>Edit character</Button>
							)
						}
					</CardBody>
				</Card>
			</div>
		);
	}
}

export default EditCard;
